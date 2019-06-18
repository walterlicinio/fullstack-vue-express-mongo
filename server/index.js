//Base Requirements
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

//Initialize app
const app = express()

//Middlewares
app.use(bodyParser.json())
app.use(cors())

//Require posts API file
const posts = require('./routes/api/posts')
//Redirects any route from /api/posts to the posts API file
app.use('/api/posts', posts)


//PORT variable
const port = process.env.PORT || 3000

//Start server
app.listen(port, () => console.log(`Server started on ${port}`))