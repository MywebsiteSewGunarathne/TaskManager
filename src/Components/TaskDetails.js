import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { fetchTasksById } from "../Redux/TaskSlice";
import { useSelector, useDispatch } from "react-redux";


const TaskDetails = () => {
    const { taskid } = useParams();
    const dispatch = useDispatch();

    const taskdata = useSelector((state) => state.tasks.selectedTask);
    const status = useSelector((state) => state.tasks.status);
    const error = useSelector((state) => state.tasks.error);


    useEffect(() => {
        dispatch(fetchTasksById(taskid));
    }, [dispatch, taskid]);

    return (
    <div className="container">
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Error: {error}</p>}
      {status === 'succeeded' && taskdata && (
        <div className="card">
          <div className="card-header">
            <h2>Task Details</h2>
          </div>
          <div className="card-body" style={{ textAlign: "left" }}>
            <h3>Task Name: {taskdata.name} ({taskdata.id})</h3>
            <p>Description: {taskdata.description}</p>
            <Link className="btn btn-remove" to="/">Back to task list</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskDetails;