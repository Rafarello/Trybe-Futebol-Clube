import { Model, DataTypes } from 'sequelize';
import db from '.';

// import OtherModel from './OtherModel';

class Users extends Model {
  // public <campo>!: <tipo>;
  public id: number;

  public username: string;

  public role: string;

  public email: string;

  public password: string;
}

Users.init({
  username: DataTypes.STRING,
  role: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'users',
  tableName: 'users',
  timestamps: false,
});

export default Users;
