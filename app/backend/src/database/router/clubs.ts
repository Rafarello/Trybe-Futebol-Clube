import express = require('express');

import ClubsController from '../controllers/Clubs';

// Vídeos usados como referência:
// # Como criar o Router com Class:
// # OBS: Vídeo incrível e super didático << rever novamente depois
// https://www.youtube.com/watch?v=muikWYU7SnE&ab_channel=HighTechCursosF%C3%A1bricadeProgramador
// # Como criar o Server/APP com Class:
// https://www.youtube.com/watch?v=EQlMDxnGZpA&ab_channel=HighTechCursosF%C3%A1bricadeProgramador

class ClubsRoutes {
  router: express.Router;

  constructor() {
    this.router = express.Router();
    this.loadRoutes();
  }

  loadRoutes() {
    this.router.get('/clubs', ClubsController.getAll);
    this.router.get('/clubs/:id', ClubsController.getById);
  }
}

export default new ClubsRoutes().router;
