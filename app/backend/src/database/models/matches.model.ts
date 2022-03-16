import { Model, DataTypes } from 'sequelize';
import db from '.';
// import Clubs from './clubs.model';

// import OtherModel from './OtherModel';

class Matches extends Model {
  // public <campo>!: <tipo>;
}

Matches.init({
  homeTeam: DataTypes.INTEGER,
  homeTeamGoals: DataTypes.INTEGER,
  awayTeam: DataTypes.INTEGER,
  awayTeamGoals: DataTypes.INTEGER,
  inProgress: DataTypes.TINYINT,
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'Matches',
  tableName: 'Matches',
  timestamps: false,
});

/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

// OtherModel.belongsTo(Matches, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });
// OtherModel.belongsTo(Matches, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });

// Matches.hasMany(Clubs, { foreignKey: 'id', as: 'home_team' });
// Matches.hasMany(Clubs, { foreignKey: 'id', as: 'away_team' });
// Matches.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });

export default Matches;
