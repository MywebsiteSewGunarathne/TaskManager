import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import { useDispatch, useSelector } from "react-redux";
import { createTask, fetchTasks } from "../Redux/TaskSlice";
const TaskCreate = () => {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [loadingTaskId, setLoadingTaskId] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch(); 

    const SaveAlert = () => {
        const taskData = { name, description };
        setLoadingTaskId(true);
        confirmAlert({
            title: 'Confirm to Save',
            message: 'Are you sure you want to save this task?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        dispatch(createTask(taskData))
                            .unwrap()
                            .then((newTask) => {
                                dispatch(fetchTasks());
                                alert('Saved Successfully ' + newTask.id);
                                navigate('/');
                            })
                            .catch((error) => {
                                console.error('Failed to save task:', error);
                            })
                            .finally(() => {
                                setLoadingTaskId(null);
                            });
                    },
                },
                {
                    label: 'No',
                    onClick: () => {
                        setLoadingTaskId(null);
                    }
                }
            ],
        });
    }


    const handlesubmit = (e) => {
        e.preventDefault();
        const listdata = ({ name, description });



        /* fetch(TASK_API_URL, {
             method: "POST",
             headers: { "content-type": "application/json" },
             body: JSON.stringify(listdata)
 
         }).then((res) => res.json())
             .then((data) => {
                 alert('Saved Successfully ' + data.id)
                 navigate('/')
 
             }).catch((err) => {
                 console.log(err.message);
             })*/

    }


    return (
        <div>
            <div className="row">
                <div className="column">
                    <div className="container">
                        <div className="card-title">
                            <h2>Task Create</h2>
                        </div>
                        <div className="form-container" style={{ textAlign: "left" }}>
                            <form>
                                <div className="form-group">
                                    <label>Name</label>
                                    <input
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        type="text"
                                        placeholder="Enter task name"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Description</label>
                                    <input
                                        value={description}
                                        onChange={e => setDescription(e.target.value)}
                                        type="text"
                                        placeholder="Enter task description"
                                    />
                                </div>
                                <div className="form-group">
                                    <button
                                        type="button"
                                        onClick={SaveAlert}
                                        className="btn btn-edit"
                                        disabled={loadingTaskId}
                                    >
                                        {loadingTaskId ? 'Saving...' : 'Save'}
                                    </button>
                                    <Link to="/" className="btn btn-remove">Back</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskCreate;