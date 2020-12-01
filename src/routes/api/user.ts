import { authenticateToken } from "../../authentication";
import * as userController from "../../controllers/userController";

const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  res.status(404).send("404 Not found");
});

router.get("/id/:id", userController.get_user_basic);
router.get("/delete", authenticateToken, userController.delete_user);

router.post("/register", userController.create_user);
router.post("/login", userController.login);


//TODO: Delete this later
router.get("/test", authenticateToken, userController.token_test);


export default router;
