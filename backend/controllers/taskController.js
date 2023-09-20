const Task = require("../model/taskmodel");

const createtask = async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(200).json(task);
    }
    catch (error) {
        res.status(500).json({ msg: error.message });
    }
    console.log(req.body);

}

const gettasks = async (req, res) => {
    try {

        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {

        res.status(500).json({ msg: error.message });
    }
}

//get a task
const gettask = async (req, res) => {

    console.log(req.params);
    try {
        const { id } = req.params;
        const task = await Task.findById(id);
        res.status(200).json(task);
        if (!task) {
            return res.status(404).json(`No task with id ${id}`);
        }
    } catch (error) {

        res.status(500).json({ msg: error.message });
    }
}
const deletetask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findByIdAndDelete(id);
        console.log(task);
        if (!task) {
            return res.status(404).json(`No task with ${id}`);
        }
        res.status(200).send("Task deleted");
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

const updatetask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findByIdAndUpdate(
            { _id: id },
            req.body,
            {
                new: true,
                runValidators: true
            }
        );
        console.log(task);
        if (!task) {
            return res.status(404).json(`No task with ${id}`);
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }

}

module.exports = {
    createtask: createtask,
    gettasks: gettasks,
    gettask: gettask,
    deletetask: deletetask,
    updatetask: updatetask

}