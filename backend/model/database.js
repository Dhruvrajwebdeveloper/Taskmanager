const mongoose = require("mongoose");
// const dotenv =require("dotenv").config();


 class Database {
    constructor() {
        this.connection();
    }

    async connection() {
        mongoose.set('strictQuery', false);
        try {
            // const uri = "";
            // const URI="mongodb://0.0.0.0:27017/";
            await mongoose.connect("mongodb://0.0.0.0:27017/taskmodel");
            console.log("connected to mongodb");
        }
        catch (error) {
            console.log(error);
        }

    }
}
module.exports = new Database();