import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useTasks } from "./TaskContext";
import { TASK_API_URL_SLASH } from "../constant";

const TaskDetails = () => {
  const { taskid } = useParams();
  const { currentTask, setCurrentTask } = useTasks();

  useEffect(() => {
    setCurrentTask(null);  // reset before fetching new task
    fetch(TASK_API_URL_SLASH + taskid)
      .then(res => res.json())
      .then(data => setCurrentTask(data))
      .catch(err => console.log(err.message));
  }, [taskid, setCurrentTask]);

  if (!currentTask) {
    return <div>Loading task details...</div>;
  }

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <h2>Task Details</h2>
        </div>
        <div className="card-body" style={{ textAlign: "left" }}>
          <h3>Task Name: {currentTask.name} ({currentTask.id})</h3>
          <p>Description: {currentTask.description}</p>
          <Link className="btn btn-remove" to="/">Back to task list</Link>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
