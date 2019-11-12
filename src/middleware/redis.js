require('dotenv').config()
const redis = require('redis')
const RedisScan = require('node-redis-scan')

const redisAuth = process.env.REDIS_AUTH
const redisHost = process.env.REDIS_HOST
const redisPort = process.env.REDIS_PORT

const client = redis.createClient({
    port: redisPort,
    host: redisHost,
})
const scanner = new RedisScan(client)
client.auth(redisAuth, (err, response) => {
    if (err) {
        throw err
    }
})
client.on('error', err => {
    console.log(`redis error =>${err}`)
})

module.exports = {
    caching: (key, data) => {
        client.set(key, JSON.stringify(data))
    },
    delCache: key => {
        scanner.scan(key, (err, matchingKeys) => {
            if (err) throw err
            if (matchingKeys === undefined || matchingKeys.length === 0) {
                console.log('No Matching key')
                return
            }
            console.log('delete key', matchingKeys)
            client.del(matchingKeys)
        })
    },
    client,
}
