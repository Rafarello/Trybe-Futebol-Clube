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
// https://stackoverflow.com/questions/38082938/sequelize-hasmany-join-association
Clubs.hasMany(Matchs, { as: 'homeTeamId', foreignKey: 'homeTeam' });
Clubs.hasMany(Matchs, { as: 'awayTeamId', foreignKey: 'awayTeam' });
Matchs.belongsTo(Clubs, { as: 'homeClub', foreignKey: 'homeTeam' });
Matchs.belongsTo(Clubs, { as: 'awayClub', foreignKey: 'awayTeam' });

export default Matchs;
