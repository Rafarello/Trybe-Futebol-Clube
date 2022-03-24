import Clubs from '../models/clubs.model';
import MatchsModel from '../models/matches.model';

type Match = {
  homeTeam: number,
  awayTeam: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
  inProgress: boolean | number,
};

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

  public static async getByProgress(progress: string) {
    const matchStatus = progress === 'true' ? 1 : 0;
    const matchsByProgress = await MatchsModel.findAll({
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
      where: { inProgress: matchStatus },
    });
    return matchsByProgress;
  }

  public static async newMatch(body: Match) {
    const response = await MatchsModel.create(body);

    return response;
  }

  public static async updateProgress(id: string) {
    const updatedMatch = await MatchsModel.update(
      { inProgress: 0 },
      { where: { id } },
    );
    return updatedMatch;
  }
}

export default MatchsServices;
