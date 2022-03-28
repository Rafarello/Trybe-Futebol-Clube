import { Model, DataTypes } from 'sequelize';
import db from '.';

// import OtherModel from './OtherModel';

class Clubs extends Model {
  // public <campo>!: <tipo>;
  public id: number;

  public clubName: string;
}

Clubs.init({
  clubName: DataTypes.STRING,
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'clubs',
  tableName: 'clubs',
  timestamps: false,
});

export default Clubs;
