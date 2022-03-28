import { Request, Response } from 'express';
import LeaderboardServices from '../services/leaderboardServices';

class LeaderboardController {
  public static async leaderboardHome(_req: Request, res: Response) {
    const response = await LeaderboardServices.generateOrderedLeaderboardHome();
    return res.status(200).json(response);
  }

  public static async leaderboardAway(_req: Request, res: Response) {
    const response = await LeaderboardServices.generateOrderedLeaderboardAway();
    return res.status(200).json(response);
  }

  public static async leaderboard(_req: Request, res: Response) {
    const response = await LeaderboardServices.generateOrderedLeaderboard();
    return res.status(200).json(response);
  }
}

export default LeaderboardController;
