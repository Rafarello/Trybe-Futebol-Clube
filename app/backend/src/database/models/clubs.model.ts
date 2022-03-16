// Seguindo exemplo da documentação

// const { Sequelize, Model, DataTypes } = require('sequelize');
// const sequelize = new Sequelize('sqlite::memory:');

// class User extends Model {}
// User.init({
//   username: DataTypes.STRING,
//   birthday: DataTypes.DATE
// }, { sequelize, modelName: 'user' });

// (async () => {
//   await sequelize.sync();
//   const jane = await User.create({
//     username: 'janedoe',
//     birthday: new Date(1980, 6, 20)
//   });
//   console.log(jane.toJSON());
// })();

import { Model, DataTypes } from 'sequelize';
import db from '.';

// import OtherModel from './OtherModel';

class Clubs extends Model {
  // public <campo>!: <tipo>;
}

Clubs.init({
  club_name: DataTypes.STRING,
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'Clubs',
  tableName: 'Clubs',
  timestamps: false,
});

/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

// OtherModel.belongsTo(Clubs, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });
// OtherModel.belongsTo(Clubs, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });

// Clubs.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
// Clubs.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });

export default Clubs;
