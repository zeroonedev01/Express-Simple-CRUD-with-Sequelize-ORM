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
        status: 201,
        message: "Success",
        data: execute
      })
    } catch (e) {
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
        res.json({
          status: 400,
          message: "Data Not Found"
        })
      } else {
        res.json({
          status: 201,
          message: "Success",
          data: execute
        })
      }
    } catch (e) {
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
        res.json({
          status: 409,
          message: "Duplicate Employee"
        })
      } else {
        const execute = await modEmployee.create(data)
        res.json({
          status: 201,
          message: "Success",
          data: execute
        })
      }
    } catch (e) {
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
        const execute = await modEmployee.update(data, {
          where: {
            id: req.params.id
          }
        })
        const newData = await modEmployee.findByPk(req.params.id)
        res.json({
          status: 201,
          message: "Success",
          data: newData
        })
      } else {
        res.json({
          status: 400,
          message: "Data Not FOund"
        })
      }
    } catch (e) {
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
          status: 201,
          message: "Success",
          data: req.params.id
        })
      } else {
        res.json({
          status: 400,
          message: "Data Not FOund"
        })
      }
    } catch (e) {
      res.status(500).json({
        status: 500,
        message: e.message || "some error"
      })
    }
  }
}
