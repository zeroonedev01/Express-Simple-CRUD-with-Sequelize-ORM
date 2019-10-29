// intialize
require("dotenv").config()
const express = require("express")
const logger = require("morgan")
const bodyParser = require("body-parser")
const cors = require("cors")
// Set up the express app
const app = express()
//set up port
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is RUnning on port : ${PORT}`)
})
//set up cors
app.use(cors())
// Log requests to the console.
app.use(logger("dev"))
// Parse incoming requests data
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get("/api", (rq, rs) => {
  rs.send("Welcome to the beginning")
})
app.get("/api/v1", (rq, rs) => {
  rs.send("Api version 1")
})
const routeNav = require("./src/routes/index")
app.use("/api/v1/", routeNav)
// app.get("*", (rq, rs) => {
//   rs.send("Welcome to the beginning")
// })
