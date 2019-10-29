"use strict"
module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define(
    "Employee",
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      gender: DataTypes.BOOLEAN,
      password: DataTypes.STRING
    },
    {}
  )
  Employee.associate = function(models) {
    Employee.belongsTo(models.Company, {
      foreignKey: "companyId",
      onDelete: "CASCADE"
    })
  }
  return Employee
}
