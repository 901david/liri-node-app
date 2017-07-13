var argOne = process.argv[2];
var argTwo = process.argv[3];
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

        var params = {screen_name: 'scriptscrawler', count: 20};
        client.get('statuses/user_timeline', params, function(error, tweets, response) {
          if (!error) {
            // console.log(tweets);
            var tweetData = tweets;
            for (var i = 0; i < tweetData.length; i++) {
              console.log("@" + tweetData[i].user.screen_name + " Tweeted Out:");
              console.log('"' + tweetData[i].text + '"');
              console.log("Tweeted out on: " + tweetData[i].created_at);
              console.log("This has been retweeted " + tweetData[i].retweet_count + " times.");
            }

          }
        });
        };
        whatToShow (argOne);
// This section will allow Twitter posts
      function tweetThis (vari) {
        var T = new Twitter(keyLink.twitKeys);
        var tweet = {
        status: (argTwo) }
        T.post('statuses/update', tweet, tweeted)
        function tweeted(err, data, response) {
        if(err){
        console.log("Something went wrong! Maybe try adding in text for your tweet.");
        }
        else{
        console.log("Your tweet went through!  It has been posted to @scriptscrawler's feed.");
        }
        }
      };
  // This section will control Spotify Functionality

  function spotifyThis () {
  var Spotify = require('node-spotify-api');
  var spotify = new Spotify(keyLink.spotty);


  spotify.search({ type: 'track', query: (argTwo || "All the Small Things") }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    var entireObject = data;
    for (var outside in data) {
      // console.log(data[outside].items);
      for (var i = 0; i < (data[outside].items).length; i++) {
        var data = (data[outside].items)[i];
        // console.log(data);
        console.log("Artist: " + data.artists[0].name);
        console.log("Album: " + data.album.name);
        console.log("Song Name: " + data.name);
        if (!(data.preview_url === "null")) {
        console.log("Link to Preview: " + data.preview_url);
      }

        console.log("Popularity Rating: " + data.popularity);

      }
    };

    // console.log(entireObject);

  });

};
function movieRequest () {
var request = require("request");
searchCrit = argTwo || "Mr.+Nobody";
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
