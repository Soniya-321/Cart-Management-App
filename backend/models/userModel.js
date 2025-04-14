const db = require('./db');
exports.createUser = (username, password, callback) => {
  db.run(`INSERT INTO users (username, password) VALUES (?, ?)`, [username, password], callback);
};

exports.findUser = (username, callback) => {
  db.get(`SELECT * FROM users WHERE username = ?`, [username], callback);
};
