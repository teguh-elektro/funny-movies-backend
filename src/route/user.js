const express = require('express')
const router = express.Router()

const {
    statusUser,
    logoutUser
} =require('../controller/user')

router
    .put('/', statusUser)
    .delete('/', logoutUser)
module.exports = router