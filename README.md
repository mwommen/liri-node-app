# liri-node-app
LIRI will search Spotify for songs, Bands in Town for concerts, and OMDB for movies.
LIRI will have the ability to search the Spotify API for a song the user searches for. Using the API it will return the name of the artist, the songs name, a preview link to the song in spotify and the album the song is a part of. 

Next, using the bands in town API, a user will input an artist and the out put will provide the venue location, the date of the concert, and the time using moment. 

Then using the OMDB API, a user will input a movie, using "+" in place of spaces and the output will provide the release year, title,IMDB rating, country produced, language, plot and cast. 

Finally, using FS to read the random.txt file, typing in "node liri.js do-what-it-says" will literally execute what the file says inside. In this case, the file says spotify-this-song Dont let me down. This will return the name of the song, artist, album and a URL to a preview of the song. You can change the text in random.txt to perform a different execution. 


Using axios, Spotify API, and OMBD API, I will be able to retrieve data for movies using OMBD, and songs and nearby shows for concerts. In order to successfully retreive data I will need to use the following: 

1. Axios 

2. Create a Spotify API key after signing up 

3. To install spotify API (npm install --save node-spotify-api)

4. Use an FS node package

5. moment to format the date and time of the event

6. Creating a .env file to place Spotify API keys so they arent uploaded to github. (Access the API keys by setting them to a variabl.)



GETTING STARTED:

1. In the termnial go to liri-node-app directory. 
2. Using the commands spotify-this, concert-this, do-what-it-says, and movie-this will tell the application which API to grab data from.
2. To begin a search type: "node-liri-app concert-this Jay-Z" This will provide results for the date, time and location of upcoming concerts.

