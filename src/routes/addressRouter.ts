import { Address } from "../entity/Address";

const express = require("express");
const router = express.Router();

//Address GET request - return list of all addresses
//TODO: remove later
router.get("/", async (req, res) => {
  const addresses = await Address.find();
  let response = "";

  addresses.forEach((address) => {
    response += JSON.stringify(address);
  });

  res.send(response);
});

export default router;
