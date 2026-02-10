// This file will import both route files and export the constructor method as shown in the lecture code

/*
    - When the route is /teams use the routes defined in the teams.js routing file
    - When the route is /games use the routes defined in games.js routing file
    - All other enpoints should respond with a 404 as shown in the lecture code
*/
import pokeRoutes from './pokemon.js';


const constructorMethod = (app) => {
  app.use("/", pokeRoutes);


  app.use('*', (req, res) => {
    res.status(404).json({error: 'Route Not found'});
  });
};

export default constructorMethod;