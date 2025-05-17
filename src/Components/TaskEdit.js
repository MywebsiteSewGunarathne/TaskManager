import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TASK_API_URL_SLASH } from "../constant";
import { confirmAlert } from "react-confirm-alert";
import { useTasks } from './TaskContext';

const TaskEdit = () => {

    const { id, setId, name, setName, description, setDescription, loadingTaskId, setLoadingTaskId, SaveAlert } = useTasks();

    const { taskid } = useParams();
    useEffect(() => {
        fetch(TASK_API_URL_SLASH + taskid)
            .then((res) => res.json())
            .then((resp) => {
                setId(resp.id);
                setName(resp.name);
                setDescription(resp.description);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, [taskid]);

    

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
                                    <input value={id} type="text" placeholder="Enter task id" readOnly />
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
                                    <button type="button" onClick={() =>SaveAlert (taskid, id, name, description)} className="btn btn-edit">Save</button>
                                    <Link to="/" className="btn btn-remove">Back</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TaskEdit;
