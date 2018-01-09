const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields
    attributes: ['id', 'email']
  })
    .then(users => res.json(users))
    .catch(next)
})
