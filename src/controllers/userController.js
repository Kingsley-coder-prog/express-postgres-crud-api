// Standardized response function

import {
  createUserService,
  deleteUserService,
  getAllUsersService,
  getUserByIdService,
  updateUserService,
} from "../models/userModel.js";

const handlesResponse = (res, status, message, data = null) => {
  res.status(status).json({
    status,
    message,
    data,
  });
};

export const createUser = async (req, res, next) => {
  const { name, email } = req.body;

  try {
    const newUser = await createUserService(name, email);
    handlesResponse(res, 201, "User created successfully", newUser);
  } catch (err) {
    next(err);
  }
};
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await getAllUsersService();
    handlesResponse(res, 200, "User fetched successfully", users);
  } catch (err) {
    next(err);
  }
};
export const getUserById = async (req, res, next) => {
  try {
    const user = await getUserByIdService(req.params.id);
    if (!user) {
      return handlesResponse(res, 404, "User not found");
    }
    handlesResponse(res, 200, "User fetched successfully", user);
  } catch (err) {
    next(err);
  }
};
export const updateUser = async (req, res, next) => {
  const { name, email } = req.body;
  try {
    const updatedUser = await updateUserService(req.params.id, name, email);
    if (!updatedUser) {
      return handlesResponse(res, 404, "User not found");
    }
    handlesResponse(res, 200, "User updated successfully", updatedUser);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const deleteUser = await deleteUserService(req.params.id);
    if (!deleteUser) {
      return handlesResponse(res, 404, "User not found");
    }
    handlesResponse(res, 200, "User deleted successfully", deleteUser);
  } catch (err) {
    next(err);
  }
};
