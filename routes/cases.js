const express = require('express');
const router = express.Router();
const {
  createCase,
  deleteCase,
  updateStatus,
  getAllCases,
  getCaseById
} = require('../controllers/caseController');

/**
 * @swagger
 * tags:
 *   name: Cases
 *   description: Управление ремонтными заявками (кейсы)
 */

/**
 * @swagger
 * /api/cases:
 *   post:
 *     summary: Создать новую заявку
 *     tags: [Cases]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - full_name
 *               - phone
 *               - description
 *               - status
 *               - device_id
 *             properties:
 *               full_name:
 *                 type: string
 *                 example: Иванов Иван Иванович
 *               email:
 *                 type: string
 *                 example: ivanov@example.com
 *               phone:
 *                 type: string
 *                 example: 89001234567
 *               description:
 *                 type: string
 *                 example: Устройство не включается
 *               status:
 *                 type: string
 *                 enum: [cancelled, accepted, in_progress, completed]
 *                 example: accepted
 *               device_id:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       201:
 *         description: Заявка создана
 *       500:
 *         description: Ошибка при создании заявки
 */
router.post('/', createCase);

/**
 * @swagger
 * /api/cases:
 *   get:
 *     summary: Получить все заявки
 *     tags: [Cases]
 *     responses:
 *       200:
 *         description: Список всех заявок
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Ошибка при получении заявок
 */
router.get('/', getAllCases);

/**
 * @swagger
 * /api/cases/{id}:
 *   get:
 *     summary: Получить заявку по ID
 *     tags: [Cases]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID заявки
 *     responses:
 *       200:
 *         description: Информация о заявке
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Заявка не найдена
 *       500:
 *         description: Ошибка при получении
 */
router.get('/:id', getCaseById);

/**
 * @swagger
 * /api/cases/{id}:
 *   delete:
 *     summary: Удалить заявку по ID
 *     tags: [Cases]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID заявки
 *     responses:
 *       200:
 *         description: Заявка удалена
 *       500:
 *         description: Ошибка при удалении заявки
 */
router.delete('/:id', deleteCase);

/**
 * @swagger
 * /api/cases/{id}/status:
 *   patch:
 *     summary: Обновить статус заявки
 *     tags: [Cases]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID заявки
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [cancelled, accepted, in_progress, completed]
 *                 example: in_progress
 *     responses:
 *       200:
 *         description: Статус обновлён
 *       500:
 *         description: Ошибка при обновлении статуса
 */
router.patch('/:id/status', updateStatus);

module.exports = router;
