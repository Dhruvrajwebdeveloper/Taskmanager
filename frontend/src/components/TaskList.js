import TaskForm from "./TaskForm";
import Task from "./Task";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import axios from "axios";
import Loader from "../assets/Loader.gif"
const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setformData] = useState({
        name: '',
        completed: false
    })
    const { name } = formData;
    const [isEditing, setisEditing] = useState(false);
    const [TaskID, setTaskID] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setformData({ ...formData, [name]: value });
    }
    const createTask = async (e) => {
        e.preventDefault();
        if (name === '')
            return toast.error("Empty input field");
        try {
            await axios.post("/api/tasks", formData);
            toast.success("Task added successfully");
            setformData({ ...formData, name: "" });
            getTasks();
        } catch (error) {
            toast.error(error.message);
        }
    }
    const getTasks = async () => {
        setIsLoading(true);
        try {
            const { data } = await axios.get('http://localhost:3003/api/tasks');
            setTasks(data);
            setIsLoading(false);
        } catch (error) {
            toast.error(error.message);
            setIsLoading(false);
        }
    }
    const deletetask = async (id) => {
        try {
            await axios.delete(`http://localhost:3003/api/tasks/${id}`)
            getTasks();
        } catch (error) {
            toast.error(error.message);
        }
    }
    const getSingletask = async (task) => {
        setformData({
            name: task.name,
            completed: false
        })
        setTaskID(task._id);
        setisEditing(true);

    }
    const updateTask = async (e) => {
        e.preventDefault();
        if (name === "") {
            return toast.error("input field can't be empty");
        }
        try {
            await axios.put(`http://localhost:3003/api/tasks/${TaskID}`, formData);
            setformData({ ...formData, name: "" });
            setisEditing(false);
            getTasks();
        } catch (error) {
            toast.error(error.message);

        }
    }
    const setToComplete = async (task) => {
        const newFormdata = {
            name: task.name,
            completed: true
        }
        try {
            await axios.put(`http://localhost:3003/api/tasks/${task._id}`, newFormdata);
            getTasks();
        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(()=>{
        const cTask = tasks.filter((task)=>{
            return task.completed===true
        })
        setCompletedTasks(cTask)
    },[tasks])
    useEffect(() => {
        getTasks()
    }, [])

    return (
        <div>
            <h2>Task Manager</h2>
            <TaskForm name={name}
                handleInputChange={handleInputChange}
                createTask={createTask}
                isEditing={isEditing}
                updateTask={updateTask} />
            {
                tasks.length >0 && (
                    <div className="--flex-between --pb">
                <p>
                    <b>Total Tasks:{tasks.length}</b>
                </p>
                <p>
                    <b>Completed Tasks:{completedTasks.length}</b>
                </p>
            </div>
                )
            }
            <hr />
            {
                isLoading && (
                    <div className="--flex-center">
                        <img src={Loader} alt="loading" />
                    </div>
                )

            }
            {
                !isLoading && tasks.length === 0 ? (
                    <p className="--py">No Task added</p>

                ) : (
                    <>
                        {tasks.map((task, index) => {
                            return (<Task key={task._id}
                                task={task}
                                index={index}
                                deletetask={deletetask}
                                getSingletask={getSingletask}
                                setToComplete={setToComplete} />)


                        })

                        }
                    </>
                )

            }
        </div>
    )
}
export default TaskList;