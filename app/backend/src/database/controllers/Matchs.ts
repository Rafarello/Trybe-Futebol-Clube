import { Request, Response } from 'express';
import MatchsServices from '../services/matchsServices';

class MatchsController {
  public static async getAll(req: Request, res: Response) {
    const { inProgress } = req.query;

    if (inProgress !== undefined) {
      const queryMatchs = await MatchsServices.getByProgress(inProgress as string);
      return res.status(200).json(queryMatchs);
    }
    const allClubs = await MatchsServices.getAll();
    return res.status(200).json(allClubs);
  }

  public static async newMatch(req:Request, res: Response) {
    const { body } = req;
    const { homeTeam, awayTeam } = body;
    const UNAUTHORIZED = 401;
    const message = 'It is not possible to create a match with two equal teams';
    if (homeTeam === awayTeam) {
      return res.status(UNAUTHORIZED)
        .json({ message });
    }
    const newMatch = await MatchsServices.newMatch(body);
    return res.status(200).json(newMatch);
  }

  public static async updateProgress(req: Request, res: Response) {
    const { id } = req.params;
    await MatchsServices.updateProgress(id);

    return res.status(200).send();
  }
}

export default MatchsController;
