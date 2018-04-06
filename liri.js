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

request("http://www.omdbapi.com/?apikey=c6523de7&t=" + movieName + "&y=&plot=short&r=json", function (error, response, body) {
    if (!error && response.statusCode == 200) {
        var json = JSON.parse(body);

        console.log("Title: " + json.Title);
        console.log("Plot: " + json.Plot);
        console.log("Year: " + json.Year);
        console.log("Actors: " + json.Actors);
        console.log("Rated: " + json.Rated);
        console.log("Rotten Tomatoes Rating: " + json.tomatoRating);
        console.log("IMDB Rating: " + json.imdbRating);
        console.log("Country: " + json.Country);
        console.log("Language: " + json.Language);
    }
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
