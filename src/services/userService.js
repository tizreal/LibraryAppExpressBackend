const userRepo = require('../repositories/userRepository');

const createUser = async (body) => {
  const { first_name, user_name, last_name } = body;

  if (!first_name || !first_name.trim())
    throw { status: 400, message: 'first_name is required' };
  if (!user_name || !user_name.trim())
    throw { status: 400, message: 'user_name is required' };
  if (!last_name || !last_name.trim())
    throw { status: 400, message: 'last_name is required' };

  return await userRepo.createUser(first_name.trim(), user_name.trim(), last_name.trim());
};

const getAllUsers = async () => {
  return await userRepo.getAllUsers();
};

const getUserById = async (userId) => {
  const user = await userRepo.getUserById(userId);
  if (!user) {
    throw { status: 404, message: `User not found with ID: ${userId}` };
  }
  return user;
};

const updateUser = async (userId, body) => {
  const { first_name, user_name, last_name } = body;

  if (!first_name || !user_name || !last_name)
    throw { status: 400, message: 'first_name, user_name, and last_name are required' };

  const existing = await userRepo.getUserById(userId);
  if (!existing) {
    throw { status: 404, message: `User not found with ID: ${userId}` };
  }

  return await userRepo.updateUser(userId, first_name.trim(), user_name.trim(), last_name.trim());
};

const deleteUser = async (userId) => {
  const rowCount = await userRepo.deleteUser(userId);
  if (rowCount === 0) {
    throw { status: 404, message: `User not found with ID: ${userId}` };
  }
};

module.exports = { createUser, getAllUsers, getUserById, updateUser, deleteUser };
