require("dotenv").config();
let keys = require('./keys');
let Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var fs = require('fs');
let spotify = new Spotify(keys.spotify);
let client = new Twitter(keys.twitter);
let params = {screen_name: 'DabeNeko'};
let command = process.argv[2]
let commandValue = process.argv[3]

function runCommand(command){
  switch(command){
    case 'my-tweets':
        getTweets(commandValue);
        break;
    case 'spotify-this-song':
        getSong(commandValue)
        break;
    case 'movie-this':
        getMovie(commandValue)
        break; 
    case 'do-what-it-says':
        // const randomCommand = process.argv[4]
        const fileText = fs.readFileSync('random.txt', 'utf8')
        console.log(fileText);
        commandValue = fileText.substr(fileText.indexOf(' ')+1);
        parsedCommand = fileText.substr(0,fileText.indexOf(' '));  
        runCommand(parsedCommand)
        break;
    default:
        console.log('The Command Given was',command)
        console.log('Please Input a command eg node liri.js my-tweets')    
  }
}


/**
 * Will get the last 20 tweets on that user accout
 * 
 * @method getTweets
 */
function getTweets(){
 client.get('statuses/user_timeline', params, function(error, tweets, response) {
   if (!error) {
     for(let i = 0 ; i < tweets.length; i++){
      console.log(`${tweets[i].user.screen_name} :${tweets[i].text} **Posted At : ${tweets[i].created_at}` );
      writeToLog(`${tweets[i].user.screen_name} :${tweets[i].text} **Posted At : ${tweets[i].created_at}`);
     }
   }
   else{
     console.log(error)
     writeToLog(error);
   }
 });
}

/**
 * Will get a song by title from the spotify API and console log it
 * 
 * @method getSong
 * @param {string} title 
 */
function getSong(title = 'All the Small Things'){
  spotify
    .search({ type: 'track', query: title, limit: 1 })
    .then(function(response) {
      let template = `Artist Name: ${response.tracks.items[0].album.artists[0].name} \nTrack Name: ${response.tracks.items[0].name} \nPreview Link : ${response.tracks.items[0].external_urls.spotify} \nAblum: ${response.tracks.items[0].album.name}`;
      console.log(template);
      writeToLog(template);
    })
    .catch(function(err) {
      console.log(err);
      writeToLog(err);
    });
}

function getMovie(movie = 'Mr. Nobody'){
  movie = movie.replace(' ' , '+');
  var request = require('request');
request('https://www.omdbapi.com/?apikey=trilogy&t=' + movie, function (error, response, body) {
  if(error){
    console.log('error:', error); // Print the error if one occurred
  }else{
    console.log(body)
    const movieData = JSON.parse(body);
    console.log(`Title:${movieData.Title} \nYear:${movieData.Year} \nIMBD Rateing: ${movieData.imdbRating} \nTomatoes Rateing:movieData.Ratings[1].Value} \nCounty:${movieData.Country} \nPlot:${movieData.Plot} \nActors: ${movieData.Actors}`); // Print the HTML for the Google homepage.
    writeToLog(`Title:${movieData.Title} \nYear:${movieData.Year} \nIMBD Rateing: ${movieData.imdbRating} \nTomatoes Rateing:movieData.Ratings[1].Value} \nCounty:${movieData.Country} \nPlot:${movieData.Plot} \nActors: ${movieData.Actors}`)
  }
});
 
}

function writeToLog(text){
  fs.appendFile('log.txt', `\n ${text}`, function (err) {
    if (err) throw err;
    console.log('The Log has been updated');
  });
}

runCommand(command);

 /**
  * Post Message to twitter
//   */
//  client.post('statuses/update', {status: 'BATMAN'},  function(error, tweet, response) {
//     if(error) throw error;
//     console.log(tweet);  // Tweet body. 
//     console.log(response);  // Raw response object. 
//   });