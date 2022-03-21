import UsersModel from '../models/users.models';

// # Funções úteis para facilitar o uso do Model Users

const findOneUser = async (queryObject: object) => {
  const userData = await UsersModel.findOne({ where: queryObject });
  return userData;
};

const getAll = async () => {
  const allUsers = await UsersModel.findAll();
  return allUsers;
};
export {
  findOneUser,
  getAll,
};
