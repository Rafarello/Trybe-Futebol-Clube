import * as fs from 'fs';
import * as jwtImport from 'jsonwebtoken';
import { findOneUser } from './loginModels';

type User = {
  id: number,
  username: string,
  role: string,
  email: string,
  password: string
};

type UserResponse = User | Record<string, never>;

class Token {
  private secret: string;
  // # Mensagens / Códigos

  public UNAUTHORIZED: number;

  public INVALID_TOKEN: string;

  public TOKEN_NOT_FOUND: string;

  public OK: number;

  // # Constantes úteis

  constructor() {
    this.secret = fs.readFileSync('./jwt.evaluation.key', 'utf-8');
    this.UNAUTHORIZED = 401;
    this.INVALID_TOKEN = 'Invalid Token';
    this.TOKEN_NOT_FOUND = 'Token not found';
    this.OK = 200;
  }

  // # Funções úteis
  public async validation(token: string | undefined) {
    const { UNAUTHORIZED, TOKEN_NOT_FOUND, INVALID_TOKEN, OK, secret } = this;
    if (!token) return { status: UNAUTHORIZED, message: TOKEN_NOT_FOUND };
    const test = token.split('.');
    if (test.length !== 3) return { status: UNAUTHORIZED, message: INVALID_TOKEN };
    let user: UserResponse;
    try {
      const decoded = jwtImport.verify(token, secret);
      const [username] = Object.values(decoded);
      const query = { username };
      user = await findOneUser(query) as UserResponse;
      if (!user) {
        return { status: UNAUTHORIZED, message: INVALID_TOKEN };
      }
    } catch (error) {
      console.log(error);
      return { status: UNAUTHORIZED, message: INVALID_TOKEN };
    }
    return { status: OK, user };
  }
}

export default new Token();
