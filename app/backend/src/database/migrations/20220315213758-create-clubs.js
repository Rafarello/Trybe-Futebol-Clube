module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'clubs',
      {
        id: {
          primaryKey: true,
          autoIncrement: true,
          type: Sequelize.INTEGER,
        },
        clubName: {
          primaryKey: true,
          type: Sequelize.STRING,
          field: 'club_name',
        },
      },
      {},
    );
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('clubs');
  },
};
