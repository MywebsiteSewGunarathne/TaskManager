import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';
import {TASK_API_URL_SLASH } from "../constant";
import { useSwipeable } from "react-swipeable";

const TaskList = () => {
    const [taskdata, setTaskData] = useState(null);
    const [loadingTaskId, setLoadingTaskId]=useState(null);
    const [crossOverTask, setCrossOverTask] = useState([]);
    const navigate = useNavigate();

    const LoadDetail = (id) => {
        navigate('/task/details/' + id);
    };

    const LoadEdit = (id) => {
        navigate('/task/edit/' + id);
    };

    const RemoveFunction = (id) => {
        setLoadingTaskId(id);
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure you want to delete this task?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        fetch(TASK_API_URL_SLASH + id, {
                            method: "DELETE"
                        }).then((res) => {
                            setTaskData(taskdata.filter(task=>task.id !==id));
                            alert('Deleted Successfully');
                            setLoadingTaskId(null);
                        
                        }).catch((err) => {
                            console.log(err.message);
                            setLoadingTaskId(null);
                        });
                    }
                },
                {
                    label: 'No',
                    onClick: () => {
                        setLoadingTaskId(null);
                    }
                }
            ]
        });
    };

    const handleDeleteDirect = (id) =>{
        setLoadingTaskId(id);
        fetch(TASK_API_URL_SLASH + id, {
            method:"DELETE"
        }).then ((res)=> {
            setTaskData((prev)=> prev.filter (task => task.id !==id));
            setLoadingTaskId(null);
            
        }).catch((err)=> {
            console.log(err.message);
            setLoadingTaskId(null);
        });
    };

    const tapTaskCross = (id) => {
        if(crossOverTask.includes (id)) {
            setCrossOverTask(prev => prev.filter(taskId => taskId !== id));
        } else 
            setCrossOverTask(prev => [...prev, id]);
        };
    

const TaskRow = ({item, LoadEdit, RemoveFunction, LoadDetail, loadingTaskId}) => {
    const handlers = useSwipeable({
        onSwipedLeft: () => handleDeleteDirect(item.id),
        preventDefaultTouchmoveEvent: true,
        trackMouse: true
    });

    const isTapped = crossOverTask.includes(item.id);

    return(<tr {...handlers} style={{ touchAction: 'pan-y' }}>
            <td onClick= {()=> tapTaskCross(item.id)} style={{textDecoration:isTapped ? 'line-through': 'none', cursor: 'pointer'}}>{item.id}</td>
            <td onClick= {()=> tapTaskCross(item.id)} style={{textDecoration:isTapped ? 'line-through': 'none', cursor: 'pointer'}}>{item.name}</td>
            <td onClick= {()=> tapTaskCross(item.id)} style={{textDecoration:isTapped ? 'line-through': 'none', cursor: 'pointer'}}>{item.description}</td>
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

    useEffect(() => {
        fetch(TASK_API_URL_SLASH)
            .then((res) => res.json())
            .then((resp) => {
                setTaskData(resp);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    return (
        <div className="container">
            <div className="card">
                <div className="card-header">
                    <h2>Task List</h2>
                </div>
                <div className="card-body">
                    <div> <Link to="task/create" className="btn btn-green">Add New Task</Link></div>
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
                            {taskdata &&
                                taskdata.map((item) => (
                                    <TaskRow
                                    key={item.id}
                                    item={item}
                                    LoadEdit={LoadEdit}
                                    RemoveFunction={RemoveFunction}
                                    LoadDetail={LoadDetail}
                                    loadingTaskId={loadingTaskId}
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