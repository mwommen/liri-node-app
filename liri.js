require("dotenv").config();
var keys=require("./keys.js");

// var fs = require('fs');
var moment = require('moment');
moment().format();

var axios = require("axios");
// Store all of the arguments in an array
var nodeArgs = process.argv;
//variable to input movie title 
var movieName = "";
var command = process.argv[2];
let value = process.argv[3];



//for-loop  to handle the inclusion of "+"s
for (var i = 2; i < nodeArgs.length; i++) {

  if (i > 2 && i < nodeArgs.length) {
    movieName = movieName + "+" + nodeArgs[i];
  } else {
    movieName += nodeArgs[i];
  }
}
function movieThis(value) {
let queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

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
}


// Using Spotify API to retreive 
//   var Spotify = require('node-spotify-api');
//  var Spotify = new Spotify(keys.spotify);

//   process.env.SPOTIFY_ID





// BandsInTown API to grab band info 

// let bandURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
// axios.get(bandUrl).then(
//   function(response) {
//       var bandInfo = 
//       "---------------" +
//       //Grab Name of Venue
//       "\nRelease Year: " + response.data.Venue +
//       //Grab the Venue location
//       "\nRelease Year: " + response.data.Location +
//       //Grab date of event
//       "\nRelease Year: " + response.data.Date;
//   });

function concertThis(value) {
    console.log("This is being called")
    axios.get("https://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp")
    .then(function(response) {  
        for (var i = 0; i < response.data.length; i++) {

            var datetime = response.data[i].datetime; //Saves datetime response into a variable
            var dateArr = datetime.split('T'); //Attempting to split the date and time in the response
console.log("HELLO" , dateArr)
            var concertResults = 
            
                "--------------------------------------------------------------------" +
                    "\nVenue Name: " + response.data[i].venue.name + 
                    
                    "\nVenue Location: " + response.data[i].venue.city +
                    "\nDate of the Event: " + moment(dateArr[0], "MM-DD-YYYY"); //dateArr[0] should be the date separated from the time
            console.log(concertResults);
        }
    })
    .catch(function (error) {
        console.log(error);
    });
        

}


switch (command) {
    case "concert-this":
        concertThis(value);
        break;
    // case "spotify-this-song":
    //     spotifySong(value);
    //     break;
    case "movie-this":
        movieThis(value);
        break;
    // case "do-what-it-says":
    //     doThis(value);
    //     break;

};