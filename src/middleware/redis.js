require("dotenv").config()
const redis = require("redis")
const redisScan = require("node-redis-scan")
const redis_url = process.env.REDIS_URL || "redis://localhost:6379"
const client = redis.createClient(redis_url)
const scanner = new redisScan(client)
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
