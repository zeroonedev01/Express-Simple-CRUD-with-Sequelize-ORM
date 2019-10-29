const express = require("express")
const route = express.Router()

// Import Route
const companies = require("./company")

route.use("/companies", companies)

module.exports = route
