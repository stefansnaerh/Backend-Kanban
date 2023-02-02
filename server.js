const express = require('express')
const cors = require('cors')
const colors = require('colors')
const dotenv = require('dotenv') // for environment variables
dotenv.config({path:__dirname+'/.env'});
const {errorHandler} = require('./middleware/errorMiddleware') // bringing in errorhandler from middleware
const connectDB =   require('./config/db') 
const port = process.env.PORT || 5001
const mongoUri = process.env.MONGO_URI

connectDB()


const app = express() // initialize express

app.use(cors())
// to be able to read body data
app.use(express.json())
app.use(express.urlencoded({ extended : false}))

app.use('/api/boards', require('./routes/boardRoutes'))
app.use('/api/users', require('./routes/userRoutes'))


app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))