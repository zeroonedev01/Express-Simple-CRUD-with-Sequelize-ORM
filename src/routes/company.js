const express = require("express")
const Route = express.Router()
const ctrlCompanies = require("../controllers/company")

Route.get("/", ctrlCompanies.findAll)
  .get("/:id", ctrlCompanies.findById)
  .post("/", ctrlCompanies.create)
  .patch("/:id", ctrlCompanies.update)
  .delete("/:id", ctrlCompanies.destroy)

module.exports = Route
