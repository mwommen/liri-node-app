require("dotenv").config();
var keys=require("./keys.js");
var Spotify = require('node-spotify-api');

 var fs = require('fs');
var moment = require('moment');
moment().format();

var axios = require("axios");
// Store all of the arguments in an array
var nodeArgs = process.argv;
//variable to input movie title 
var movieName = "";
var command = process.argv[2];
let value = process.argv[3];
commandHandler(command, value);


//for-loop  to handle the inclusion of "+"s
for (var i = 2; i < nodeArgs.length; i++) {

  if (i > 2 && i < nodeArgs.length) {
    movieName = movieName + "+" + nodeArgs[i];
  } else {
    movieName += nodeArgs[i];
  }
}

function movieThis(value) {
let queryUrl = "http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=trilogy";

axios.get(queryUrl).then(
  function(response) {
      var movieInfo = 
      "----------------------" +
      //grab the release year 
    "\nRelease Year: " + response.data.Year +

    // grab the title 
    "\nMovie Title: " + response.data.Title +
    // grab IMDB rating 
    "\nIMDB Rating: " + response.data.imdbRating +
    // grab  Rotten Tomatoes rating

    // grab country produced 
    "\nCountry Produced: " + response.data.Country +
    // grab language 
"\nMovie Language: " + response.data.Language +
    // grab plot 
"\nPlot: " + response.data.Plot +
    // grab Actors 
    "\nActors: " + response.data.Actors;
    console.log(movieInfo)
  })

  //log an error if request is unsuccesful 
  .catch(function(error) {
    if (error.response) {
      console.log("---------------Data---------------");
      console.log(error.response.data);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log("Error", error.message);
    }
    console.log(error.config);
  });
}

//Use axios to grab data from bands in town
function concertThis(value) {
    axios.get("https://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp")
    .then(function(response) {  
        for (var i = 0; i < response.data.length; i++) {

            var datetime = response.data[i].datetime; //Saves datetime response into a variable
            var dateArr = datetime.split('T'); //Attempting to split the date and time in the response
console.log("HELLO" , )
            var concertResults = 
            
                "--------------------------------------------------------------------" +
                    "\nVenue Name: " + response.data[i].venue.name + 
                    
                    "\nVenue Location: " + response.data[i].venue.city +
                    "\nDate of the Event: " + moment(dateArr[0]).format("MM-DD-YYYY"); //dateArr[0] should be the date separated from the time
            console.log(concertResults);
        }
    })
    .catch(function (error) {
        console.log(error);
    });
}

function spotifySong(value) {
    if(!value){
        value = "The Sign";
    }
    var spotify = new Spotify(keys);

    spotify.search({ type: 'track', query: value })
    .then(function(response) {
        for (var i = 0; i < 5; i++) {
            var spotifyResults = 
                "--------------------------------------------------------------------" +
                    "\nArtist(s): " + response.tracks.items[i].artists[0].name + 
                    "\nSong Name: " + response.tracks.items[i].name +
                    "\nAlbum Name: " + response.tracks.items[i].album.name +
                    "\nPreview Link: " + response.tracks.items[i].preview_url;
                    
            console.log(spotifyResults);
        }
    })
}
function doThis(){
    //Read from soem file
    fs.readFile('random.txt', 'utf8',function(err, data) {
        if (err) throw err;
        console.log(data);
        //Parse returned data so we have a command and a value
        var split = data.split(',');
        var command = split[0];
        var value = split[1];
        //invoke commandHandler with correct args
        commandHandler(command, value)
    });
}

 function commandHandler(command, value) {


// commands for specifying what API to grab data from 
switch (command) {
    case "concert-this":
        concertThis(value);
        break;
     case "spotify-this-song":
        spotifySong(value);
         break;
    case "movie-this":
        movieThis(value);
        break;
     case "do-what-it-says":
         doThis(value);
         break;

};

}

