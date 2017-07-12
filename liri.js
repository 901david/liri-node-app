var keyLink = require("./keys.js");
console.log(keyLink.twitKeys);
var Twitter = require('twitter');

var client = new Twitter(keyLink.twitKeys);

var params = {screen_name: 'nodejs'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});
