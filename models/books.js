const db = require('../config/conn');

class Books {
  constructor(
    id,
    publisher,
    description,
    title,
    price,
    creators,
    release_date,
    diamond_id
  ) {
    this.id = id;
    this.publisher = publisher;
    this.description = description;
    this.title = title;
    this.price = price;
    this.creators = creators;
    this.release_date = release_date;
    this.diamond_id = diamond_id;
  }

  static async getAll() {
    try {
      const response = await db.any(`select * from books;`);
      return response;
    } catch (err) {
      return err.message;
    }
  }

  static async getById(b_id) {
    try {
      const response = await db.one(`select * from books where id = ${b_id}`);
      return response;
    } catch (err) {
      return err.message;
    }
  }

  static async getReviewsById(b_id) {
    try {
      const response = await db.any(
        `select * from reviews where book_id = ${b_id}`
      );
      return response;
    } catch (err) {
      return err.message;
    }
  }
}

module.exports = Books;
