const User = require("../models/User");
const Transaction = require("../models/Transaction");
const bcrypt = require("bcryptjs");

const addMoney = async (req, res) => {
  try {
    const { amount } = req.body;
    const userId = req.user._id;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        message: "Amount must be greater than 0",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.balance += amount;
    await user.save();

    await Transaction.create({
      receiver: user._id,
      amount,
      type: "ADD_MONEY",
      status: "SUCCESS",
    });

    res.status(200).json({
      message: "Money added successfully",
      balance: user.balance,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

const sendMoney = async (req, res) => {
  try {
    const { receiverUpi, amount, mpin } = req.body;
    const senderId = req.user._id;

    if (!receiverUpi || !amount || !mpin) {
      return res.status(400).json({
        message: "Please provide all required fields",
      });
    }

    if (amount <= 0) {
      return res.status(400).json({
        message: "Amount must be greater than 0",
      });
    }

    const sender = await User.findById(senderId);
    if (!sender) {
      return res.status(404).json({ message: "Sender Not Found" });
    }

    const mpinMatch = await bcrypt.compare(mpin, sender.mpin);
    if (!mpinMatch) {
      return res.status(401).json({ message: "Invalid MPIN" });
    }

    const receiver = await User.findOne({ upi: receiverUpi });
    if (!receiver) {
      return res.status(404).json({ message: "Receiver Not Found" });
    }

    if (receiver._id.toString() === sender._id.toString()) {
      return res.status(400).json({
        message: "Cannot send money to yourself",
      });
    }

    if (sender.balance < amount) {
      return res.status(400).json({
        message: "Insufficient Balance",
      });
    }

    sender.balance -= amount;
    receiver.balance += amount;

    await sender.save();
    await receiver.save();

    await Transaction.create({
      sender: sender._id,
      receiver: receiver._id,
      amount,
      type: "TRANSFER",
      status: "SUCCESS",
    });

    res.status(200).json({
      message: "Money sent successfully",
      balance: sender.balance,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

const getTransactionHistory = async (req, res) => {
  try {
    const userId = req.user._id;

    // Fetch transactions where user is sender OR receiver
    const transactions = await Transaction.find({
      $or: [{ sender: userId }, { receiver: userId }],
    })
      .populate("sender", "name upi")
      .populate("receiver", "name upi")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Transaction history fetched successfully",
      count: transactions.length,
      transactions,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

module.exports = { addMoney, sendMoney, getTransactionHistory };
