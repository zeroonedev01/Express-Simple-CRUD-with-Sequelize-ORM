const express = require("express")
const route = express.Router()

// Import Route
const companies = require("./company")
const employees = require("./employee")

route.use("/companies", companies)
route.use("/employees", employees)

module.exports = route
