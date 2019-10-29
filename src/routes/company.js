const express = require("express")
const Route = express.Router()
const ctrlCompanies = require("../controllers/company")

Route.get("/", ctrlCompanies.findAll)
//   .get("/:id", multerUploads, CtrlRooms.getRoomById)
//   .post("/", multerUploads, CtrlRooms.create)
//   .patch("/:id", multerUploads, CtrlRooms.edit)
//   .delete("/:id", multerUploads, CtrlRooms.delete)

module.exports = Route
