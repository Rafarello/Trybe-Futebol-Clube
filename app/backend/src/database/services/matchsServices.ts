import Clubs from '../models/clubs.model';
import MatchsModel from '../models/matches.model';

class MatchsServices {
  public static async getAll() {
    // Código abaixo visto em:
    // https://stackoverflow.com/questions/46380563/get-only-datavalues-from-sequelize-orm
    const allMatches = await MatchsModel.findAll({
      raw: true,
      include: [
        {
          model: Clubs,
          required: true,
          as: 'homeTeam',
        },
        {
          model: Clubs,
          required: true,
          as: 'awayTeam',
        },
      ],
    });
    console.log(allMatches);

    return allMatches;
  }

  public static async getById(id: string) {
    const clubById = await MatchsModel.findOne({ where: { id: Number(id) } });

    return clubById;
  }
}

export default MatchsServices;
