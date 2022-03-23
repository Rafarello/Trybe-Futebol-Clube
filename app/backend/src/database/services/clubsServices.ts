import ClubsModel from '../models/clubs.model';

class ClubsServices {
  public static async getAll() {
    const allClubs = await ClubsModel.findAll();

    return allClubs;
  }

  public static async getById(id: string) {
    const clubById = await ClubsModel.findOne({ where: { id: Number(id) } });

    return clubById;
  }
}

export default ClubsServices;
