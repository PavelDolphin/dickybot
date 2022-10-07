const express = require('express')
const app = express()

const port = process.env.PORT || 3500

app.listen(port, () =>{
    console.log(`app listen on port ${port}`)
})
