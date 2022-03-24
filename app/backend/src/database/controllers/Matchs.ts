import { Request, Response } from 'express';
import MatchsServices from '../services/matchsServices';

class MatchsController {
  public static async getAll(req: Request, res: Response) {
    const { query } = req.query;
    console.log(query);
    const allClubs = await MatchsServices.getAll();
    return res.status(200).json(allClubs);
  }

  public static async getById(req:Request, res: Response) {
    const { id } = req.params;
    const clubById = await MatchsServices.getById(id);
    return res.status(200).json(clubById);
  }
}

export default MatchsController;
