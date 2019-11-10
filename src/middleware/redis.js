require("dotenv").config()
const redis = require("redis")
const redis_port = process.env.REDIS_PORT || 6739
const redis_host = process.env.REDIS_HOST || "127.0.0.1"

const client = redis.createClient(redis_port, iredis_host)

module.exports = {
  getCached: (req, res, next) => {
    const { redis_key } = req.headers
    client.get(redis_key, function(err, reply) {
      if (err) {
        res.status(500).json({
          message: "Somethin Went Wrong"
        })
      }
      if (reply == null) {
        next()
      } else {
        res.status(200).json({
          message: `Success Read ${redis_key}`,
          data: JSON.parse(reply)
        })
      }
    })
  },
  caching: (key, data) => {
    client.set(key, JSON.stringify(data))
  },
  delCache: key => {
    client.del(key)
  }
}
