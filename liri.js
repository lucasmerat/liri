require("dotenv").config();

// Adding modules
const fs = require("fs");
const moment = require("moment");
const keys = require("./keys.js");
const axios = require("axios");
const Spotify = require("node-spotify-api");
const spotify = new Spotify(keys.spotify);

// Argument variables
let platform = process.argv[2];
let content = process.argv[3];

switch (platform) {
  case "concert-this":
    concertCommand(content);
    break;
  case "spotify-this-song":
    spotifyCommand(content);
    break;
  case "movie-this":
    omdbCommand(content);
    break;
  case "do-what-it-says":
    doWhatCommand(content);
    break;

  default:
    console.log("Please enter a valid command");
}

//Searches Bands In Town for the specified artist in second node argument. If blank, defaults to rhye
function concertCommand(content = "rhye") {
  let twoWords = content.split(" ");
  let queryJoin = twoWords.join("+");
  let url =
    "https://rest.bandsintown.com/artists/" +
    queryJoin +
    "/events?app_id=codingbootcamp";
  axios.get(url).then(function(response) {
    console.log(
      `Below are upcoming concert results for ${response.data[0].lineup[0]}`
    );
    console.log("           ");
    console.log("|||||||||||");
    console.log("|||||||||||");
    console.log("|||||||||||");
    console.log("|||||||||||");
    console.log("|||||||||||");
    console.log("VVVVVVVVVVV");
    console.log("           ");
    response.data.forEach(show => {
      console.log(`Venue: ${show.venue.name}`);
      console.log(`City: ${show.venue.city}`);
      console.log(
        `Date: ${moment(show.datetime).format("MMMM Do YYYY, h:mm a")}`
      );
      console.log("---------");
    });
  });
}

function spotifyCommand() {}

function omdbCommand() {}

function doWhatCommand() {}

