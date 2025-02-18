// index.js
const express  =  require("express");
const mainRouter  = require("./routes/index");
const cors = require("cors");
// const bodyParser = require("body-parser");
const app = express();
const port = 3000;
app.use(cors());
// app.use(bodyParser);
app.use(express.json());

app.use('/api/v1',mainRouter);
app.listen(port,()=>{
    console.log(`connected to port${port}`)
})