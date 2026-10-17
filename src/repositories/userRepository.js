const pool = require('../config/db');

const createUser = async (firstName, userName, lastName) => {
  const sql = `
    INSERT INTO users (first_name, user_name, last_name)
    VALUES ($1, $2, $3)
    RETURNING *
  `;
  const result = await pool.query(sql, [firstName, userName, lastName]);
  return result.rows[0];
};

const getAllUsers = async () => {
  const result = await pool.query('SELECT * FROM users ORDER BY user_id');
  return result.rows;
};

const getUserById = async (userId) => {
  const result = await pool.query(
    'SELECT * FROM users WHERE user_id = $1',
    [userId]
  );
  return result.rows[0];
};

const updateUser = async (userId, firstName, userName, lastName) => {
  const sql = `
    UPDATE users
    SET first_name = $1,
        user_name  = $2,
        last_name  = $3,
        updated_at = NOW()
    WHERE user_id = $4
    RETURNING *
  `;
  const result = await pool.query(sql, [firstName, userName, lastName, userId]);
  return result.rows[0];
};

const deleteUser = async (userId) => {
  const result = await pool.query(
    'DELETE FROM users WHERE user_id = $1',
    [userId]
  );
  return result.rowCount;
};

module.exports = { createUser, getAllUsers, getUserById, updateUser, deleteUser };
