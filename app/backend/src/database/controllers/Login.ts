import { NextFunction, Request, Response } from 'express';
import * as fs from 'fs';
import * as jwtImport from 'jsonwebtoken';
import bcrypt = require('bcryptjs');
import {
  validateExistance,
  validateLoginInfo,
  ValidationResponse,
  UserInfo,
  invalidInfo,
} from '../services/loginValidation';
import Users from '../models/users.models';
import findOneUser from '../services/loginModels';
import TokenService from '../services/tokenValidation';

// Vídeos usados como referência:
// # Como criar o Controller com Class
// https://www.youtube.com/watch?v=XwWOZJDo1dk&ab_channel=HighTechCursosF%C3%A1bricadeProgramador

// # Documentação JsonWebToken
// https://www.npmjs.com/package/jsonwebtoken

class LoginController {
  existanceValidation: (email: string, password: string) => ValidationResponse;

  infoValidation: (email: string, password: string) => ValidationResponse;

  Token;

  secret: string;

  jwt;

  algorithm:jwtImport.Algorithm;

  constructor() {
    this.existanceValidation = validateExistance;
    this.infoValidation = validateLoginInfo;
    this.Token = TokenService;
    this.secret = fs.readFileSync('./jwt.evaluation.key', 'utf-8');
    this.jwt = jwtImport;
    this.algorithm = 'HS256';
  }

  async tokenValidation(req: Request, res: Response) {
    const { authorization: token } = req.headers;
    const { Token } = this;
    const validation = await Token.validation(token);
    if (validation.status !== 200) return res.status(validation.status).json(validation.message);
    return res.status(validation.status).json(validation.user?.role);
  }

  async login(req: Request, res: Response) {
    const { email, password }: UserInfo = req.body;
    const { jwt, secret, algorithm } = this;

    const userData: Users = await findOneUser({ email }) as Users;
    // Se for incorreto, irá retornar verdadeiro
    const passwordIncorrect = !bcrypt.compareSync(password, userData.password);

    if (userData === null || passwordIncorrect) {
      return res.status(401).json(invalidInfo);
    }

    const { id, username, role } = userData;

    const token = jwt.sign({ username }, secret, { algorithm });
    const user: UserInfo = { id, username, role, email, password };
    const response = { user, token };
    return res.status(200).json(response);
  }

  userValidation(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    const { existanceValidation, infoValidation } = this;
    console.log(this);

    if (existanceValidation(email, password).status !== 200) {
      return res.status(existanceValidation(email, password).status)
        .json(existanceValidation(email, password).message);
    }

    if (infoValidation(email, password).status !== 200) {
      return res.status(infoValidation(email, password).status)
        .json(infoValidation(email, password).message);
    }
    next();
  }
}

export default new LoginController();
