import { Model, DataTypes } from 'sequelize';
import db from '.';
import Clubs from './clubs.model';

// import OtherModel from './OtherModel';

class Matchs extends Model {
  // public <campo>!: <tipo>;
}

Matchs.init({
  homeTeam: DataTypes.INTEGER,
  homeTeamGoals: DataTypes.INTEGER,
  awayTeam: DataTypes.INTEGER,
  awayTeamGoals: DataTypes.INTEGER,
  inProgress: DataTypes.TINYINT,
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'matchs',
  tableName: 'matchs',
  timestamps: false,
});

// Association de models
// https://sequelize.org/master/manual/assocs.html
Matchs.hasMany(Clubs, { foreignKey: 'id', as: 'home_team' });
Matchs.hasMany(Clubs, { foreignKey: 'id', as: 'away_team' });
Clubs.belongsTo(Matchs, { foreignKey: 'id', as: 'home_team' });
Clubs.belongsTo(Matchs, { foreignKey: 'id', as: 'away_team' });

export default Matchs;
