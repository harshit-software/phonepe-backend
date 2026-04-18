const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  setMpin,
  updateMpin,
  showProfile,
} = require("../controllers/authControllers");
const { protect } = require("../middlewares/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication & User APIs
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - phone
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Harshit
 *               email:
 *                 type: string
 *                 example: harshit@gmail.com
 *               phone:
 *                 type: string
 *                 example: "9876543210"
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       201:
 *         description: User registered successfully
 */
router.post("/register", registerUser);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: harshit@gmail.com
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post("/login", loginUser);

/**
 * @swagger
 * /api/auth/set-mpin:
 *   post:
 *     summary: Set MPIN
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - mpin
 *             properties:
 *               mpin:
 *                 type: string
 *                 example: "1234"
 *     responses:
 *       200:
 *         description: MPIN set successfully
 */
router.post("/set-mpin", protect, setMpin);

/**
 * @swagger
 * /api/auth/update-mpin:
 *   post:
 *     summary: Update MPIN
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - oldMpin
 *               - newMpin
 *             properties:
 *               oldMpin:
 *                 type: string
 *                 example: "1234"
 *               newMpin:
 *                 type: string
 *                 example: "5678"
 *     responses:
 *       200:
 *         description: MPIN updated successfully
 */
router.post("/update-mpin", protect, updateMpin);

/**
 * @swagger
 * /api/auth/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile fetched successfully
 */
router.get("/profile", protect, showProfile);

module.exports = router;