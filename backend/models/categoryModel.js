const db = require('./db');

exports.getAllCategories = (callback) => {
  db.all(`SELECT * FROM categories`, [], callback);
};

exports.createCategory = (name, itemCount, image, callback) => {
  db.run(`INSERT INTO categories (name, itemCount, image) VALUES (?, ?, ?)`, [name, itemCount, image], callback);
};

exports.updateCategory = (id, fields, callback) => {
  const keys = Object.keys(fields);
  const values = Object.values(fields);

  if (keys.length === 0) {
    return callback(new Error('No fields to update'));
  }

  const setClause = keys.map(key => `${key} = ?`).join(', ');
  const sql = `UPDATE categories SET ${setClause} WHERE id = ?`;

  db.run(sql, [...values, id], function (err) {
    callback(err);
  });
};
