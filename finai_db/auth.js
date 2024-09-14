// auth.js
const db = require('./db');

const login = (email, password) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
    db.query(query, [email, password], (err, results) => {
      if (err) {
        reject(err);
      } else if (results.length === 0) {
        reject(new Error('Invalid email or password'));
      } else {
        resolve(results[0]);
      }
    });
  });
};

module.exports = { login };

