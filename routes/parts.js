const express = require('express');
const router = express.Router();
const {
  addPart,
  getPartsByDevice,
  getAllParts,
  deletePart
} = require('../controllers/partController');

/**
 * @swagger
 * tags:
 *   name: Parts
 *   description: Управление запчастями
 */

/**
 * @swagger
 * /api/parts:
 *   post:
 *     summary: Добавить новую запчасть
 *     tags: [Parts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - device_id
 *             properties:
 *               name:
 *                 type: string
 *                 example: Аккумулятор HP
 *               device_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Запчасть добавлена
 *       500:
 *         description: Ошибка на сервере
 */
router.post('/', addPart);

/**
 * @swagger
 * /api/parts/device/{device_id}:
 *   get:
 *     summary: Получить запчасти по ID устройства
 *     tags: [Parts]
 *     parameters:
 *       - in: path
 *         name: device_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID устройства
 *     responses:
 *       200:
 *         description: Список запчастей
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Ошибка при получении запчастей
 */
router.get('/device/:device_id', getPartsByDevice);

/**
 * @swagger
 * /api/parts:
 *   get:
 *     summary: Получить все запчасти
 *     tags: [Parts]
 *     responses:
 *       200:
 *         description: Список всех запчастей
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Ошибка при получении запчастей
 */
router.get('/', getAllParts);

/**
 * @swagger
 * /api/parts/{id}:
 *   delete:
 *     summary: Удалить запчасть по ID
 *     tags: [Parts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID запчасти
 *     responses:
 *       200:
 *         description: Запчасть удалена
 *       500:
 *         description: Ошибка при удалении
 */
router.delete('/:id', deletePart);

module.exports = router;
