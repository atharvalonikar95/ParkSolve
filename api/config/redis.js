// import dotenv from "dotenv";
// dotenv.config();
import { createClient } from "redis";

const redisClient = createClient({
  url: process.env.REDIS_URL
});

redisClient.on("error", (err) => {
  console.log("Redis Error:", err.message);
});

try {
  await redisClient.connect();
  console.log("Redis Connected");
} catch (error) {
  console.log("Redis Not Running");
}

export default redisClient;