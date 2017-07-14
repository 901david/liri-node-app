var argOne = process.argv[2];
var argTwo = process.argv[3];
var twitterTweetCount = process.argv[3] || 20;
// This section controls Twitter Functionality
var keyLink = require("./keys.js");
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var fs = require("fs");
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
  else if (vari === "do-what-it-says") {
    readFromTxt();
  }
  else {
    console.log("Not a valid command.  Try again.");
  }
};
// This function will show my most recent tweets
function myTweets () {
  var client = new Twitter(keyLink.twitKeys);
  var logArray = [];
  var params = {screen_name: 'scriptscrawler', count: twitterTweetCount};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      // console.log(tweets);
      var tweetData = tweets;
      for (var i = 0; i < tweetData.length; i++) {
        console.log("@" + tweetData[i].user.screen_name + " Tweeted Out:");
        console.log('"' + tweetData[i].text + '"');
        console.log("Tweeted out on: " + tweetData[i].created_at);
        console.log("This has been retweeted " + tweetData[i].retweet_count + " times.");
        logArray.push("@" + tweetData[i].user.screen_name + " Tweeted Out:\n")
        logArray.push('"' + tweetData[i].text + '"\n')
        logArray.push("Tweeted out on: " + tweetData[i].created_at+ "\n")
        logArray.push("This has been retweeted " + tweetData[i].retweet_count + " times.\n")

      }

      fs.appendFile('log.txt', logArray, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Review the log.txt file to see a log of your actions");
        }
      });
    }
  });
};
whatToShow (argOne);
// This section will allow Twitter posts
function tweetThis (vari) {
  var logArray = [];
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
        logArray.push("Account name Tweeted From: @scriptscrawler\n Tweet: " + argTwo + "\n");
        fs.appendFile('log.txt', logArray, function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log("Review the log.txt file to see a log of your actions");
          }
        });
      }
    }
  };
  // This section will control Spotify Functionality

  function spotifyThis () {
    var spotify = new Spotify(keyLink.spotty);
    var logArray = [];

    spotify.search({ type: 'track', query: (argTwo || "Ace of Base The Sign") }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
      else {
        var entireObject = data;
        for (var outside in data) {
          // console.log(data[outside].items);
          for (var i = 0; i < (data[outside].items).length; i++) {
            var data = (data[outside].items)[i];
            // console.log(data);
            console.log("Artist: " + data.artists[0].name);
            console.log("Album: " + data.album.name);
            console.log("Song Name: " + data.name);
            if (!(data.preview_url === null)) {
              console.log("Link to Preview: " + data.preview_url);
            }
            console.log("Popularity Rating: " + data.popularity + "\n");
            logArray.push("Artist: " + data.artists[0].name + "\n");
            logArray.push("Album: " + data.album.name + "\n");
            logArray.push("Song Name: " + data.name + "\n");
            logArray.push("Link to Preview: " + data.preview_url + "\n");
            logArray.push("Popularity Rating: " + data.popularity + "\n");
            fs.appendFile('log.txt', logArray, function (err) {
              if (err) {
                console.log(err);
              } else {
                console.log("Review the log.txt file to see a log of your actions");
              }
            });
          }
        };

      }
    });

  };
  function movieRequest () {
    var request = require("request");
    var logArray = [];
    searchCrit = argTwo || "Mr.+Nobody";
    request('http://www.omdbapi.com/?apikey=40e9cece&t=' + searchCrit + `&tomatoes=true`, function (error, response, body) {
      // console.log('error:', error); // Print the error if one occurred
      // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      var movieObj = JSON.parse(body);
      if (movieObj.Title === undefined && movieObj.Plot === undefined) {
        console.log("I didn't find that one, please try a different title.");
      }
      else {
        console.log("Title: " + movieObj.Title);
        console.log("Year: " + movieObj.Year);
        console.log("Rating: " + movieObj.Rated);
        console.log("Country Produced In: " + movieObj.Country);
        console.log("Language: " + movieObj.Language);
        console.log("Plot: " + movieObj.Plot);
        console.log("Actors/Actresses: " + movieObj.Actors);
        console.log("Rotten Tomatoes URL: " + movieObj.tomatoURL);
        logArray.push("Title: " + movieObj.Title + "\n");
        logArray.push("Year: " + movieObj.Year + "\n");
        logArray.push("Rating: " + movieObj.Rated + "\n");
        logArray.push("Country Produced In: " + movieObj.Country + "\n");
        logArray.push("Language: " + movieObj.Language + "\n");
        logArray.push("Plot: " + movieObj.Plot + "\n");
        logArray.push("Actors/Actresses: " + movieObj.Actors + "\n");
        logArray.push("Rotten Tomatoes URL: " + movieObj.tomatoURL + "\n");
        fs.appendFile('log.txt', logArray, function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log("Review the log.txt file to see a log of your actions");
          }
        });
      }
    });

  };


  // This will contain code for the fs read to obtain text from the random.txt file
  function readFromTxt () {
    fs.readFile("random.txt", "utf8", function (err, data) {
      if (err) {
        return console.log(err);
      }
      else {
        textArr = []
        textArr = data.split(", ");
        argTwo = textArr[1].trim();
        argTwo = argTwo.replace(/["]+/g, '');
        console.log("Your music Selection: ");
        spotifyThis(textArr[0].trim());
        argTwo = textArr[3].trim();
        argTwo = argTwo.replace(/["]+/g, '');
        console.log("Your movie Selection: ");
        movieRequest(textArr[2].trim());
        argTwo = textArr[5].trim();
        argTwo = argTwo.replace(/["]+/g, '');
        console.log("Tweet about your madness: ");
        tweetThis(textArr[4].trim());
        twitterTweetCount = 1;
        console.log("Look, you really did Tweet it out!: ");
        whatToShow(textArr[6].trim());
        twitterTweetCount = process.argv[3] || 20;

      }
    });
  };
