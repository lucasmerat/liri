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
let content = process.argv.splice(3)
let command = content.join("+")

if(platform === "do-what-it-says"){
  doWhatCommand(platform);
} else{
  runSwitch(platform, command);
}

function runSwitch(platform,command){
switch (platform) {
  case "concert-this":
    concertCommand(command);
    break;
  case "spotify-this-song":
    spotifyCommand(command);
    break;
  case "movie-this":
    omdbCommand(command);
    break;

  default:
    console.log("Please enter a valid command");
  }
}

//Searches Bands In Town for the specified artist in second node argument. If blank, defaults to rhye
function concertCommand(command = "rhye") {
  let i = 0;
  let url =
    `https://rest.bandsintown.com/artists/${command}/events?app_id=codingbootcamp`;
  axios.get(url).then(function(response) {
    console.log("\x1b[36m", "\x1b[47m")
    console.log(command)
    if (!response.data[0]){
      return console.log("No upcoming concerts found")
    }
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
      i++;
      console.log(`Concert # ${i}`);
      console.log(`Venue: ${show.venue.name}`);
      console.log(`City: ${show.venue.city}`);
      console.log(
        `Date: ${moment(show.datetime).format("MMMM Do YYYY, h:mm a")}`
      );
      console.log("---------");
    });
  });
}

function spotifyCommand(command = "The+Sign") {
  spotify.search({type:"track", query: command}, function(err,data){
    if (err){
      console.log(err)
    }
    let artist = data.tracks.items[0].album.artists[0].name;
    let songName = data.tracks.items[0].name;
    let preview = data.tracks.items[0].preview_url;
    let album = data.tracks.items[0].album.name;
    console.log("\x1b[32m", "\x1b[40m")
    console.log("♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫  Spotify Search Results Below!  ♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫")
    console.log("♫")
    console.log(`♫ Your song is called: ${songName}`);
    console.log(`♫ It's by the artist: ${artist}`);
    console.log(`♫ And off the album: ${album}`)
    if(!preview){
      console.log("♫ Unfortunatley, no preview of the song is available")
    } else{
      console.log("♫ Check out a preview of the track below ||");
      console.log("♫                                        VV");
      console.log(`♫ ${preview}`);
    };
    console.log("♫")
    console.log("♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫")

  })
}

function omdbCommand(command = 'mr+nobody') {
  let url = `http://www.omdbapi.com/?apikey=da38a2f6&t=${command}`
  axios.get(url).then(function(response){
    console.log("\x1b[30m","\x1b[43m")
    if(!response.data.Title){
      console.log("No movie with that name found - try again")
    } else{
    let title = response.data.Title;
    let year = response.data.Year;
    let imdb = response.data.Ratings[0].Value;
    let tomatoes = response.data.Ratings[1].Value;
    let country = response.data.Country;
    let language = response.data.Language;
    let plot = response.data.Plot;
    let cast = response.data.Actors;
    console.log(`🎬     🎬     🎬     🎬     🎬     🎬     🎬     🎬     🎬     🎬  IMDB MOVIE RESULTS BELOW!    🎬     🎬     🎬     🎬     🎬     🎬     🎬     🎬     🎬     🎬     🎬     
                                                             |     |      |      |
                                                             |     |      |      |
                                                             V     V      V      V
🎬  The movie you're searching for is called ${title} - it was released in ${language} in ${country} in the year ${year}. 

🎬  It recieved a ${imdb} on IMDB and ${tomatoes} on rotten tomatoes.

🎬  The cast includes ${cast}

🎬  A breif plot summary: 

🎬  ${plot}
`)
    }
  })
}

function doWhatCommand(platform) {
  fs.readFile("random.txt","utf8",function(err,data){
    if (err){
      console.log(err)
    }
    let commandContent = data.split(",");
    platform = commandContent[0]
    let regEx = /\s/g
    command = commandContent[1].replace(regEx, '+')
    console.log(platform)
    console.log(command)
    runSwitch(platform,command);
  })
}