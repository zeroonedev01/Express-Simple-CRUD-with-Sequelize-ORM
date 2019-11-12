module.exports = (sequelize, DataTypes) => {
    const Company = sequelize.define(
        'Company',
        {
            name: DataTypes.STRING,
            address: DataTypes.STRING,
        },
        {}
    )
    Company.associate = function(models) {
        Company.hasMany(models.Employee, {
            foreignKey: 'companyId',
            as: 'employees',
        })
    }
    return Company
}
