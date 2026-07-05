require('dotenv').config({path:`${process.cwd()}/.env`})
const express = require('express');



const app = express()
const PORT = process.env.PORT || 5050

app.listen(PORT, (req, res, next) => {
    console.log(`Server is running at ${PORT}`)
})