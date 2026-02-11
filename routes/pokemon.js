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
  .route("/:id")
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
.route("/api/abilities/:id")
.get(async (req, res) => {
  
});


router
.route("/api/moves/:id")
.get(async (req, res) => {
  
});

export default router;
