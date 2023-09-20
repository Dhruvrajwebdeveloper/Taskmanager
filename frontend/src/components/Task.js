import { FaCheckDouble, FaEdit, FaRegTrashAlt } from "react-icons/fa"
const Task = ({task,index,deletetask,
    getSingletask,setToComplete }) => {
    return (
        <div className={task.completed?"task completed":"task"}>
            <p>
                <b>{index+1}.</b>
                {console.log(task)}
                {task.name}
            </p>
            <div className="task-icons">
                <FaCheckDouble color="green"onClick={()=>setToComplete(task)} />
                <FaEdit color="purple" onClick={()=>getSingletask(task)}/>
                <FaRegTrashAlt color='red' onClick={()=>deletetask(task._id)}/>

            </div>
        </div>
    )
}
export default Task;