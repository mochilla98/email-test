const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { sendVerificationEmail } = require("../utils");

const crypto = require("crypto");

// getting register page
const getRegisterPage = async (req, res) => {
  try {
    res.render("register");
  } catch (error) {
    console.log(error);
  }
};

// creating new user
const createUser = async (req, res) => {
  const image = req.file.filename;
  const { name, email, number, password } = req.body;
  //hash password
  const hashPassword = await bcrypt.hash(password, 10);

  // verification token
  const verificationToken = crypto.randomBytes(40).toString("hex");

  const user = await User.create({
    image,
    name,
    email,
    number,
    password: hashPassword,
    isAdmin: ifAdmin,
    verificationToken,
  });
  const origin = "http://localhost:4000";

  await sendVerificationEmail({
    name: user.name,
    email: user.email,
    verificationToken: user.verificationToken,
    origin,
  });

  res.render("register", {
    message: "successfully registered, please verify your mail",
  });
};

const verifyEmail = async (req, res) => {
  const { verificationToken, email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.send("Verification Failed,no uaer found ");
  }

  if (user.verificationToken !== verificationToken) {
    res.send("Verification token not present");
  }

  (user.isVerified = true), (user.verified = Date.now());
  user.verificationToken = "";

  await user.save();

  res.send("Email Verified");
  res.render("emailVerified");
  console.log(verificationToken);
};

module.exports = {
  getRegisterPage,
  createUser,
  verifyEmail,
};
