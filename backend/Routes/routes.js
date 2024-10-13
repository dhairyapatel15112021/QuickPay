const express = require("express");
const router = express.Router();

const authHandler = require("../middlewares/authHandler");

const userController = require("../controllers/userController");
const accountController = require("../controllers/accountController");

router.get("/me",userController.checkLogin);

router.get("/user/bulk",authHandler.AuthHandler,userController.userFilter);

router.post("/user/signup",userController.userSignUp);
router.post("/user/signin",userController.userSignIn);

router.put("/user/update",authHandler.AuthHandler,userController.userUpdate);

router.post("/account/balance",authHandler.AuthHandler,accountController.userBalance);
router.post("/account/transfer",authHandler.AuthHandler,accountController.userBalanceTransfer);

module.exports = router;