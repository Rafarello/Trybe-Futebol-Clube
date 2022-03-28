import express = require('express');

import LeaderboardController from '../controllers/Leaderboard';

// Vídeos usados como referência:
// # Como criar o Router com Class:
// # OBS: Vídeo incrível e super didático << rever novamente depois
// https://www.youtube.com/watch?v=muikWYU7SnE&ab_channel=HighTechCursosF%C3%A1bricadeProgramador
// # Como criar o Server/APP com Class:
// https://www.youtube.com/watch?v=EQlMDxnGZpA&ab_channel=HighTechCursosF%C3%A1bricadeProgramador

class LeaderboardRouter {
  router: express.Router;

  constructor() {
    this.router = express.Router();
    this.loadRoutes();
  }

  loadRoutes() {
    this.router.get('/leaderboard/home', LeaderboardController.leaderboardHome);
    this.router.get('/leaderboard/away', LeaderboardController.leaderboardAway);
    this.router.get('/leaderboard', LeaderboardController.leaderboard);
  }
}

export default new LeaderboardRouter().router;
