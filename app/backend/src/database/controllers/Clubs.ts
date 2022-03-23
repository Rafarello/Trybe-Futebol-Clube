import { Request, Response } from 'express';
import ClubsServices from '../services/clubsServices';

class Clubs {
  public static async getAll(_req: Request, res: Response) {
    const allClubs = await ClubsServices.getAll();
    return res.status(200).json(allClubs);
  }

  public static async getById(req:Request, res: Response) {
    const { id } = req.params;
    const clubById = await ClubsServices.getById(id);
    return res.status(200).json(clubById);
  }
}

export default Clubs;
