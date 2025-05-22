import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasksById, editTask } from "../Redux/TaskSlice";
import { confirmAlert } from "react-confirm-alert";

const TaskEdit = () => {
    const { taskid } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const selectedTask = useSelector(state => state.tasks.selectedTask);
    const loadingTaskId = useSelector(state => state.tasks.loadingTaskId);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        dispatch(fetchTasksById(taskid));
    }, [dispatch, taskid]);

    useEffect(() => {
        if (selectedTask) {
            setName(selectedTask.name);
            setDescription(selectedTask.description);
        }
    }, [selectedTask]);

    const SaveAlert = () => {
        const taskData = { id: taskid, name, description };
        confirmAlert({
            title: 'Confirm to Save',
            message: 'Are you sure you want to update this task?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        dispatch(editTask({ id: taskid, taskData }))
                            .unwrap()
                            .then(() => {
                                alert('Updated Successfully');
                                navigate('/');
                            })
                            .catch((err) => {
                                console.error('Update failed:', err);
                            });
                    }
                },
                {
                    label: 'No',
                    onClick: () => {
                        console.log("Update cancelled");
                    }
                }
            ]
        });
    };

    return (
        <div>
            <div className="row">
                <div className="column">
                    <div className="container">
                        <div className="card-title">
                            <h2> Task Edit</h2>
                        </div>
                        <div className="form-container" style={{ textAlign: "left" }}>
                            <form>
                                <div className="form-group">
                                    <label>ID</label>
                                    <input value={taskid} type="text" readOnly />
                                </div>
                                <div className="form-group">
                                    <label>Name</label>
                                    <input value={name} onChange={e => setName(e.target.value)} type="text" placeholder="Enter task name" />
                                </div>
                                <div className="form-group">
                                    <label>Description</label>
                                    <input value={description} onChange={e => setDescription(e.target.value)} type="text" placeholder="Enter task description" />
                                </div>
                                <div className="form-group">
                                    <button type="button" onClick={SaveAlert} className="btn btn-edit" disabled={loadingTaskId === taskid}>
                                        {loadingTaskId === taskid ? "Saving..." : "Save"}
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

export default TaskEdit;
