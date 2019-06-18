//Base Requirements
const express = require('express')
const mongodb = require('mongodb')

//Create the Router
const router = express.Router()

//ROUTES
/// Get Posts
router.get('/', async (req, res) => {
    const posts = await loadPostsCollection()
    res.send(await posts.find({}).toArray()) //Sends the Posts data as an array 
})

/// Add Posts
router.post('/', async (req, res) => {
    const posts = await loadPostsCollection()
    //insertOne method from mongodb
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    })

    res.status(201).json({
        msg: "Post created"
    })
})

/// Delete Posts
router.delete('/:id', async (req, res) => {
    const posts = await loadPostsCollection()
    //deleteOne method from mongo
    await posts.deleteOne({
        _id: new mongodb.ObjectID(req.params.id) //id is a specific type of object in mongo
    })

    res.status(200).json({
        msg: "Post deleted"
    })
})

//
// DB Connect (MongoDB Atlas to create cluster, databases, etc)
async function loadPostsCollection() {
    //creates the database connection with MongoClient.connect
    const client = await mongodb.MongoClient.connect(
        'mongodb+srv://vueadmin:KS57drzVOByyWm7W@vuecluster-9epo7.mongodb.net/test?retryWrites=true&w=majority', {
            useNewUrlParser: true
        })

    return client.db('vue_express').collection('posts') //Database name, created on MongoDB Atlas
}

//Export the Router
module.exports = router