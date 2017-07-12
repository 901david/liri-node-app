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
        status: process.argv[3] }
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
  var spotify = require('spotify');
  function spotifyThis () {
    var searchQueer = (process.argv[3]);
spotify.search({ type: 'track', query: searchQueer }, function(err, data) {
if ( err ) {
  console.log('Error occurred: ' + err);
  return;
}

console.log(data);
});
};
