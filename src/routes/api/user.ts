import { runInContext } from "vm";
import { authenticateToken } from "../../authentication";
import * as userController from "../../controllers/userController";

const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  res.status(404).send("404 Not found");
});

router.get("/id/:id", userController.get_user_basic);

router.post("/create", userController.create_user);

router.get("/test", authenticateToken, userController.token_test);

export default router;
