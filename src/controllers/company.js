const modCompany = require("../models").Company
const modEmployee = require("../models").Employee

module.exports = {
  findAll: async (req, res) => {
    try {
      const execute = await modCompany.findAll({
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
      const execute = await modCompany.findByPk(req.params.id, {
        include: [
          {
            model: modEmployee,
            as: "employees"
          }
        ]
      })
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
      const exist = await modCompany.count({
        where: {
          name: data.name
        }
      })
      if (exist > 0) {
        res.status(409).json({
          status: 409,
          message: "Duplicate Name Company"
        })
      } else {
        const execute = await modCompany.create(data)
        res.status(201).json({
          status: 201,
          message: "Data Added Successfully",
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
      const exist = await modCompany.findByPk(req.params.id)
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
          message: "Data Not FOund"
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
      const exist = await modCompany.findByPk(req.params.id)
      if (exist) {
        const execute = await modCompany.destroy({
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
          message: "Data Not FOund"
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
