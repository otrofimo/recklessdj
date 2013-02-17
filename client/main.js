trackName = "karma police";		 // set up to return from a clickhandler
artistName = "radiohead";				//
checkDb = function (trackName, artistName) {
  if (library.findOne({trackName: trackName, artistName: artistName }) === undefined) { //
    echoNest(trackName, artistName)
  } else {
    // return collection database
	}
}
//checkDb(trackName, artistName)
function echoNest(trackName, artistName) { 
  var revsApiKey = "SPKJOSP5JJEXZ9I7W"
  var url = "http://developer.echonest.com/api/v4/song/search?api_key=" + revsApiKey + "&format=json&results=1&artist=" + artistName + "&title=" + trackName + "&bucket=audio_summary"; //  match format 'karma%20police'    http://developer.echonest.com/docs/v4/song.html#search
  // format = works = http://developer.echonest.com/api/v4/song/search?api_key=SPKJOSP5JJEXZ9I7W&format=json&results=1&artist=radiohead&title=karma%20police&bucket=audio_summary
  results = Meteor.http.call("GET", url);
  echoNestResponse = results.content;
  echoNestParsed = JSON.parse(echoNestResponse);
  json = {trackName: trackName, artistName: artistName, danceability: echoNestParsed[0]["danceability"], energy: echoNestParsed[0]["energy"], tempo: echoNestParsed[0]["tempo"]};
  library.insert(json)
}
