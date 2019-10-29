"use strict"

module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert("companies", [
      {
        name: "Perwira Media",
        address: "Purbalingga"
      },
      {
        name: "Samsung",
        address: "Korea"
      },
      {
        name: "Apple",
        address: "Amerika"
      },
      {
        name: "Google",
        address: "Amerika"
      }
    ]),

  down: queryInterface => queryInterface.bulkDelete("companies", null, {})
}
