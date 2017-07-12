var keyLink = require("./keys.js");
// console.log(process.argv);
var Twitter = require('twitter');
// This function determines what you are entering and then performs that task
function whatToShow (vari) {
  if (vari === "my-tweets") {
    myTweets();
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
