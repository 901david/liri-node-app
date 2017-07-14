var argOne = process.argv[2];
var argTwo = process.argv[3];
var twitterTweetCount = process.argv[3] || 20;
var tweetText;
// This section controls Twitter Functionality
var keyLink = require("./keys.js");
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var fs = require("fs");
var liriBotTriggered = false;
// This function will write items to teh log.txt
function writeThis (textArg) {
  fs.appendFile('log.txt', textArg, function (err) {
    if (err) {
      console.log(err);
    }
  });
};
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
      if (liriBotTriggered) {
        console.log("Look you really did Tweet it out: ");
      }
      for (var i = 0; i < tweetData.length; i++) {
        console.log("@" + tweetData[i].user.screen_name + " Tweeted Out:");
        writeThis("@" + tweetData[i].user.screen_name + " Tweeted Out:\n");
        console.log('"' + tweetData[i].text + '"');
        writeThis('"' + tweetData[i].text + '"\n');
        console.log("Tweeted out on: " + tweetData[i].created_at);
        writeThis("Tweeted out on: " + tweetData[i].created_at+ "\n");
        console.log("This has been retweeted " + tweetData[i].retweet_count + " times.");
        writeThis("This has been retweeted " + tweetData[i].retweet_count + " times.\n");
      }
      console.log("Review the log.txt file to see a log of your actions");
    }
  });
};
whatToShow (argOne);
// This section will allow Twitter posts
function tweetThis (vari) {
  var T = new Twitter(keyLink.twitKeys);
  if (liriBotTriggered) {
    argTwo = tweetText;
  }
  // console.log(argTwo);
  var tweet = {
    status: (argTwo) }
    T.post('statuses/update', tweet, tweeted)
    function tweeted(err, data, response) {
      if(err){
        console.log("Something went wrong! Maybe try adding in text for your tweet.");
      }
      else{
        if (liriBotTriggered) {
          console.log("Tweet about your madness: ");
        }
        console.log("Your tweet went through!  It has been posted to @scriptscrawler's feed.");
        console.log("Tweet: " + argTwo);
        writeThis("Account name Tweeted From: @scriptscrawler\n Tweet: " + argTwo + "\n");
        console.log("Review the log.txt file to see a log of your actions");
      }
    }
  };
  // This section will control Spotify Functionality
  function spotifyThis () {
    var spotify = new Spotify(keyLink.spotty);
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
            if (liriBotTriggered) {
              console.log("Your music Selection: ");
            }
            console.log("Artist: " + data.artists[0].name);
            writeThis("Artist: " + data.artists[0].name + "\n");
            console.log("Album: " + data.album.name);
            writeThis("Album: " + data.album.name + "\n");
            console.log("Song Name: " + data.name);
            writeThis("Song Name: " + data.name + "\n");
            if (!(data.preview_url === null)) {
              console.log("Link to Preview: " + data.preview_url);
              writeThis("Link to Preview: " + data.preview_url + "\n");
            }
            console.log("Popularity Rating: " + data.popularity);
            writeThis("Popularity Rating: " + data.popularity + "\n");
            console.log("Review the log.txt file to see a log of your actions");
          }

        };

      }
    });

  };
  function movieRequest () {
    var request = require("request");
    searchCrit = argTwo || "Mr.+Nobody";
    request('http://www.omdbapi.com/?apikey=40e9cece&t=' + searchCrit + `&tomatoes=true`, function (error, response, body) {
      // console.log('error:', error); // Print the error if one occurred
      // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      var movieObj = JSON.parse(body);
      if (movieObj.Title === undefined && movieObj.Plot === undefined) {
        console.log("I didn't find that one, please try a different title.");
      }
      else {
        if (liriBotTriggered) {
          console.log("Your movie Selection: ");
        }
        console.log("Title: " + movieObj.Title);
        writeThis("Title: " + movieObj.Title + "\n");
        console.log("Year: " + movieObj.Year);
        writeThis("Year: " + movieObj.Year + "\n");
        console.log("Rating: " + movieObj.Rated);
        writeThis("Rating: " + movieObj.Rated + "\n");
        console.log("Country Produced In: " + movieObj.Country);
        writeThis("Country Produced In: " + movieObj.Country + "\n");
        console.log("Language: " + movieObj.Language);
        writeThis("Language: " + movieObj.Language + "\n");
        console.log("Plot: " + movieObj.Plot);
        writeThis("Plot: " + movieObj.Plot + "\n");
        console.log("Actors/Actresses: " + movieObj.Actors);
        writeThis("Actors/Actresses: " + movieObj.Actors + "\n");
        console.log("Rotten Tomatoes URL: " + movieObj.tomatoURL);
        writeThis("Rotten Tomatoes URL: " + movieObj.tomatoURL + "\n");
        console.log("Review the log.txt file to see a log of your actions");
      }
    });

  };


  // This will contain code for the fs read to obtain text from the random.txt file
  function readFromTxt () {
    liriBotTriggered = true;
    fs.readFile("random.txt", "utf8", function (err, data) {
      if (err) {
        return console.log(err);
      }
      else {
        textArr = []
        textArr = data.split(", ");
        // console.log(textArr);
        argTwo = textArr[1].trim();
        argTwo = argTwo.replace(/["]+/g, '');
        spotifyThis(textArr[0].trim());
        argTwo = textArr[3].trim();
        argTwo = argTwo.replace(/["]+/g, '');
        movieRequest(textArr[2].trim());
        argTwo = textArr[5].trim();
        argTwo = argTwo.replace(/["]+/g, '');
        whatToShow(textArr[4].trim());
        twitterTweetCount = 1;
        if (!(process.argv[4] === "")) {
            whatToShow(textArr[6].trim());
        }
        twitterTweetCount = process.argv[3] || 20;
      }
    });
        liriBotTriggered = false;
  };
