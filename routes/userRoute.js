const express = require("express");
const userRoute = express();

const bodyParser = require("body-parser");

userRoute.use(bodyParser.json());
userRoute.use(bodyParser.urlencoded({ extended: true }));

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/userImages"));
  },
  filename: (req, file, cb) => {
    const name = Date.now() + "-" + file.originalname;
    cb(null, name);
  },
});
const upload = multer({ storage: storage });

userRoute.set("view engine", "ejs");
userRoute.set("views", "./views/users");

const userController = require("../controllers/userController");

userRoute.get("/register", userController.getRegisterPage);
userRoute.post("/register", upload.single("image"), userController.createUser);
userRoute.get("/verify", userController.verifyEmail);
userRoute.post("/verify", userController.verifyEmail);

module.exports = userRoute;
