module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'Matches',
      {
        id: { primaryKey: true, autoIncrement: true, type: Sequelize.INTEGER },
        homeTeam: { primaryKey: true, type: Sequelize.INTEGER, field: 'home_team' },
        homeTeamGoals: { type: Sequelize.INTEGER, field: 'home_team_goals' },
        awayTeam: { type: Sequelize.INTEGER, field: 'away_team' },
        awayTeamGoals: { type: Sequelize.INTEGER, field: 'away_team_goals' },
        inProgress: { type: Sequelize.INTEGER, field: 'in_progress' },
      },
      {},
    );
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('Matches');
  },
};
