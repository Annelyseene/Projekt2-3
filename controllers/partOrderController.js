const pool = require('../db');

exports.createOrder = async (req, res) => {
  const { part_id, delivery_date } = req.body;
  try {
    await pool.query('INSERT INTO part_orders (part_id, delivery_date) VALUES ($1, $2)', [part_id, delivery_date]);
    res.status(201).json({ message: 'Order created' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create order' });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM part_orders');
    res.json(result.rows);
  } catch (err) {
    console.error('Ошибка получения заказов:', err);
    res.status(500).json({ error: 'Failed to get orders' });
  }
};

