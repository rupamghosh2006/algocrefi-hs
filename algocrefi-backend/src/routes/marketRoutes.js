const express = require("express");
const router = express.Router();
const marketController = require("../controllers/marketController");

router.get("/ohlc", marketController.getOhlc);
router.get("/stats", marketController.getStats);

module.exports = router;
