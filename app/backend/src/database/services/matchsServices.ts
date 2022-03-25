import ClubsModel from '../models/clubs.model';
import MatchsModel from '../models/matches.model';

type Match = {
  homeTeam?: number,
  awayTeam?: number,
  homeTeamGoals?: number,
  awayTeamGoals?: number,
  inProgress?: boolean | number,
};

class MatchsServices {
  public static async getAll() {
    // Código abaixo visto em:
    // https://stackoverflow.com/questions/46380563/get-only-datavalues-from-sequelize-orm
    const allMatches = await MatchsModel.findAll({
      include: [
        {
          model: ClubsModel,
          as: 'homeClub',
          attributes: ['clubName'],
        },
        {
          model: ClubsModel,
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
          model: ClubsModel,
          as: 'homeClub',
          attributes: ['clubName'],
        },
        {
          model: ClubsModel,
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

  public static async validateMatchInfo(body: Match) {
    const { homeTeam, awayTeam } = body;
    const UNAUTHORIZED = 401;
    const homeTeamExists = await ClubsModel.count({ where: { id: homeTeam } });
    const awayTeamExists = await ClubsModel.count({ where: { id: awayTeam } });
    if ((homeTeamExists || awayTeamExists) === 0) {
      const message = 'There is no team with such id!';
      const response = { status: UNAUTHORIZED, message };
      return response;
    }
    if (homeTeam === awayTeam) {
      const message = 'It is not possible to create a match with two equal teams';
      const response = { status: UNAUTHORIZED, message };
      return response;
    }
  }

  public static async updateProgress(id: string) {
    await MatchsModel.update(
      { inProgress: 0 },
      { where: { id } },
    );
  }
}

export default MatchsServices;
