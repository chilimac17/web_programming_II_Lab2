// This file should set up the express server as shown in the lecture code

import express from "express";
import { client } from "./data/redisCache.js";
import configRoutes from "./routes/index.js";
import * as redisServer from "./data/redisCache.js";

const port_number = 3000;
const app = express();

client.on("connect", () => {
  console.log("Connected to Redis!");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/pokemon/:id", async (req, res, next) => {
  try {
    if(req.params.id == "history") return next();
    const id = redisServer.errorCheckID(req.params.id);
    
    
    const parts = req.originalUrl.split("/");
    const redis_key = parts[2];
    req.redis_key = redis_key;

    let wrapperData = redisServer.createWrapper(req.originalUrl, id, redis_key);
    req.wrapperData = wrapperData;
    if ((await redisServer.checkPokemonID(id, "pokemon")) == true) {
      //grab cache data and set header data accordingly
      wrapperData.cache.hit = true;
      await client.incr("stats:pokemon:hits");
      const cacheData = await redisServer.getPokemonCache(id, "pokemon");

      redisServer.addPokemonHistory(id);

      wrapperData.data = cacheData;
      return res.json(wrapperData);
    } else {
      //set header data accordingly for cache miss
      // go to route
      return next();
    }
  } catch (error) {
    console.log(error);
  }
});

app.use("/api/abilities/:id", async (req, res, next) => {
   const parts = req.originalUrl.split("/");
    const redis_key = parts[2];
    req.redis_key = redis_key;
  let wrapperData = redisServer.createWrapper(req.originalUrl, req.params.id, redis_key);
  req.wrapperData = wrapperData;
  if ((await redisServer.checkPokemonID(req.params.id, "ability")) == true) {
    //grab cache data and set header data accordingly
    wrapperData.cache.hit = true;
    await client.incr("stats:ability:hits");
    const cacheData = await redisServer.getPokemonCache(req.params.id, "ability");
    wrapperData.data = cacheData;

    return res.json(wrapperData);
  } else {
    //set header data accordingly for cache miss
    // go to route
    return next();
  }
});

app.use("/api/moves/:id", async (req, res, next) => {
const parts = req.originalUrl.split("/");
    const redis_key = parts[2];
    req.redis_key = redis_key;
  let wrapperData = redisServer.createWrapper(req.originalUrl, req.params.id, redis_key);
  req.wrapperData = wrapperData;
  if ((await redisServer.checkPokemonID(req.params.id, "move")) == true) {
    //grab cache data and set header data accordingly
    wrapperData.cache.hit = true;
    await client.incr("stats:moves:hits");
    const cacheData = await redisServer.getPokemonCache(req.params.id, "move");

    // res.set('X-Data-Source', 'Cache');
    wrapperData.data = cacheData;
    return res.json(wrapperData);
  } else {
    //set header data accordingly for cache miss
    // go to route
    return next();
  }
});

configRoutes(app);

app.listen(port_number, async () => {
  await client.connect();
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:" + port_number);
});
