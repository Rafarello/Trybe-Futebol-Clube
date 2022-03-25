import { NextFunction, Request, Response } from 'express';
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

  public static async validateMatchInfo(req:Request, res: Response, next: NextFunction) {
    const { body } = req;
    const validation = await MatchsServices.validateMatchInfo(body);
    if (validation !== undefined) {
      const { status, message } = validation;
      return res.status(status).json({ message });
    }
    next();
  }

  public static async newMatch(req:Request, res: Response) {
    const { body } = req;

    const newMatch = await MatchsServices.newMatch(body);
    return res.status(200).json(newMatch);
  }

  public static async updateProgress(req: Request, res: Response) {
    const { id } = req.params;
    await MatchsServices.updateProgress(id);

    return res.status(200).send();
  }

  public static async updateMatchResult(req: Request, res: Response) {
    const { body } = req;
    const { id } = req.params;
    await MatchsServices.updateMatchResult(body, id);
    return res.status(200).send();
  }
}

export default MatchsController;
