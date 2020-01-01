const express = require('express')
const router = express.Router()
const movie = require('./share')
const user = require('./user')

router.use('/movie', movie)
router.use('/user', user)

router.get('/', (req, res) => {
    res.send('Hello World')
});

module.exports = router