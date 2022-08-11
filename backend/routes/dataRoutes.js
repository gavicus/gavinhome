const express = require('express')
const router = express.Router()
const {
  createData,
  listData,
  getData,
  updateData,
  deleteData
} = require("../controllers/dataController");

router.route("/").post(createData)
router.route("/user/:userId").get(listData)
router.route("/:id")
.get(getData)
.put(updateData)
.delete(deleteData)

module.exports = router
