// This file will import both route files and export the constructor method as shown in the lecture code

/*
    - When the route is /teams use the routes defined in the teams.js routing file
    - When the route is /games use the routes defined in games.js routing file
    - All other enpoints should respond with a 404 as shown in the lecture code
*/
import pokeRoutes from "./pokemon.js";
import * as helper from "../helpers.js";

const constructorMethod = (app) => {
  app.use(async (req, res, next) => {
    try {
      let id = req.path.split("/").pop();

      let wrapperData = helper.createWrapper(req.originalUrl, id);
      req.wrapperData = wrapperData;

      if (req.path.startsWith("/api/pokemon/")) {
        //id = helper.errorCheckID(id);
        if ((await helper.checkPokemonID(id, "pokemon")) == true) {
          //grab cache data and set header data accordingly
          wrapperData.cache.hit = true;

          const cacheData = await helper.getPokemonCache(id, "pokemon");

          helper.addPokemonHistory(id);

          wrapperData.data = cacheData;
          return res.json(wrapperData);
        } else {
          //set header data accordingly for cache miss
          // go to route
          return next();
        }
      } else if (req.path.startsWith("/api/pokemon/history")) {
        const history_list = helper.getPokemonHistory();
        return res.json(history_list);
      } else if (req.path.startsWith("/api/abilities/")) {
        if ((await helper.checkPokemonID(id, "ability")) == true) {
          //grab cache data and set header data accordingly
          wrapperData.cache.hit = true;

          const cacheData = await helper.getPokemonCache(id, "ability");
          wrapperData.data = cacheData;

          return res.json(wrapperData);
        } else {
          //set header data accordingly for cache miss
          // go to route
          return next();
        }
      } else if (req.path.startsWith("/api/moves/")) {
        if ((await helper.checkPokemonID(id, "move")) == true) {
          //grab cache data and set header data accordingly
          wrapperData.cache.hit = true;

          const cacheData = await helper.getPokemonCache(id, "move");

          // res.set('X-Data-Source', 'Cache');
          wrapperData.data = cacheData;
          return res.json(wrapperData);
        } else {
          //set header data accordingly for cache miss
          // go to route
          return next();
        }
      } else {
      }

      return next();
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
  });

  //app.use("/", pokeRoutes);
  app.use("/api/", pokeRoutes);

  app.use("*", (req, res) => {
    res.status(404).json({ error: "Route Not found" });
  });
};

export default constructorMethod;