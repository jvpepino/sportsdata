const auth = require('../../secrets')
const router = require('express').Router()
module.exports = router

var MySportsFeeds = require('mysportsfeeds-node');
var msf = new MySportsFeeds('1.0', true, null);
msf.authenticate(auth.username, auth.password);

function cleanUpName(name) {
  name = name.toLowerCase()
  let nameArr = name.split(' ')
  return nameArr.filter(el => !!el).map(el => el.trim()).join('-')
}

router.get('/', (req, res, next) => {
  let {name, league, year} = req.query;
  name = cleanUpName(name);

  msf.getData(league, year, 'player_gamelogs', 'json', {player: name})
    .then(result => {
      // console.log(result);
      res.json(result)
    })
    .catch(console.error.bind(console))
})
