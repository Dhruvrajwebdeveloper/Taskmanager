const express = require("express");
const router = express.Router();
const Task  = require("../model/taskmodel");
const {createtask,gettasks,gettask,deletetask,updatetask} = require("../controllers/taskController");



router.route("/").get(gettasks).post(createtask);
router.route("/:id").get(gettask).delete(deletetask).put(updatetask);

// router.post("/",createtask);
// router.get("/",gettasks);
// router.get("/:id",gettask);
// router.delete("/:id",deletetask);
// router.put("/:id",updatetask);


module.exports = router; 