const express = require("express");
const db = require("./model/database")
const Task = require("./model/taskmodel");
const app = express();
const taskroute = require("./routes/taskroute");
 const cors = require("cors");



const PORT = process.env.PORT || 3003;
app.listen(PORT, () => { console.log(`listening on ${PORT}`) });


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// To accept request from any url
// app.use(cors())
app.use(cors({
    origin:'http://localhost:3000',
    credentials:true
}));

// For specified url use origin
  

app.use("/api/tasks",taskroute);
//middleware
const logger = (req, res, next) => {
    console.log("Middleware");
    next();
}


//routes
app.get("/", (req, res) => {
    res.send("Home page");
})



