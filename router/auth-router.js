const express = require("express");
const router = express.Router();
const authcontroller = require("../controllers/auth-controller");
const { signupSchema, loginSchema } = require("../validators/auth-validator");
const validate = require("../middlewares/validate-middleware");
const authMiddleware = require("../middlewares/auth.middlewares")

// const {home , register} = require("../controllers/auth-controller")

// router.get("/", (req, res) => {
//     res.status(200).send("Welcome to Sujal Kingdom using router");
// })

router.route("/").get(authcontroller.home);
router.route("/register").post(validate(signupSchema), authcontroller.register);
router.route("/login").post(validate(loginSchema), authcontroller.login);
router.route("/user").get(authMiddleware, authcontroller.user);

module.exports = router;