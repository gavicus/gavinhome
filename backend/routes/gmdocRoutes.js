const express = require('express')
const router = express.Router()
const {
  createGmdoc,
  getGmdoc,
  listGmdocs,
  updateGmdoc,
  deleteGmdoc
} = require("../controllers/gmdocController");

router.route("/").post(createGmdoc)
router.route("/gm/:gmId").get(listGmdocs)
router.route("/:id")
.get(getGmdoc)
.put(updateGmdoc)
.delete(deleteGmdoc)

module.exports = router
