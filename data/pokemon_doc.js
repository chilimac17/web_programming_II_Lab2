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

    //console.log("getPokemonData data: " + data);

    const pokemonSummary = {
     
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
      
    };

    console.log("getPokemonData summary: ", pokemonSummary);
    return pokemonSummary;
  },
  async getPokemonAbilitiesData(p_id) {

    //ADD TRY CATCH 
    console.log("getPokemonAbilitiesData called with id: " + p_id);
    //p_id = helper.errorCheckID(p_id);
    //testisnumber()
    const { data } = await axios.get(`${POKEMON_ABILITIES_API_URL}${p_id}`);

    let english_entry = data.effect_entries.find((entry) => entry.language.name === "en");

    const pokemonSummary = {
     
        id: data.id,
        name: data.name,
        generation: data.generation,
        effect: english_entry.effect,
        shortEffect: english_entry.short_effect
    };

    return pokemonSummary;
  },
  async getPokemonMovesData(p_id) {

    //ADD TRY CATCH 
    console.log("getPokemonMovesData called with id: " + p_id);
    //p_id = helper.errorCheckID(p_id);
    //testisnumber()
    const { data } = await axios.get(`${POKEMON_MOVES_API_URL}${p_id}`);

    const pokemonSummary = {
     
        id: data.id,
        name: data.name,
        generation: data.generation,
        effect: english_entry.effect,
        shortEffect: english_entry.short_effect
    };

    return pokemonSummary;
  }

 
};
export default exportedMethods;