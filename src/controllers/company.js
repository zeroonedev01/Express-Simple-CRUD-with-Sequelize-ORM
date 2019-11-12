const modCompany = require('../models').Company
const modEmployee = require('../models').Employee
const { client, caching, delCache } = require('../middleware/redis')

module.exports = {
    findAll: (req, res) => {
        const key = 'company-get:all'
        try {
            client.get(key, async (err, reply) => {
                if (err) {
                    console.log('Redis', err)
                    throw err
                }
                if (reply) {
                    res.status(200).json({
                        status: 200,
                        message: `Success Read ${key}`,
                        data: JSON.parse(reply),
                    })
                } else {
                    const execute = await modCompany.findAll({
                        order: [['name', 'ASC']],
                    })
                    caching(key, execute)
                    res.json({
                        status: 200,
                        message: `Success Read ${key}`,
                        data: execute,
                    })
                }
            })
        } catch (e) {
            console.log(e)
            res.status(500).json({
                status: 500,
                message: e.message || 'some error',
            })
        }
    },
    findById: async (req, res) => {
        const key = `company-get:id:${req.params.id}`
        try {
            client.get(key, async (err, reply) => {
                if (err) {
                    console.log('Redis', err)
                    throw err
                }
                if (reply) {
                    res.status(200).json({
                        status: 200,
                        message: `Success Read ${key}`,
                        data: JSON.parse(reply),
                    })
                } else {
                    const execute = await modCompany.findByPk(req.params.id, {
                        include: [
                            {
                                model: modEmployee,
                                as: 'employees',
                            },
                        ],
                    })
                    if (!execute) {
                        res.status(404).json({
                            status: 404,
                            message: 'Data Not Found',
                        })
                    } else {
                        caching(key, execute)
                        res.json({
                            status: 200,
                            message: `Success Read ${key}`,
                            data: execute,
                        })
                    }
                }
            })
        } catch (e) {
            console.log(e)
            res.status(500).json({
                status: 500,
                message: e.message || 'some error',
            })
        }
    },
    create: async (req, res) => {
        try {
            const data = { ...req.body }
            const exist = await modCompany.count({
                where: {
                    name: data.name,
                },
            })
            if (exist > 0) {
                res.status(409).json({
                    status: 409,
                    message: 'Duplicate Name Company',
                })
            } else {
                const execute = await modCompany.create(data)
                delCache('company-get*')
                res.status(201).json({
                    status: 201,
                    message: 'Data Added Successfully',
                    data: execute,
                })
            }
        } catch (e) {
            console.log(e)
            res.status(500).json({
                status: 500,
                message: e.message || 'some error',
            })
        }
    },
    update: async (req, res) => {
        try {
            const data = { ...req.body }
            const exist = await modCompany.findByPk(req.params.id)
            if (exist) {
                const execute = await exist.update(data)
                delCache('company-get*')
                res.json({
                    status: 200,
                    message: 'Data Edited Successfully',
                    data: execute,
                })
            } else {
                res.status(404).json({
                    status: 404,
                    message: 'Data Not FOund',
                })
            }
        } catch (e) {
            console.log(e)
            res.status(500).json({
                status: 500,
                message: e.message || 'some error',
            })
        }
    },
    destroy: async (req, res) => {
        try {
            const exist = await modCompany.findByPk(req.params.id)
            if (exist) {
                await modCompany.destroy({
                    where: {
                        id: req.params.id,
                    },
                })
                delCache('company-get*')
                res.json({
                    status: 200,
                    message: 'Data Deleted Successfully',
                    data: req.params.id,
                })
            } else {
                res.status(404).json({
                    status: 404,
                    message: 'Data Not FOund',
                })
            }
        } catch (e) {
            console.log(e)
            res.status(500).json({
                status: 500,
                message: e.message || 'some error',
            })
        }
    },
}
