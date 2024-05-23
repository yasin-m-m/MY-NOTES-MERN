require('dotenv').config()
const express = require('express')
const app=express()
const path=require('path')
const dbConnection = require('./config/dbConnection')
const errorMiddleware=require('./middlewares/error')
const corsOptions = require('./config/corsOptions')
const cors=require('cors')
const credentials=require('./middlewares/credentials')
const note=require('./routes/noteRoutes')

// Connect to MongoDB
dbConnection()

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions))

// built-in middleware for json 
app.use(express.json())

//serve static files
app.use('/', express.static(path.join(__dirname, '/public')));

//define routes
app.use('/api',note)

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});

app.use(errorMiddleware)

const server=app.listen(process.env.PORT,()=>{console.log(`Server running on the Port ${process.env.PORT} in ${process.env.NODE_ENV}`);})

process.on('unhandledRejection',(err)=>{
    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server due to unhandled rejection error');
    server.close(()=>{
        process.exit(1);
    })
})

process.on('uncaughtException',(err)=>{
    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server due to uncaught exception error');
    server.close(()=>{
        process.exit(1);
    })
})