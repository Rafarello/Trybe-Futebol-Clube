import express = require('express');

import MatchsController from '../controllers/Matchs';

// Vídeos usados como referência:
// # Como criar o Router com Class:
// # OBS: Vídeo incrível e super didático << rever novamente depois
// https://www.youtube.com/watch?v=muikWYU7SnE&ab_channel=HighTechCursosF%C3%A1bricadeProgramador
// # Como criar o Server/APP com Class:
// https://www.youtube.com/watch?v=EQlMDxnGZpA&ab_channel=HighTechCursosF%C3%A1bricadeProgramador

class MatchsRouter {
  router: express.Router;

  constructor() {
    this.router = express.Router();
    this.loadRoutes();
  }

  loadRoutes() {
    this.router.get('/matchs', MatchsController.getAll);
  }
}

export default new MatchsRouter().router;
