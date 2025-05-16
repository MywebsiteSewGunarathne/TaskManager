import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSwipeable } from "react-swipeable";
import { TASK_API_URL_SLASH } from "../constant";
import { useTasks } from './TaskContext';



const TaskList = () => {
    const { taskdata, setTaskData, loadingTaskId, setLoadingTaskId, crossOverTask, setCrossOverTask, LoadDetail, LoadEdit, RemoveFunction, handleDeleteDirect, tapTaskCross } = useTasks();

    useEffect(() => {
        fetch(TASK_API_URL_SLASH)
            .then((res) => res.json())
            .then((resp) => setTaskData(resp))
            .catch((err) => console.log(err.message));
    }, []);

    const TaskRow = ({ item }) => {
        const handlers = useSwipeable({
            onSwipedLeft: () => tapTaskCross(item.id),
            onSwipedRight: () => tapTaskCross(item.id),
            preventScrollOnSwipe: true,
        });

        const isTapped = crossOverTask.includes(item.id);

        return (
            <tr {...handlers} style={{ touchAction: 'pan-y' }}>
                <td onClick={() => tapTaskCross(item.id)} style={{ textDecoration: isTapped ? 'line-through' : 'none', cursor: 'pointer' }}>{item.id}</td>
                <td onClick={() => tapTaskCross(item.id)} style={{ textDecoration: isTapped ? 'line-through' : 'none', cursor: 'pointer' }}>{item.name}</td>
                <td onClick={() => tapTaskCross(item.id)} style={{ textDecoration: isTapped ? 'line-through' : 'none', cursor: 'pointer' }}>{item.description}</td>
                <td>
                    <a onClick={() => LoadEdit(item.id)} className={`btn btn-edit ${isTapped ? 'disabled' : ''}`} style={{ pointerEvents: isTapped ? 'none' : 'auto', opacity: isTapped ? 0.5 : 1 }}>Edit</a>
                    <a onClick={() => RemoveFunction(item.id)} className="btn btn-remove" disabled={loadingTaskId === item.id}>
                        {loadingTaskId === item.id ? 'Loading...' : 'Delete'}
                    </a>
                    <a onClick={() => LoadDetail(item.id)} className="btn btn-details">Details</a>
                </td>
            </tr>
        );
    };

    return (
        <div className="container">
            <div className="card">
                <div className="card-header">
                    <h2>Task List</h2>
                </div>
                <div className="card-body">
                    <div><Link to="task/create" className="btn btn-green">Add New Task</Link></div>

                    <table className="my-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {taskdata && taskdata.map((item) => (
                                <TaskRow
                                    key={item.id}
                                    item={item}
                                />
                            ))}
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    );
};

export default TaskList;
