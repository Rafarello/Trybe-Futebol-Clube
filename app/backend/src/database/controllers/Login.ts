import { NextFunction, Request, Response } from 'express';
import {
  validateEmailInfo,
  validatePasswordInfo,
  ValidationResponse } from '../utils/loginValidation';

// Vídeos usados como referência:
// # Como criar o Controller com Class
// https://www.youtube.com/watch?v=XwWOZJDo1dk&ab_channel=HighTechCursosF%C3%A1bricadeProgramador

class LoginController {
  validateEmail: (email: string) => ValidationResponse;

  validatePassword: (password: string) => ValidationResponse;

  constructor() {
    this.validateEmail = validateEmailInfo;
    this.validatePassword = validatePasswordInfo;
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
