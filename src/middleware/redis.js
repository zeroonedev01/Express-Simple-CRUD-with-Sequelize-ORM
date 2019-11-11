require("dotenv").config()
const redis = require("redis")
const redisScan = require("node-redis-scan")
const redis_auth = process.env.REDIS_AUTH
const redis_host = process.env.REDIS_HOST
const redis_port = process.env.REDIS_PORT

const client = redis.createClient({
  port: redis_port,
  host: redis_host
})
const scanner = new redisScan(client)
client.auth(redis_auth, (err, response) => {
  if (err) {
    throw err
  }
})
client.on("error", err => {
  console.log("redis error =>" + err)
})

module.exports = {
  caching: (key, data) => {
    client.set(key, JSON.stringify(data))
  },
  delCache: key => {
    scanner.scan(key, (err, matchingKeys) => {
      if (err) throw err
      if (matchingKeys === undefined || matchingKeys.length == 0) {
        console.log("No Matching key")
        return
      }
      console.log("delete key", matchingKeys)
      client.del(matchingKeys)
    })
  },
  client
}
