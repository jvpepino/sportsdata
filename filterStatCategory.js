function filterPositionalStats(obj, catType, categoryArr) {
  const keyStats = [];

  Object.keys(obj).forEach(key => {
    categoryArr.forEach(category => {
      if (obj[key][catType] === category) {
        keyStats.push(obj[key])
      }
    })
  })
  return keyStats;
}

function updateStatsByPosition(gameArray, catType, categoryArr) {
  gameArray.forEach(game => {
    game.keyStats = filterPositionalStats(game.stats, catType, categoryArr)
  })
}

module.exports = updateStatsByPosition;
