import { authenticateToken, authenticateTokenGet } from "../../authentication";
import * as userController from "../../controllers/userController";

const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  res.status(404).send("404 Not found");
});

router.post("/register", userController.create_user);
router.post("/login", userController.login);
router.post("/delete", authenticateToken, userController.delete_user);
router.post("/add-address", authenticateToken, userController.add_address);
router.post("/delete-address", authenticateToken, userController.delete_address);
router.post("/forgot-password", userController.forgot_password);
router.post("/change-password/:token", userController.change_password);

router.get("/me", authenticateTokenGet, userController.me);
router.get("/:id", userController.get_user_basic);

export default router;
