require("dotenv").config();

// Adding modules
const fs = require("fs");
const moment = require('moment')
const keys = require("./keys.js");
const axios = require("axios");
const Spotify = require('node-spotify-api');
const spotify = new Spotify(keys.spotify);

// Argument variables
let platform = process.argv[2];
let content = process.argv[3];

switch(platform){
    case "concert-this":
        concertCommand(content);
}

function concertCommand(content){
    let twoWords = content.split(' ')
    let queryJoin = twoWords.join('+')
    let url = "https://rest.bandsintown.com/artists/" + queryJoin + "/events?app_id=codingbootcamp";
    axios.get(url).then(function (response){
        response.data.forEach(show =>{
            console.log(`Venue: ${show.venue.name}`)
            console.log(`City: ${show.venue.city}`)
            console.log(`Date: ${moment(show.datetime).format('MMMM Do YYYY, h:mm a')}`)
            console.log('---------')
        })
    });
}