const pool = require('../db');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
  const { phone, password, full_name, email, role } = req.body;
  try {
    const existing = await pool.query('SELECT * FROM users WHERE phone = $1', [phone]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hash = await bcrypt.hash(password, 10);
    await pool.query(
      'INSERT INTO users (phone, password, full_name, email, role) VALUES ($1, $2, $3, $4, $5)',
      [phone, hash, full_name, email, role || 'user']
    );
    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed' });
  }
};


exports.login = async (req, res) => {
  const { phone, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE phone = $1', [phone]);
    const user = result.rows[0];
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    res.json({ message: 'Login successful', userId: user.id, role: user.role });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
};
