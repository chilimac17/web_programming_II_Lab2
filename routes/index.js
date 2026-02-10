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
    app.use((req, res, next) => {
      console.log('METHOD:', req.method);
      console.log('PATH:  ', req.path);
      console.log('URL:', req.originalUrl);


      if (req.path.startsWith("/api/pokemon/")) {
        try {
          req.params.id = helper.errorCheckID(req.params.id);
          if(helper.checkPokemonID(req.params.id))
            {
              //grab cache data and set header data accordingly
            }
            else
              {
                //set header data accordingly for cache miss
                // go to route

                next();

              }

        }
        catch (e) {
          res.status(400).json({ error: e.message });
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

    });
  
  app.use("/api", pokeRoutes);


  app.use('*', (req, res) => {
    res.status(404).json({error: 'Route Not found'});
  });
};

export default constructorMethod;