const express = require('express')
const router = express.Router()
const {
  createCharacter,
  getCharacters,
  getCharacter,
  updateCharacter,
  deleteCharacter,
} = require("../controllers/characterController");

router.route("/").post(createCharacter)
router.route("/user/:userId").get(getCharacters)
router.route("/:id").get(getCharacter).put(updateCharacter).delete(deleteCharacter)

module.exports = router
