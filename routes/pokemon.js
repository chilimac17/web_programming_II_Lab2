//import express, express router as shown in lecture code
import { Router } from "express";
import poke_doc from "../data/pokemon_doc.js";
import * as helper from "../helpers.js";

const router = Router();

router.route("/pokemon/:id").get(async (req, res) => {
  //code here for GET
  try {
    //helper.errorCheckID(req.params.id);
    const pokemon = await poke_doc.getPokemonData(req.params.id);

    if (!pokemon) {
      return res.status(404).json({ error: "Not Found" });
    }

    await helper.addPokemonSummaryToCache(pokemon.id, pokemon, "pokemon");

    return res.json({
      source: req.wrapperData.source,
      endpoint: req.wrapperData.endpoint,
      cache: {
        hit: req.wrapperData.cache.hit,
        key: req.wrapperData.cache.key,
      },
      fetchedAt: req.wrapperData.fetchedAt,
      data: pokemon,
    });
  } catch (e) {
    return res.status(404).json({ error: e.message });
  }
});

router.route("/history").get(async (req, res) => {});

router.route("/abilities/:id").get(async (req, res) => {
  //code here for GET
  try {
    const pokemon = await poke_doc.getPokemonAbilitiesData(req.params.id);

    await helper.addPokemonSummaryToCache(pokemon.id, pokemon, "ability");

    return res.json({
      source: req.wrapperData.source,
      endpoint: req.wrapperData.endpoint,
      cache: {
        hit: req.wrapperData.cache.hit,
        key: req.wrapperData.cache.key,
      },
      fetchedAt: req.wrapperData.fetchedAt,
      data: pokemon,
    });
  } catch (e) {
    return res.status(404).json({ error: e.message });
  }
});

router.route("/moves/:id").get(async (req, res) => {
  try {
    const pokemon = await poke_doc.getPokemonMovesData(req.params.id);
    await helper.addPokemonSummaryToCache(pokemon.id, pokemon, "move");

    return res.json({
      source: req.wrapperData.source,
      endpoint: req.wrapperData.endpoint,
      cache: {
        hit: req.wrapperData.cache.hit,
        key: req.wrapperData.cache.key,
      },
      fetchedAt: req.wrapperData.fetchedAt,
      data: pokemon,
    });
  } catch (e) {
    return res.status(404).json({ error: e.message });
  }
});

export default router;