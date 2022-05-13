const express = require('express')
const router = express.Router()
const {
  createScore,
  getScores,
  deleteScore,
  getOneScore,
  updateScore,
  getAllScores,
} = require("../controllers/scoreController");

router.route("/").post(createScore).get(getAllScores)
router.route("/:id").delete(deleteScore).get(getOneScore).put(updateScore)
router.route("/:userId/:subject").get(getScores)

module.exports = router
