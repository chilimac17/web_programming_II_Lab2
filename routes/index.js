// This file will import both route files and export the constructor method as shown in the lecture code

/*
    - When the route is /teams use the routes defined in the teams.js routing file
    - When the route is /games use the routes defined in games.js routing file
    - All other enpoints should respond with a 404 as shown in the lecture code
*/
import pokeRoutes from './pokemon.js';
import * as helper from "../helpers.js";

const constructorMethod = (app) => {
  
  
 // helper.checkPokemonID(req.params.id)
    app.use(async (req, res, next) => {
      console.log('Index.js METHOD:', req.method);
      console.log('Index.js PATH:  ', req.path);
      console.log('Index.js URL:', req.originalUrl);


      if (req.path.startsWith("/api/pokemon/")) {
        try {
          //req.params.id = helper.errorCheckID(req.params.id);
          const id = req.path.split('/').pop();

          let wrapperData = helper.createWrapper(req.originalUrl, id);
          req.wrapperData = wrapperData;

          console.log("CHECKING CACHE FOR ID: " + id);
          console.log("WRAPPER DATA: ", wrapperData);
          console.log("WRAPPER DATA2: ", req.wrapperData);
          if(await helper.checkPokemonID(id) == true)
            {
              //grab cache data and set header data accordingly
              wrapperData.cache.hit = true;

                const cacheData = await helper.getPokemonSummary(id);

                //TODO UPDATE POKEMON HISTORY

               // res.set('X-Data-Source', 'Cache');
               wrapperData.data = cacheData;   
               console.log("CURRENT WRAPPER DATA: ", wrapperData);
               return res.json(wrapperData);
            }
            else
              {
                //set header data accordingly for cache miss
                // go to route
                console.log("CACHE MISS FOR ID: " + id);
                return next();

              }

        }
        catch (e) {
          return res.status(400).json({ error: e.message });
        }

      }
      else if (req.path.startsWith("/api/pokemon/history"))
      {

      }
      else if (req.path.startsWith("/api/abilities/"))
      {
        
      }
      else if (req.path.startsWith("/api/moves/"))
      {

      }
      else
        {
          
        }

        return next();
    });
  
  
  
//app.use("/", pokeRoutes);
        app.use("/api/pokemon", pokeRoutes);

  app.use('*', (req, res) => {
    res.status(404).json({error: 'Route Not found'});
  });
};

export default constructorMethod;