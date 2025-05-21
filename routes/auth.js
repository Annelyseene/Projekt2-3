const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Регистрация и вход пользователей
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Регистрация нового пользователя
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - phone
 *               - password
 *             properties:
 *               phone:
 *                 type: string
 *                 example: 89001234567
 *               password:
 *                 type: string
 *                 example: secret123
 *               full_name:
 *                 type: string
 *                 example: Иванов Иван Иванович
 *               email:
 *                 type: string
 *                 example: ivanov@example.com
 *               role:
 *                 type: string
 *                 example: user
 *     responses:
 *       201:
 *         description: Пользователь зарегистрирован
 *       500:
 *         description: Ошибка при регистрации
 */
router.post('/register', register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Вход пользователя
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - phone
 *               - password
 *             properties:
 *               phone:
 *                 type: string
 *                 example: 89001234567
 *               password:
 *                 type: string
 *                 example: secret123
 *     responses:
 *       200:
 *         description: Успешный вход
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login successful
 *                 userId:
 *                   type: integer
 *                   example: 1
 *                 role:
 *                   type: string
 *                   example: user
 *       401:
 *         description: Неверные данные
 *       500:
 *         description: Ошибка при входе
 */
router.post('/login', login);

module.exports = router;
