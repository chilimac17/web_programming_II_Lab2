//import express, express router as shown in lecture code
import { Router } from "express";
import poke_doc from "../data/pokemon_doc.js";
import * as helper from "../helpers.js";

const router = Router();
const POKEMON_API_URL = "https://pokeapi.co/api/v2/pokemon/";
const POKEMON_ABILITIES_API_URL = "https://pokeapi.co/api/v2/ability/";
const POKEMON_MOVES_API_URL = "https://pokeapi.co/api/v2/move/";


router.route("/").get(async (req, res) => {
  console.log("route: / (GET) ");
  res.json({message: "Welcome to the Pokemon API!"});
});

router
  .route("/api/pokemon/:id")
  .get(async (req, res) => {
    //code here for GET
    console.log("route: /api/pokemon/:id (GET) ID = " + req.params.id);
    /**
     * TODO
     * 
     *  Check if the Pokémon has a cache entry in Redis (The middleware actually checks this, before going on to this route) . If so, render the result from that cache entry
     *  If not, query the data from the PokéAPI for the Pokémon and fail the request if it is not found, or send JSON and cache the result if it is found.
     * 
     * 
     *  Expected Output:
     * *  {{
     * * "id": 25,
     * * "name": "pikachu",
     * * "height": 4,
     * * "weight": 60,
     * * "types": ["electric"],
     * * "abilities": ["lightning-rod", "static"],
     * * "baseStats": {
     * * "hp": 35,
     * * "attack": 55,
     * * "defense": 40,
     * * "special-attack": 50,
     * * "special-defense": 50,
     * * "speed": 90
     * *  }}
     */


    //req.params.id = helper.errorCheckID(req.params.id);


    
    //ELSE CASE
    try {
    const pokemon = await poke_doc.getPokemonData(req.params.id);

      //add the header 


    res.json(pokemon);
  } catch (e) {
    res.status(404).json({ error: e.message });
  }

  });

router
.route("/api/pokemon/history")
.get(async (req, res) => {
  
});


router
.route("/api/abilities/:id")
.get(async (req, res) => {
  
});


router
.route("/api/moves/:id")
.get(async (req, res) => {
  
});

export default router;
