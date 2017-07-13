// This section controls Twitter Functionality
        var keyLink = require("./keys.js");
        // console.log(process.argv);
        var Twitter = require('twitter');
        // This function determines what you are entering and then performs that task
        function whatToShow (vari) {
          if (vari === "my-tweets") {
            myTweets();
          }
          else if (vari === "tweet-this") {
            tweetThis();
            console.log(process.argv);
          }
          else if (vari === "spotify-this-song") {
            spotifyThis();
          }
          else if (vari === "movie-this") {
            movieRequest();
          }
          else {
            console.log("Not a valid command.  Try again.");
          }
        };
        // This function will show my most recent tweets
        function myTweets () {
        var client = new Twitter(keyLink.twitKeys);

        var params = {screen_name: 'nodejs'};
        client.get('statuses/user_timeline', params, function(error, tweets, response) {
          if (!error) {
            console.log(tweets);
          }
        });
        };
        whatToShow (process.argv[2]);
// This section will allow Twitter posts
      function tweetThis (vari) {


        var T = new Twitter(keyLink.twitKeys);
        var tweet = {
        status: (process.argv[3] || "Gettin' it done!! #funtimes") }
        T.post('statuses/update', tweet, tweeted)
        function tweeted(err, data, response) {
        if(err){
        console.log("Something went wrong!");
        }
        else{
        console.log("Voila It worked!");
        }
        }
      };
  // This section will control Spotify Functionality

  function spotifyThis () {
  var Spotify = require('node-spotify-api');
  var spotify = new Spotify(keyLink.spotty);


  spotify.search({ type: 'track', query: (process.argv[3] || "All the Small Things") }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    var entireObject = data;
    for (var outside in data) {
      // console.log(data[outside].items);
      for (var i = 0; i < (data[outside].items).length; i++) {
        console.log((data[outside].items)[i]);
      }
    };

    // console.log(entireObject);

  });

};
function movieRequest () {
var request = require("request");
searchCrit = process.argv[3] || "Mr.+Nobody";
request('http://www.omdbapi.com/?apikey=40e9cece&t=' + searchCrit, function (error, response, body) {
  // console.log('error:', error); // Print the error if one occurred
  // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
  var movieObj = JSON.parse(body);
  console.log("Title: " + movieObj.Title);
  console.log("Year: " + movieObj.Year);
  console.log("Rating: " + movieObj.Rated);
  console.log("Country Produced In: " + movieObj.Country);
  console.log("Language: " + movieObj.Language);
  console.log("Plot: " + movieObj.Plot);
  console.log("Actors/Actresses: " + movieObj.Actors);
  console.log("Rotten Tomatoes: " + movieObj.imdbRating);






});
};
