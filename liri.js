require("dotenv").config();

// Adding modules
const fs = require("fs");
const moment = require('moment')
const keys = require("./keys.js");
var axios = require("axios");
const Spotify = require('node-spotify-api');
const spotify = new Spotify(keys.spotify);

console.log(moment())