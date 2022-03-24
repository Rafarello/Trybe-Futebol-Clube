// Documentação de associations de Sequelize
// https://sequelize.org/master/manual/migrations.html

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'matchs',
      {
        id: {
          primaryKey: true,
          autoIncrement: true,
          type: Sequelize.INTEGER
        },
        homeTeam: {
          references: { model: 'clubs', key: 'id' },
          type: Sequelize.INTEGER, field: 'home_team',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        homeTeamGoals: {
          type: Sequelize.INTEGER,
          field: 'home_team_goals'
        },
        awayTeam: {
          references: { model: 'clubs', key: 'id' },
          type: Sequelize.INTEGER, field: 'away_team',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        awayTeamGoals: {
          type: Sequelize.INTEGER,
          field: 'away_team_goals'
        },
        inProgress: {
          type: Sequelize.BOOLEAN, field: 'in_progress'
        },
      },
      {},
    );
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('matchs');
  },
};
