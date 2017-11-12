const auth = require('./secrets')

var MySportsFeeds = require("mysportsfeeds-node");
var msf = new MySportsFeeds("1.0", true, null);
msf.authenticate(auth.username, auth.password);

var player = 'eli-manning'

msf.getData('nfl', '2015-2016-regular', 'player_gamelogs', 'json', {player: player})
  .then(data => {
    console.log(data.playergamelogs.gamelogs[0].stats)
  })
  .catch(console.error.bind(console))
