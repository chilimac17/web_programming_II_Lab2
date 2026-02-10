// This file should set up the express server as shown in the lecture code

import express from 'express';
import { client } from './data/pokemon_doc.js';
import configRoutes from './routes/index.js';

const port_number = 3000;
const app = express();




client.on('connect', () => {
  console.log("Connected to Redis!")
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

configRoutes(app);

app.listen(port_number, async () => {
  await client.connect();
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:'+ port_number);
});