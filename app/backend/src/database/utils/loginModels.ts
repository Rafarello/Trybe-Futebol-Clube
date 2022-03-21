import UsersModel from '../models/users.models';

const findOne = async (queryObject: object) => {
  const userData = await UsersModel.findOne({ where: queryObject });
  return userData;
};

const getAll = async () => {
  const allUsers = await UsersModel.findAll();
  return allUsers;
};
export {
  findOne,
  getAll,
};