require("dotenv").config()
const bcrypt = require("bcryptjs")
const modEmployee = require("../models").Employee
const roundSalt = process.env.ROUND_SALT || 8
module.exports = {
  findAll: async (req, res) => {
    try {
      const execute = await modEmployee.findAll({
        order: [["name", "ASC"]]
      })
      res.json({
        status: 200,
        message: "Success Retrieve Data",
        data: execute
      })
    } catch (e) {
      console.log(e)
      res.status(500).json({
        status: 500,
        message: e.message || "some error"
      })
    }
  },
  findById: async (req, res) => {
    try {
      const execute = await modEmployee.findByPk(req.params.id)
      if (!execute) {
        return res.status(404).json({
          status: 404,
          message: "Data Not Found"
        })
      }
      res.json({
        status: 200,
        message: "Success Retrieve Data",
        data: execute
      })
    } catch (e) {
      console.log(e)
      res.status(500).json({
        status: 500,
        message: e.message || "some error"
      })
    }
  },
  create: async (req, res) => {
    try {
      const data = { ...req.body }
      data.password = bcrypt.hashSync(req.body.password, parseInt(roundSalt))
      const exist = await modEmployee.count({
        where: {
          email: data.email
        }
      })
      console.log(exist)
      if (exist > 0) {
        res.status(409).json({
          status: 409,
          message: "Duplicate Employee"
        })
      } else {
        const execute = await modEmployee.create(data)
        res.status(201).json({
          status: 201,
          message: "Success",
          data: execute
        })
      }
    } catch (e) {
      console.log(e)
      res.status(500).json({
        status: 500,
        message: e.message || "some error"
      })
    }
  },
  update: async (req, res) => {
    try {
      const data = { ...req.body }
      if (req.body.password) {
        data.password = bcrypt.hashSync(req.body.password, parseInt(roundSalt))
      }
      const exist = await modEmployee.findByPk(req.params.id)
      if (exist) {
        const execute = await exist.update(data)
        res.json({
          status: 200,
          message: "Data Edited Successfully",
          data: execute
        })
      } else {
        res.status(404).json({
          status: 404,
          message: "Data Not Found"
        })
      }
    } catch (e) {
      console.log(e)
      res.status(500).json({
        status: 500,
        message: e.message || "some error"
      })
    }
  },
  destroy: async (req, res) => {
    try {
      const exist = await modEmployee.findByPk(req.params.id)
      if (exist) {
        const execute = await modEmployee.destroy({
          where: {
            id: req.params.id
          }
        })
        res.json({
          status: 200,
          message: "Data Deleted Successfully",
          data: req.params.id
        })
      } else {
        res.status(404).json({
          status: 404,
          message: "Data Not Found"
        })
      }
    } catch (e) {
      console.log(e)
      res.status(500).json({
        status: 500,
        message: e.message || "some error"
      })
    }
  }
}
