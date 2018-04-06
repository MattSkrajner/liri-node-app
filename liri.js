require("dotenv").config();

var keys = require("./keys.js");
var Twitter = require("twitter");
var spotify = require("spotify");
var request = require('request');

var getTweets = function(){

var client = new Twitter(keys.twitter);

var params = {screen_name: 'sct_matt'};
client.get("statuses/user_timeline", params, function(error, tweets, response) {
    if (!error) {
        console.log(tweets);
        for(var i=0; i<tweets.length; i++) {
            console.log(tweets[i].created_at);
            console.log(" ");
            console.log(tweets[i].text);
        }
    }
});
};

var getArtistNames = function(artist) {
    return artist.name;
}

var getSpotify = function(songName) {

    spotify.search({ type: 'track', query: songName }, function(err, data) {
        if ( err ) {
            console.log('Error occurred: ' + err);
            return;
        }

        var songs = data.tracks.items;
        for(var i=0; i<songs.length; i++) {
            console.log(i);
            console.log("artist: " + songs[i].artists.map(getArtistNames));
            console.log("song name: " + songs[i].name);
            console.log("preview song: " + songs[i].preview_url);
            console.log("album: " + songs[i].album.name);
        }
});
}

var getMovie = function(movieName) {

request("http://www.omdbapi.com/?t=mr+nobody", function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
});
}

var select = function(caseData, functionData) {
    switch(caseData) {
        case "my-tweets" :
            getTweets();
            break;
        case "spotify-this-song":
            getSpotify(functionData);
            break;
        case "movie-this":
            getMovie(functionData);
        default:
        console.log("LIRI can not do that");
    }
}

var runSelect = function(argOne, argTwo) {
    select(argOne, argTwo);
};

runSelect(process.argv[2], process.argv[3]);

// var spotify = new Spotify(keys.spotify);
