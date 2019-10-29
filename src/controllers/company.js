const modCompany = require("../models").Company

module.exports = {
  findAll: async (req, res) => {
    try {
      const data = await modCompany.findAll({
        order: [["name", "ASC"]]
      })
      res.json({
        status: 201,
        message: "Success",
        data: data
      })
    } catch (e) {
      res.status(500).json({
        status: 500,
        message: e.message || "some error"
      })
    }
  }
}
