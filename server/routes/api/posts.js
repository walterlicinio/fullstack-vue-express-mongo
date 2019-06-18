//Base Requirements
const express = require('express')
const mongodb = require('mongodb')

//Create the Router
const router = express.Router()

//ROUTES
/// Get Posts
router.get('/', (req, res) => {
    res.send('Hello')
})
/// Add Posts

/// Delete Posts




//Export the Router
module.exports = router