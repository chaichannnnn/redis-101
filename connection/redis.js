require("dotenv").config();
const redis = require("redis");

const redisUrl = process.env.REDIS_URL;

const redisClient = redis.createClient({
  url: redisUrl,
});
redisClient.on("error", (err) => console.error("Redis Client Error", err));
redisClient
  .connect()
  .then((res) => {
    console.log("Connect Redis Success.");
  })
  .catch((err) => {
    console.error(err);
  });

  module.exports = redisClient;