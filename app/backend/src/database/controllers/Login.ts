import { NextFunction, Request, Response } from 'express';

// Vídeos usados como referência:
// # Como criar o Controller com Class
// https://www.youtube.com/watch?v=XwWOZJDo1dk&ab_channel=HighTechCursosF%C3%A1bricadeProgramador

class LoginController {
  constructor() {

  }

  userValidation(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
  }
}

export default new LoginController();
