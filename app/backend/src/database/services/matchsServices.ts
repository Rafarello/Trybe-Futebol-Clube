import * as fs from 'fs';
import * as jwtImport from 'jsonwebtoken';
import { Op } from 'sequelize';
import ClubsModel from '../models/clubs.model';
import MatchsModel from '../models/matches.model';
import findOneUser from './loginModels';

type Match = {
  homeTeam?: number,
  awayTeam?: number,
  homeTeamGoals?: number,
  awayTeamGoals?: number,
  inProgress?: boolean | number,
};

const secret = fs.readFileSync('./jwt.evaluation.key', 'utf-8');
const UNAUTHORIZED = 401;
const INVALID_TOKEN = 'Invalid Token';
const TOKEN_NOT_FOUND = 'Token not found';
const OK = 200;

type User = {
  id: number,
  username: string,
  role: string,
  email: string,
  password: string
};
type UserResponse = User | Record<string, never>;

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
    const match = { ...body, inProgress: true };
    const response = await MatchsModel.create(match);

    return response;
  }

  public static async newMatchFinished(body: Match) {
    const match = { ...body, inProgress: false };
    const response = await MatchsModel.create(match);

    return response;
  }

  public static async validateMatchInfo(body: Match) {
    const { homeTeam, awayTeam } = body;
    const clubsCount = await ClubsModel.count({ where: { [Op.or]: [
      { id: homeTeam },
      { id: awayTeam },
    ] } });

    if (homeTeam === awayTeam) {
      const message = 'It is not possible to create a match with two equal teams';
      const response = { status: UNAUTHORIZED, message };
      return response;
    }
    if (clubsCount !== 2) {
      const message = 'There is no team with such id!';
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

  public static async updateMatchResult(body: Match, id: string) {
    const { homeTeamGoals, awayTeamGoals } = body;
    if ((homeTeamGoals && awayTeamGoals) !== undefined) {
      await MatchsModel.update(
        { homeTeamGoals, awayTeamGoals },
        { where: { id } },
      );
    }
  }

  public static async tokenValidation(token: string | undefined) {
    if (!token) return { status: UNAUTHORIZED, message: TOKEN_NOT_FOUND };
    const test = token.split('.');
    if (test.length !== 3) return { status: UNAUTHORIZED, message: INVALID_TOKEN };
    let user: UserResponse;
    try {
      const decoded = jwtImport.verify(token, secret);
      const [username] = Object.values(decoded);
      const query = { username };
      user = await findOneUser(query) as UserResponse;
      if (!user) {
        return { status: UNAUTHORIZED, message: INVALID_TOKEN };
      }
    } catch (error) {
      console.log(error);
      return { status: UNAUTHORIZED, message: INVALID_TOKEN };
    }
    return { status: OK, user };
  }
}

export default MatchsServices;
