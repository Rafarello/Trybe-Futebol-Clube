import ClubsModel from '../models/clubs.model';
import MatchsModel from '../models/matches.model';

type ClubTable = {
  id: number,
  name: string,
  totalGames: number,
  totalPoints: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: number,
};

class LeaderboardServices {
  public static async generateTable() {
    const allClubs = await ClubsModel.findAll({ raw: true });
    const generateTable = allClubs.map((club) => {
      const table = {
        id: club.id,
        name: club.clubName,
        totalPoints: 0,
        totalGames: 0,
        totalVictories: 0,
        totalDraws: 0,
        totalLosses: 0,
        goalsFavor: 0,
        goalsOwn: 0,
        goalsBalance: 0,
        efficiency: 0,
      };
      return table;
    });
    return generateTable;
  }

  public static async generateWin(match: MatchsModel, club: ClubTable, status: 'home' | 'away') {
    const results = club;
    const { homeTeamGoals, awayTeamGoals } = match;
    results.totalGames += 1;
    results.totalVictories += 1;
    results.totalPoints += 3;
    results.goalsFavor += status === 'home' ? homeTeamGoals : awayTeamGoals;
    results.goalsOwn += status === 'home' ? awayTeamGoals : homeTeamGoals;
    results.goalsBalance = results.goalsFavor - results.goalsOwn;
    results.efficiency = Number(
      ((results.totalPoints / (results.totalGames * 3)) * 100).toFixed(2),
    );
    return results;
  }

  public static async generateDraw(match: MatchsModel, club: ClubTable, status: 'home' | 'away') {
    const results = club;
    const { homeTeamGoals, awayTeamGoals } = match;
    results.totalGames += 1;
    results.totalDraws += 1;
    results.totalPoints += 1;
    results.goalsFavor += status === 'home' ? homeTeamGoals : awayTeamGoals;
    results.goalsOwn += status === 'home' ? awayTeamGoals : homeTeamGoals;
    results.goalsBalance = results.goalsFavor - results.goalsOwn;
    results.efficiency = Number(
      ((results.totalPoints / (results.totalGames * 3)) * 100).toFixed(2),
    );
    return results;
  }

  public static async generateLoss(match: MatchsModel, club: ClubTable, status: 'home' | 'away') {
    const results = club;
    const { homeTeamGoals, awayTeamGoals } = match;
    results.totalGames += 1;
    results.totalLosses += 1;
    results.goalsFavor += status === 'home' ? homeTeamGoals : awayTeamGoals;
    results.goalsOwn += status === 'home' ? awayTeamGoals : homeTeamGoals;
    results.goalsBalance = results.goalsFavor - results.goalsOwn;
    results.efficiency = Number(
      ((results.totalPoints / (results.totalGames * 3)) * 100).toFixed(2),
    );
    return results;
  }

  public static async updateTableHome(match: MatchsModel, club: ClubTable) {
    const { homeTeamGoals, awayTeamGoals } = match;
    const HOME = 'home';
    if (homeTeamGoals > awayTeamGoals) {
      return this.generateWin(match, club, HOME);
    }
    if (homeTeamGoals === awayTeamGoals) {
      return this.generateDraw(match, club, HOME);
    }
    return this.generateLoss(match, club, HOME);
  }

  public static async updateTableAway(match: MatchsModel, club: ClubTable) {
    const { homeTeamGoals, awayTeamGoals } = match;
    const AWAY = 'away';
    if (homeTeamGoals < awayTeamGoals) {
      return this.generateWin(match, club, AWAY);
    }
    if (homeTeamGoals === awayTeamGoals) {
      return this.generateDraw(match, club, AWAY);
    }
    return this.generateLoss(match, club, AWAY);
  }

  // # Código da função abaixo, visto em:
  // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
  // # Principalmente o do link abaixo:
  // https://www.javascripttutorial.net/array/javascript-sort-an-array-of-objects/

  public static async orderLeaderboard(leaderboard: ClubTable[]) {
    leaderboard.sort((a, b) => a.goalsFavor - b.goalsFavor);
    leaderboard.sort((a, b) => b.goalsFavor - a.goalsFavor);
    leaderboard.sort((a, b) => b.goalsBalance - a.goalsBalance);
    leaderboard.sort((a, b) => b.totalVictories - a.totalVictories);
    leaderboard.sort((a, b) => b.totalPoints - a.totalPoints);
    const leaderboardExcludingId = leaderboard.map((club) => {
      // # Código abaixo visto em:
      // https://www.cloudhadoop.com/2020/02/different-ways-of-remove-property-in.html
      const { id, ...clubObject } = club;
      console.log(clubObject);

      return clubObject;
    });
    return leaderboardExcludingId;
  }

  public static async generateLeaderboardHome() {
    const table = await this.generateTable();
    const allMatchs = await MatchsModel.findAll({ raw: true, where: { inProgress: false } });
    console.log(allMatchs);

    const leaderboardHome = table.map((club) => {
      allMatchs.forEach((match) => {
        if (match.homeTeam === club.id) this.updateTableHome(match, club as ClubTable);
      });
      return club;
    });

    return leaderboardHome;
  }

  public static async generateLeaderboardAway() {
    const table = await this.generateTable();
    const allMatchs = await MatchsModel.findAll({ raw: true, where: { inProgress: false } });
    const leaderboardAway = table.map((club) => {
      allMatchs.forEach((match) => {
        if (match.awayTeam === club.id) this.updateTableAway(match, club as ClubTable);
      });
      return club;
    });

    return leaderboardAway;
  }

  public static async generateOrderedLeaderboardHome() {
    const leaderboardHome = await this.generateLeaderboardHome();
    const leaderboardOrdered = this.orderLeaderboard(leaderboardHome);

    return leaderboardOrdered;
  }

  public static async generateOrderedLeaderboardAway() {
    const leaderboardAway = await this.generateLeaderboardAway();
    const leaderboardOrdered = await this.orderLeaderboard(leaderboardAway);
    return leaderboardOrdered;
  }

  public static async generateLeaderboard() {
    const leaderboardHome = await this.generateLeaderboardHome();
    const leaderboardAway = await this.generateLeaderboardAway();
    for (let index = 0; index < leaderboardHome.length; index += 1) {
      leaderboardHome[index].totalGames += leaderboardAway[index].totalGames;
      leaderboardHome[index].totalVictories += leaderboardAway[index].totalVictories;
      leaderboardHome[index].totalPoints += leaderboardAway[index].totalPoints;
      leaderboardHome[index].totalDraws += leaderboardAway[index].totalDraws;
      leaderboardHome[index].totalLosses += leaderboardAway[index].totalLosses;
      leaderboardHome[index].goalsFavor += leaderboardAway[index].goalsFavor;
      leaderboardHome[index].goalsOwn += leaderboardAway[index].goalsOwn;
      leaderboardHome[index].goalsBalance = (
        leaderboardHome[index].goalsFavor - leaderboardHome[index].goalsOwn);
      leaderboardHome[index].efficiency = Number((
        (leaderboardHome[index].totalPoints / (leaderboardHome[index].totalGames * 3)) * 100)
        .toFixed(2));
    }
    return leaderboardHome;
  }

  public static async generateOrderedLeaderboard() {
    const leaderboard = await this.generateLeaderboard();
    const leaderboardOrdered = this.orderLeaderboard(leaderboard);
    return leaderboardOrdered;
  }
}

export default LeaderboardServices;
