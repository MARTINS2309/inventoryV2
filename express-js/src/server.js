const express = require('express')
const cors = require('cors')
const port =  3001;

const app = express()
//setting up json() processing
app.use(express.json())

//setting up cors as middleware
app.use(cors());

//set up routers
const productsRouter = require('./routes/products')
const stockRouter = require('./routes/stockevents');

app.use('/api/products', productsRouter)
app.use('/api/stockevents', stockRouter)


// Starts server on port and displays message that the server is running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`));