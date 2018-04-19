require("dotenv").config();

var keys = require('./keys');
var Twitter = require('twitter');

// var spotify = new Spotify(keys.spotify);
 var client = new Twitter(keys.twitter);

 var params = {screen_name: 'DabeNeko'};


 client.get('statuses/user_timeline', params, function(error, tweets, response) {
   if (!error) {
     console.log(tweets[0].text);
   }
 });


 /**
  * Post Message to twitter
//   */
//  client.post('statuses/update', {status: 'BATMAN'},  function(error, tweet, response) {
//     if(error) throw error;
//     console.log(tweet);  // Tweet body. 
//     console.log(response);  // Raw response object. 
//   });