const express = require('express');
const router = express.Router();
const { createOrder, getAllOrders } = require('../controllers/partOrderController');

/**
 * @swagger
 * tags:
 *   name: PartOrders
 *   description: Управление заказами на запчасти
 */

/**
 * @swagger
 * /api/part-orders:
 *   post:
 *     summary: Создать заказ на запчасть
 *     tags: [PartOrders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - part_id
 *               - delivery_date
 *             properties:
 *               part_id:
 *                 type: integer
 *                 example: 10
 *               delivery_date:
 *                 type: string
 *                 format: date
 *                 example: 2025-05-22
 *     responses:
 *       201:
 *         description: Заказ создан
 *       500:
 *         description: Ошибка при создании заказа
 */
router.post('/', createOrder);

/**
 * @swagger
 * /api/part-orders:
 *   get:
 *     summary: Получить список всех заказов на запчасти
 *     tags: [PartOrders]
 *     responses:
 *       200:
 *         description: Список заказов
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Ошибка при получении заказов
 */
router.get('/', getAllOrders); 

module.exports = router;
