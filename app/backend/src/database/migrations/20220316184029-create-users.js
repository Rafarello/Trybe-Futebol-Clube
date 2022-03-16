module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'Matches',
      {
        id: { primaryKey: true, autoIncrement: true, type: Sequelize.INTEGER },
        username: { primaryKey: true, type: Sequelize.STRING },
        role: { type: Sequelize.STRING },
        email: { type: Sequelize.STRING },
        password: { type: Sequelize.STRING },
      },
      {},
    );
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('Matches');
  },
};
