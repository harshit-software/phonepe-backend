const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const registerUser = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({ message: "Provide All Required Fields" });
    }

    const cleanPhone = phone.replace(/\D/g, "");

    if (cleanPhone.length !== 10) {
      return res.status(400).json({ message: "Invalid Phone Number" });
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { phone: cleanPhone }],
    });
    if (existingUser) {
      return res.status(400).json({
        message: "User Already Registered",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const upi = `${cleanPhone}@phonepe`;
    const newUser = await User.create({
      name,
      email,
      phone: cleanPhone,
      password: hashedPassword,
      upi,
    });

    if (newUser) {
      res.status(201).json({
        message: "User Registered Successfully",
        user: {
          name: newUser.name,
          phone: newUser.phone,
          upi: newUser.upi,
          balance: newUser.balance,
          mpinSet: false,
          token: generateToken(newUser._id),
        },
      });
    } else {
      res.status(400).json({ message: "Invalid User Data" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Provide Both Email and Password" });
    }

    const isPresent = await User.findOne({ email });
    if (!isPresent) {
      return res.status(400).json({ message: "Invalid Email or Password" });
    }

    const isMatch = await bcrypt.compare(password, isPresent.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Email or Password" });
    }

    res.json({
      message: "User Login Successfully",
      user: {
        name: isPresent.name,
        email: isPresent.email,
        phone: isPresent.phone,
        upi: isPresent.upi,
        balance: isPresent.balance,
        mpinSet: !!isPresent.mpin,
        token: generateToken(isPresent._id),
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const setMpin = async (req, res) => {
  try {
    const { mpin } = req.body;

    // 1. Validate MPIN (exactly 4 digits)
    if (!/^\d{4}$/.test(mpin)) {
      return res.status(400).json({
        message: "MPIN must be exactly 4 digits",
      });
    }

    // 2. Get user
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 3. Prevent overwriting existing MPIN
    if (user.mpin) {
      return res.status(400).json({
        message: "MPIN already set. Use update MPIN instead.",
      });
    }

    // 4. Hash MPIN
    const salt = await bcrypt.genSalt(10);
    const hashedMpin = await bcrypt.hash(mpin, salt);

    // 5. Save MPIN
    user.mpin = hashedMpin;
    await user.save();

    // 6. Response
    res.status(200).json({
      message: "MPIN set successfully",
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Duplicate MPIN error",
      });
    }

    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const updateMpin = async (req, res) => {
  try {
    const { oldMpin, newMpin } = req.body;
    if (!oldMpin || !newMpin) {
      return res.status(400).json({
        message: "Provide old and new MPIN",
      });
    }

    if (!/^\d{4}$/.test(newMpin)) {
      return res.status(400).json({
        message: "New MPIN must be exactly 4 digits",
      });
    }

    const user = await User.findById(req.user._id);
    if (!user || !user.mpin) {
      return res.status(400).json({ message: "MPIN not set yet" });
    }

    const isMatch = await bcrypt.compare(oldMpin, user.mpin);
    if (!isMatch) {
      return res.status(400).json({
        message: "Incorrect old MPIN",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedMpin = await bcrypt.hash(newMpin, salt);

    user.mpin = hashedMpin;
    await user.save();

    res.json({
      message: "MPIN updated successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const showProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password -mpin");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else {
      res.json(user);
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
module.exports = { registerUser, loginUser, setMpin, updateMpin, showProfile };
