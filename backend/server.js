const express = require ('express')
const dotenv = require('dotenv').config()
const {errorHandler}= require('../backend/middlerware/errorMiddleware')
const PORT = process.env.PORT||5000
const connectDB = require('./config/db')

//Connect to database
connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.get('/',(req,res)=>{res.status(201).json({message:"Welcome to the suport desk"})})

//Routes
app.use('/api/users',require('./routes/userRoutes'))
app.use('/api/tickets',require('./routes/ticketRoutes'))

app.use(errorHandler)

app.listen(PORT,()=>console.log(`Server started on port ${PORT}`))