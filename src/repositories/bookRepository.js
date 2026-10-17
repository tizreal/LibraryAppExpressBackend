const pool = require('../config/db');

const createBook = async (title, author, isbn, publicationYear) => {
  const sql = `
    INSERT INTO books (title, author, isbn, publication_year)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;
  const result = await pool.query(sql, [title, author, isbn, publicationYear || null]);
  return result.rows[0];
};

const getAllBooks = async () => {
  const result = await pool.query('SELECT * FROM books ORDER BY book_id');
  return result.rows;
};

const getBookById = async (bookId) => {
  const result = await pool.query(
    'SELECT * FROM books WHERE book_id = $1',
    [bookId]
  );
  return result.rows[0];
};

const updateBook = async (bookId, title, author, isbn, publicationYear) => {
  const sql = `
    UPDATE books
    SET title            = $1,
        author           = $2,
        isbn             = $3,
        publication_year = $4
    WHERE book_id = $5
    RETURNING *
  `;
  const result = await pool.query(
    sql,
    [title, author, isbn, publicationYear || null, bookId]
  );
  return result.rows[0];
};

const deleteBook = async (bookId) => {
  const result = await pool.query(
    'DELETE FROM books WHERE book_id = $1',
    [bookId]
  );
  return result.rowCount;
};

module.exports = { createBook, getAllBooks, getBookById, updateBook, deleteBook };
