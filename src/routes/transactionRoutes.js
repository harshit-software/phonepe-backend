const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const {
  addMoney,
  sendMoney,
  getTransactionHistory,
} = require("../controllers/transactionController");

/**
 * @swagger
 * tags:
 *   name: Wallet
 *   description: Wallet & Transaction APIs
 */

/**
 * @swagger
 * /api/wallet/add-money:
 *   post:
 *     summary: Add money to wallet
 *     tags: [Wallet]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 500
 *     responses:
 *       200:
 *         description: Money added successfully
 *       400:
 *         description: Invalid amount
 *       401:
 *         description: Unauthorized
 */
router.post("/add-money", protect, addMoney);

/**
 * @swagger
 * /api/wallet/send-money:
 *   post:
 *     summary: Send money to another user via UPI
 *     tags: [Wallet]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - receiverUpi
 *               - amount
 *               - mpin
 *             properties:
 *               receiverUpi:
 *                 type: string
 *                 example: "9876543210@phonepe"
 *               amount:
 *                 type: number
 *                 example: 100
 *               mpin:
 *                 type: string
 *                 example: "1234"
 *     responses:
 *       200:
 *         description: Money sent successfully
 *       400:
 *         description: Invalid input / insufficient balance
 *       401:
 *         description: Invalid MPIN / Unauthorized
 *       404:
 *         description: Receiver not found
 */
router.post("/send-money", protect, sendMoney);

/**
 * @swagger
 * /api/wallet/history:
 *   get:
 *     summary: Get transaction history of logged-in user
 *     tags: [Wallet]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Transaction history fetched successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/history", protect, getTransactionHistory);

module.exports = router;