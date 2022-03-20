import { NextFunction, Request, Response } from 'express';
import * as fs from 'fs';
import * as jwtImport from 'jsonwebtoken';
import {
  validateEmailInfo,
  validatePasswordInfo,
  ValidationResponse,
  UserInfo } from '../utils/loginValidation';
import UsersModel from '../models/users.models';
import { findOne } from '../utils/loginModels';

// Vídeos usados como referência:
// # Como criar o Controller com Class
// https://www.youtube.com/watch?v=XwWOZJDo1dk&ab_channel=HighTechCursosF%C3%A1bricadeProgramador

// # Documentação JsonWebToken
// https://www.npmjs.com/package/jsonwebtoken

class LoginController {
  validateEmail: (email: string) => ValidationResponse;

  validatePassword: (password: string) => ValidationResponse;

  secret: string;

  jwt;

  algorithm:jwtImport.Algorithm;

  constructor() {
    this.validateEmail = validateEmailInfo;
    this.validatePassword = validatePasswordInfo;
    this.secret = fs.readFileSync('./jwt.evaluation.key', 'utf-8');
    this.jwt = jwtImport;
    this.algorithm = 'HS256';
  }

  async login(req: Request, res: Response) {
    const { email, password }: UserInfo = req.body;
    const { jwt, secret, algorithm } = this;
    const data = findOne({ email, password });
    const userData = await UsersModel.findOne({ where: { email, password } });
    const { id, username, role } = userData;

    const token = jwt.sign({ username }, secret, { algorithm });
    const user: UserInfo = { id, username, role, email, password };
    const response = { user, token };
    return res.status(200).json(response);
  }

  userValidation(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    const { validateEmail, validatePassword } = this;
    console.log(req.body);

    if (validateEmail(email).status !== 200) {
      return res.status(validateEmail(email).status)
        .json(validateEmail(email).message);
    }

    if (validatePassword(password).status !== 200) {
      return res.status(validatePassword(password).status)
        .json(validatePassword(password).message);
    }
    next();
  }
}

export default new LoginController();
