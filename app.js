require("dotenv").config()
require("express-async-errors")

const express = require("express")
const app = express()

const fileUpload = require("express-fileupload")


// Import database
const connectDB = require("./db/connect")

//Import product router
const productRouter = require("./routes/productRoutes")

// Import error handler
const notFoundMiddleware =  require("./middleware/not-found")
const errorHandlerMiddleware = require("./middleware/error-handler")

app.use(express.static("./public"))
app.use(express.json())
app.use(fileUpload({ useTempFiles:true}))


app.get('/', (req, res)=>{
    res.send('<h1>File upload starter</h1>')
})

app.use('/api/v1/products', productRouter)

// use middleware
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)


// spin server
const port = process.env.PORT || 3000

const start = async() =>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, ()=>{
            console.log(`server listening on port ${port}...`)
        })
    } catch (error) {
        console.log(error)
    }

}

start()