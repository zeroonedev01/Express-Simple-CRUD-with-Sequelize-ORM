const express = require("express")
const route = express.Router()

// Import Route
const companies = require("./company")
const employee = require("./employee")

route.use("/companies", companies)
route.use("/employees", employee)

module.exports = route
