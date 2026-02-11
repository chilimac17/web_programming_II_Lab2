// You can add and export any helper functions you want here - if you aren't using any, then you can just leave this file as is

import { client } from './data/pokemon_doc.js';


const POKEMON_API_URL = "https://pokeapi.co/api/v2/pokemon/";
const POKEMON_ABILITIES_API_URL = "https://pokeapi.co/api/v2/ability/";
const POKEMON_MOVES_API_URL = "https://pokeapi.co/api/v2/move/";

export let errorCheckID = (p_id) => {
  if (!p_id) throw new Error("ERROR: String Must Be Provided").status(400);

  if (typeof p_id !== "string")
    throw new Error("ERROR: Value Must Be A String").status(400);

  if (p_id.trim().length === 0)
    throw new Error("ERROR: No Empty String or Only Spaces").status(400);

  return p_id;
};

export let checkPokemonID = async (p_id,p_redis_key) => {
  let result = false;
  console.log("client.exists(`${p_redis_key}:${p_id}`" + await client.exists(`${p_redis_key}:${p_id}`));

  if(await client.exists(`${p_redis_key}:${p_id}`) !== 0)
  {
      result = true;
  }

  return result;
};


export let getPokemonCache = async (p_id,p_redis_key ) => {
  let result = undefined;

  console.log("getPokemonCache called with id: " + p_id + " and redis key: " + p_redis_key);

  if (await checkPokemonID(p_id, p_redis_key)) {
      const data = await client.get(`${p_redis_key}:${p_id}`);
      if (data) {
          result = JSON.parse(data);
      }
      console.log("getPokemonCache result: ", result);
  }

  return result;
};




export let createWrapper = (p_endpoint, p_id) => {
  

      /**
       * TODO 
       * set header data 
       * 
       * source: "pokeapi",
      endpoint: `${POKEMON_API_URL}${p_id}`,
      cache: {
        hit: false,
        key: `pokemon:${p_id}`,
      },
      fetchedAt: new Date().toISOString(), //use date class later 
       * 
       * 
       */

      let poke_endpoint = undefined;

      if(p_endpoint.startsWith("/api/pokemon/"))
        {
          poke_endpoint = `${POKEMON_API_URL}${p_id}`;
        }
      else if(p_endpoint.startsWith("/api/abilities/"))
        {
          poke_endpoint = `${POKEMON_ABILITIES_API_URL}${p_id}`;
        }
      else if(p_endpoint.startsWith("/api/moves/"))
        {
          poke_endpoint = `${POKEMON_MOVES_API_URL}${p_id}`;
        }


        
      let wrapperData = {
        'source': "pokeapi",
        'endpoint': poke_endpoint,
        'cache': {
          'hit': false,
          'key': `pokemon:${p_id}`
        },
        'fetchedAt': new Date().toISOString(),
        'data': null
      };

      return wrapperData;


};


export let addPokemonSummaryToCache = async (p_id, p_summary, p_redis_key) => {

  console.log("addPokemonSummaryToCache called with id: " + p_id + " and summary: ", p_summary + " and redis key: " + p_redis_key);

  const key = `${p_redis_key}:${p_id}`;
  const history_entry = `${p_id}:${Date.now()}`;

    if(p_redis_key === "pokemon")
      {
await client
            .multi()
            //.set(key, flatten(pokemonSummary, { safe: true }))
            .set(key, JSON.stringify(p_summary), { safe: true })
            .lPush("recentlyViewed", history_entry)
            .exec();
      }
      else if(p_redis_key === "ability")
        {
          await client
            .set(key, JSON.stringify(p_summary), { safe: true });
        }
      else if(p_redis_key === "move")
        {
          await client
            .set(key, JSON.stringify(p_summary), { safe: true });
        }

};
/*
export let errorCheckUsername = (p_username) => {
  if (typeof p_username !== "string")
    throw new Error("ERROR: Username must be a string");

  p_username = p_username.trim().toLowerCase(); // case-insensitive
  if (p_username.length < 5)
    throw new Error("ERROR: Username must be at least 5 characters long");

  if (!/^[A-Za-z0-9]+$/.test(p_username))
    throw new Error(
      "ERROR: Username may only contain letters and numbers (no spaces or special characters)",
    );

  // cannot be only numbers
  if (/^\d+$/.test(p_username))
    throw new Error("ERROR: Username cannot consist of only numbers");

  return p_username;
};

export let errorCheckPassword = (p_password) => {
  if (typeof p_password !== "string")
    throw new Error("ERROR: Password must be a string");

  if (/\s/.test(p_password))
    throw new Error("ERROR: Password may not contain spaces");

  if (p_password.length < 8)
    throw new Error("ERROR: Password must be at least 8 characters long");

  if (
    !/[a-z]/.test(p_password) ||
    !/[A-Z]/.test(p_password) ||
    !/[0-9]/.test(p_password) ||
    !/[^A-Za-z0-9]/.test(p_password)
  )
    throw new Error(
      "ERROR: Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character",
    );

  return p_password;
};

export let errorCheckFirstName = (p_firstName) => {
  if (typeof p_firstName !== "string")
    throw new Error("ERROR: First name must be a string");

  p_firstName = p_firstName.trim();

  if (p_firstName.length < 2 || p_firstName.length > 25)
    throw new Error("ERROR: First name must be between 2 and 25 characters");

  if (!/^[A-Za-z]+$/.test(p_firstName))
    throw new Error(
      "ERROR: First name may only contain letters A-Z or a-z and no spaces",
    );

  return p_firstName;
};

export const errorCheckLastName = (p_lastname) => {
  if (typeof p_lastname !== "string")
    throw new Error("ERROR: Last name must be a string");

  p_lastname = p_lastname.trim();

  if (p_lastname.length < 2 || p_lastname.length > 25)
    throw new Error("ERROR: Last name must be between 2 and 25 characters");

  // letters + hyphen + apostrophe + period
  if (!/^[A-Za-z.'-]+$/.test(p_lastname))
    throw new Error(
      "ERROR: Last name may only contain letters, hyphens, apostrophes, or periods",
    );

  return p_lastname;
};

export const errorCheckTitle = (p_title) => {
  if (typeof p_title !== "string")
    throw new Error("ERROR: Title must be a string");

  p_title = p_title.trim();

  if (p_title.length < 10 || p_title.length > 255)
    throw new Error("ERROR: Title must be between 10 and 255 characters");

  return p_title;
};

export const errorCheckBody = (p_body) => {
  if (typeof p_body !== "string")
    throw new Error("ERROR: Body must be a string");

  p_body = p_body.trim();

  if (p_body.length < 25)
    throw new Error("ERROR: Body must be at least 25 characters long");

  return p_body;
};

export const errorCheckPostedBy = (p_postedBy) => {
  if (typeof p_postedBy !== "object" || p_postedBy === null) {
    throw new Error("ERROR: postedBy must be an object");
  }

  const { _id, username, name } = p_postedBy;

  if (!_id) {
    throw new Error("ERROR: postedBy must include a valid _id");
  }

  if (typeof username !== "string" || username.trim().length === 0) {
    throw new Error("ERROR: postedBy.username must be a non-empty string");
  }

  if (typeof name !== "string" || name.trim().length === 0) {
    throw new Error("ERROR: postedBy.name must be a non-empty string");
  }
};

export const errorCheckTag = (p_tag) => {
  if (typeof p_tag !== "string")
    throw new Error("ERROR: Each tag must be a string");

  p_tag = p_tag.trim();

  if (p_tag.length === 0)
    throw new Error("ERROR: Tags cannot be empty or just spaces");

  if (!/^[A-Za-z]+$/.test(p_tag))
    throw new Error("ERROR: Tags may only contain letters A-Z or a-z");

  return p_tag.toLowerCase();
};

export const errorCheckTags = (p_tags) => {
  if (p_tags !== undefined) {
    if (!Array.isArray(p_tags)) throw new Error("ERROR: Tags must be an array");

    for (let tag of p_tags) {
      this.errorCheckTag(tag);
    }
  }
};

export const errorCheckComment = (p_comment) => {
  if (typeof p_comment !== "string")
    throw new Error("ERROR: Each comment must be a string");

  p_comment = p_comment.trim();

  if (p_comment.length === 0)
    throw new Error("ERROR: Comments cannot be empty or just spaces");

  return p_comment;
};

export const errorCheckComments = (p_comments) => {
  if (!Array.isArray(p_comments))
    throw new Error("ERROR: Comments must be an array");

  for (let comment of p_comments) {
    this.errorCheckComment(comment);
  }
};

export const getCurrentDate = () => {
  const now = new Date();

  // Format components
  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(now.getUTCDate()).padStart(2, "0");

  // Combine into the desired format
  return `${month}/${day}/${year}`;
};
*/