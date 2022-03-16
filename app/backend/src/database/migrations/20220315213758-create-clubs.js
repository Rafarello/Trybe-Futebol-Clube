module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'Clubs',
      {
        id: {
          primaryKey: true,
          autoIncrement: true,
          type: Sequelize.INTEGER,
        },
        club_name: {
          primaryKey: true,
          type: Sequelize.STRING,
        },
      },
      {},
    );
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('Clubs');
  },
};
