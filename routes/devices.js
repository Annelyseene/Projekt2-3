const express = require('express');
const router = express.Router();
const { createDevice, updateDevice, deleteDevice, getAllDevices } = require('../controllers/deviceController');
const { getDeviceById } = require('../controllers/deviceController');
router.get('/:id', getDeviceById);

/**
 * @swagger
 * tags:
 *   name: Devices
 *   description: Управление устройствами
 */

/**
 * @swagger
 * /api/devices:
 *   post:
 *     summary: Добавить новое устройство
 *     tags: [Devices]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - brand
 *               - model
 *               - serial_number
 *               - warranty_end_date
 *             properties:
 *               brand:
 *                 type: string
 *                 example: ASUS
 *               model:
 *                 type: string
 *                 example: VivoBook S14
 *               serial_number:
 *                 type: string
 *                 example: ASU-45678-RUS
 *               warranty_end_date:
 *                 type: string
 *                 format: date
 *                 example: 2026-01-20
 *     responses:
 *       201:
 *         description: Устройство добавлено
 *       500:
 *         description: Ошибка при добавлении
 */
router.post('/', createDevice);

/**
 * @swagger
 * /api/devices:
 *   get:
 *     summary: Получить список всех устройств
 *     tags: [Devices]
 *     responses:
 *       200:
 *         description: Список устройств
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Ошибка при получении списка
 */
router.get('/', getAllDevices);

/**
 * @swagger
 * /api/devices/{id}:
 *   put:
 *     summary: Обновить данные об устройстве
 *     tags: [Devices]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID устройства
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               brand:
 *                 type: string
 *               model:
 *                 type: string
 *               serial_number:
 *                 type: string
 *               warranty_end_date:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Устройство обновлено
 *       500:
 *         description: Ошибка при обновлении
 */
router.put('/:id', updateDevice);

/**
 * @swagger
 * /api/devices/{id}:
 *   delete:
 *     summary: Удалить устройство
 *     tags: [Devices]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID устройства
 *     responses:
 *       200:
 *         description: Устройство удалено
 *       500:
 *         description: Ошибка при удалении
 */
router.delete('/:id', deleteDevice);

module.exports = router;
