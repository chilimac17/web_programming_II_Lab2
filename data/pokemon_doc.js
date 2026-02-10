//import mongo collections, bcrypt and implement the following data functions
import axios from "axios";
import * as helper from "../helpers.js";
import { flatten, unflatten } from "flat";
import { createClient } from "redis";

const POKEMON_API_URL = "https://pokeapi.co/api/v2/pokemon/";
const POKEMON_ABILITIES_API_URL = "https://pokeapi.co/api/v2/ability/";
const POKEMON_MOVES_API_URL = "https://pokeapi.co/api/v2/move/";


export const client = createClient();

const exportedMethods = {

  async getPokemonData(p_id) {

    //ADD TRY CATCH 
    console.log("getPokemonData called with id: " + p_id);
    //p_id = helper.errorCheckID(p_id);
    //testisnumber()
    const { data } = await axios.get(`${POKEMON_API_URL}${p_id}`);

    const pokemonSummary = {
      source: "pokeapi",
      endpoint: `${POKEMON_API_URL}${p_id}`,
      cache: {
        hit: false,
        key: `pokemon:${p_id}`,
      },
      fetchedAt: new Date().toISOString(), //use date class later 
      data: {
        id: data.id,
        name: data.name,
        height: data.height,
        weight: data.weight,
        types: data.types.map((type) => type.type.name).sort(),
        abilities: data.abilities.map((ability) => ability.ability.name).sort(),
        baseStats: data.stats.reduce((stats, stat) => {
          stats[stat.stat.name] = stat.base_stat;
          return stats;
        }, {})
      }
    };



    const key = `pokemon:${data.id}`;
    const history_entry = `${data.id}:${Date.now()}`

    await client
            .multi()
            //.set(key, flatten(pokemonSummary, { safe: true }))
            .set(key, JSON.stringify(pokemonSummary), { safe: true })
            .lPush("recentlyViewed", history_entry)
            .exec();


    return pokemonSummary;
  }

 
};
export default exportedMethods;