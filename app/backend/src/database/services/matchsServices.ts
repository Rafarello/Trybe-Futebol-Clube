import Clubs from '../models/clubs.model';
import MatchsModel from '../models/matches.model';

class MatchsServices {
  public static async getAll() {
    // Código abaixo visto em:
    // https://stackoverflow.com/questions/46380563/get-only-datavalues-from-sequelize-orm
    const allMatches = await MatchsModel.findAll({
      include: [
        {
          model: Clubs,
          as: 'homeClub',
          attributes: ['clubName'],
        },
        {
          model: Clubs,
          as: 'awayClub',
          attributes: ['clubName'],
        },
      ],
    });
    return allMatches;
  }

  public static async getById(id: string) {
    const clubById = await MatchsModel.findOne({ where: { id: Number(id) } });

    return clubById;
  }
}

export default MatchsServices;
