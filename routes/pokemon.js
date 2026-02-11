//import express, express router as shown in lecture code
import { Router } from "express";
import poke_doc from "../data/pokemon_doc.js";
import * as helper from "../helpers.js";

const router = Router();



router.route("/").get(async (req, res) => {
  console.log("route: / (GET) ");
  return res.json({message: "Welcome to the Pokemon API!"});
});

router
  .route("/pokemon/:id")
  .get(async (req, res) => {
    //code here for GET
    console.log("route: /api/pokemon/:id (GET) ID = " + req.params.id);
    
    try {
    const pokemon = await poke_doc.getPokemonData(req.params.id);
    
    console.log("POKEMON DATA: ", pokemon);
    //req.params.id not working 
    await helper.addPokemonSummaryToCache(pokemon.id, pokemon);
    
      let result = {
        'source': req.wrapperData.source,
        'endpoint': req.wrapperData.endpoint,
        'cache': {
          'hit': req.wrapperData.cache.hit,
          'key': req.wrapperData.cache.key
        },
        'fetchedAt': req.wrapperData.fetchedAt,
        'data': pokemon
      };

      console.log("RESULT: ", result);

    return res.json({ result });
  } catch (e) {
    return res.status(404).json({ error: e.message });
  }

  });

router
.route("/history")
.get(async (req, res) => {
  
});


router
.route("/abilities/:id")
.get(async (req, res) => {
   //code here for GET
    console.log("route: /api/abilities/:id (GET) ID = " + req.params.id);
    
    try {
    const pokemon = await poke_doc.getPokemonAbilitiesData(req.params.id);
    
    console.log("POKEMON DATA2: ", pokemon);
    //req.params.id not working 
    await helper.addPokemonSummaryToCache(pokemon.id, pokemon, "ability");
    
      let result = {
        'source': req.wrapperData.source,
        'endpoint': req.wrapperData.endpoint,
        'cache': {
          'hit': req.wrapperData.cache.hit,
          'key': req.wrapperData.cache.key
        },
        'fetchedAt': req.wrapperData.fetchedAt,
        'data': pokemon
      };

      console.log("RESULT2: ", result);

    return res.json({ result });
  } catch (e) {
    return res.status(404).json({ error: e.message });
  }
});


router
.route("/moves/:id")
.get(async (req, res) => {
   console.log("route: /api/moves/:id (GET) ID = " + req.params.id);
    
    try {
    const pokemon = await poke_doc.getPokemonMovesData(req.params.id);
    
    console.log("POKEMON DATA3: ", pokemon);
    //req.params.id not working 
    await helper.addPokemonSummaryToCache(pokemon.id, pokemon, "move");
    
      let result = {
        'source': req.wrapperData.source,
        'endpoint': req.wrapperData.endpoint,
        'cache': {
          'hit': req.wrapperData.cache.hit,
          'key': req.wrapperData.cache.key
        },
        'fetchedAt': req.wrapperData.fetchedAt,
        'data': pokemon
      };

      console.log("RESULT3: ", result);

    return res.json({ result });
  } catch (e) {
    return res.status(404).json({ error: e.message });
  }
});

export default router;
