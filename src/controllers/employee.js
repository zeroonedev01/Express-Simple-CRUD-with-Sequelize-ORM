require('dotenv').config()
const bcrypt = require('bcryptjs')
const modEmployee = require('../models').Employee

const roundSalt = process.env.ROUND_SALT || 8
const { client, caching, delCache } = require('../middleware/redis')

module.exports = {
    findAll: async (req, res) => {
        const key = 'employee-get:all'
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
                    const execute = await modEmployee.findAll({
                        order: [['name', 'ASC']],
                    })
                    caching(key, execute)
                    res.json({
                        status: 200,
                        message: 'Success Retrieve Data',
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
        const key = `employee-get:id:${req.params.id}`
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
                    const execute = await modEmployee.findByPk(req.params.id)
                    if (!execute) {
                        res.status(404).json({
                            status: 404,
                            message: 'Data Not Found',
                        })
                    } else {
                        caching(key, execute)
                        res.json({
                            status: 200,
                            message: 'Success Retrieve Data',
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
            data.password = bcrypt.hashSync(
                req.body.password,
                parseInt(roundSalt, 10)
            )
            const exist = await modEmployee.count({
                where: {
                    email: data.email,
                },
            })
            console.log(exist)
            if (exist > 0) {
                res.status(409).json({
                    status: 409,
                    message: 'Duplicate Employee',
                })
            } else {
                const execute = await modEmployee.create(data)
                delCache('employee-get*')
                res.status(201).json({
                    status: 201,
                    message: 'Success',
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
            if (req.body.password) {
                data.password = bcrypt.hashSync(
                    req.body.password,
                    parseInt(roundSalt, 10)
                )
            }
            const exist = await modEmployee.findByPk(req.params.id)
            if (exist) {
                const execute = await exist.update(data)
                delCache('employee-get*')
                res.json({
                    status: 200,
                    message: 'Data Edited Successfully',
                    data: execute,
                })
            } else {
                res.status(404).json({
                    status: 404,
                    message: 'Data Not Found',
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
            const exist = await modEmployee.findByPk(req.params.id)
            if (exist) {
                await modEmployee.destroy({
                    where: {
                        id: req.params.id,
                    },
                })
                delCache('employee-get*')
                res.json({
                    status: 200,
                    message: 'Data Deleted Successfully',
                    data: req.params.id,
                })
            } else {
                res.status(404).json({
                    status: 404,
                    message: 'Data Not Found',
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
