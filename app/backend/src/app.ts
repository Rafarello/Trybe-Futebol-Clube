import * as express from 'express';
import * as cors from 'cors';
import LoginRoutes from './database/router/login';
import ClubsRoutes from './database/router/clubs';
import MatchsRouter from './database/router/matchs';

class App {
  public app: express.Express;
  // ...

  constructor() {
    this.app = express();
    this.config();
    this.app.use(express.json());
    this.app.use(LoginRoutes);
    this.app.use(ClubsRoutes);
    this.app.use(MatchsRouter);
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
    this.app.use(cors());
    this.app.get('/', (_request, response) => {
      response.send();
    });
    // ...
  }

  // ...
  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
