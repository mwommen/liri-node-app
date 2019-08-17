require("dotenv").config();
var keys=require("./keys.js");

// var fs = require('fs');
// var Spotify = require('node-spotify-api');
// var moment = require('moment');
// moment().format();
// var spotify = new Spotify(keys.spotify);

var axios = require("axios");
// Store all of the arguments in an array
var nodeArgs = process.argv;
//variable to input movie title 
var movieName = "";

// And do a little for-loop  to handle the inclusion of "+"s
for (var i = 2; i < nodeArgs.length; i++) {

  if (i > 2 && i < nodeArgs.length) {
    movieName = movieName + "+" + nodeArgs[i];
  } else {
    movieName += nodeArgs[i];
  }
}

var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

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
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
  });


 
       
























// // var spotify = new spotify(keys.spotify) {
// // this.keys = keys;
// // this.spotify = spotify;
// // }
// var Spotify = require('node-spotify-api');
 
// // OMDB API request to grab 

// var axios = require("axios");
// var nodeArgs = process.argv;
// var movieName = "";

// for (var i = 2; i < nodeArgs.length; i++) {
//   if (i > 2 && i < nodeArgs.length) {
//     movieName = movieName + "+" + nodeArgs[i];
//   } else {
//     movieName += nodeArgs[i];
//   }
// };

// var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

// axios.get(queryUrl).then(
//   function(response) {
//     console.log("Release Year: " + response.data.Year);
//   })
//   .catch(function(error) {
//     if (error.response) {
//       // The request was made and the server responded with a status code
//       // that falls out of the range of 2xx
//       console.log("---------------Data---------------");
//       console.log(error.response.data);
//     } else if (error.request) {
//       // The request was made but no response was received
//       // `error.request` is an object that comes back with details pertaining to the error that occurred.
//       console.log(error.request);
//     } else {
//       // Something happened in setting up the request that triggered an Error
//       console.log("Error", error.message);
//     }
//     console.log(error.config);
//   });

