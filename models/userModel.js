const db = require('../config/db');
const bcrypt = require('bcryptjs');

const User = {
  create: async (name, email, phone, password, role) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO user (name, email, phone, password, role) VALUES (?, ?, ?, ?, ?)';
    return db.promise().query(query, [name, email, phone, hashedPassword, role]);
  },

  findByname: (name) => {
    const query = 'SELECT * FROM user WHERE name = ?';
    return db.promise().query(query, [name]);
  },

  getAll: () => {
    const query = 'SELECT id, name, email, created_at FROM user';
    return db.promise().query(query);
  },

  update: (id, name, email) => {
    const query = 'UPDATE user SET name = ?, email = ? WHERE id = ?';
    return db.promise().query(query, [name, email, id]);
  },

  delete: (id) => {
    const query = 'DELETE FROM user WHERE id = ?';
    return db.promise().query(query, [id]);
  },
};

module.exports = User;