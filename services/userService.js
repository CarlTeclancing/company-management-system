// Optional: Will handle user-related logic like profile update
// Useful for subscriptions later

const db = require('../config/db');

exports.getUserById = async (id) => {
  const [user] = await db.execute('SELECT * FROM users WHERE id = ?', [id]);
  return user[0];
};
