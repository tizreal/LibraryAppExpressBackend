const bookRepo = require('../repositories/bookRepository');

const createBook = async (body) => {
  const { title, author, isbn, publication_year } = body;

  if (!title || !title.trim()) throw { status: 400, message: 'title is required' };
  if (!author || !author.trim()) throw { status: 400, message: 'author is required' };
  if (!isbn || !isbn.trim()) throw { status: 400, message: 'isbn is required' };

  try {
    return await bookRepo.createBook(
      title.trim(), author.trim(), isbn.trim(), publication_year || null
    );
  } catch (err) {
    if (err.code === '23505') {
      throw { status: 409, message: `A book with ISBN '${isbn}' already exists` };
    }
    throw err;
  }
};

const getAllBooks = async () => {
  return await bookRepo.getAllBooks();
};

const getBookById = async (bookId) => {
  const book = await bookRepo.getBookById(bookId);
  if (!book) {
    throw { status: 404, message: `Book not found with ID: ${bookId}` };
  }
  return book;
};

const updateBook = async (bookId, body) => {
  const { title, author, isbn, publication_year } = body;

  if (!title || !author || !isbn)
    throw { status: 400, message: 'title, author, and isbn are required' };

  const existing = await bookRepo.getBookById(bookId);
  if (!existing) {
    throw { status: 404, message: `Book not found with ID: ${bookId}` };
  }

  try {
    return await bookRepo.updateBook(
      bookId, title.trim(), author.trim(), isbn.trim(), publication_year || null
    );
  } catch (err) {
    if (err.code === '23505') {
      throw { status: 409, message: `A book with ISBN '${isbn}' already exists` };
    }
    throw err;
  }
};

const deleteBook = async (bookId) => {
  const rowCount = await bookRepo.deleteBook(bookId);
  if (rowCount === 0) {
    throw { status: 404, message: `Book not found with ID: ${bookId}` };
  }
};

module.exports = { createBook, getAllBooks, getBookById, updateBook, deleteBook };
