import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const TaskDetails = () => {
    const { taskid } = useParams();
    const [taskdata, setTaskData] = useState(null);
    

    useEffect(() => {
        fetch("http://localhost:8000/task/" + taskid)
            .then((res) => {
                return res.json();
            })
            .then((resp) => {
                setTaskData(resp);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    return (
        <div className="container">
            {taskdata &&
                <div className="card">
                    <div className="card-header">
                        <h2>Task Details</h2>
                    </div>
                    <div className="card-body" style={{textAlign:"left"}}>
                        <h3>Task Name: {taskdata.name} ({taskdata.id})</h3>
                        <p>Description: {taskdata.description}</p>
                        <Link className = "btn btn-remove" to ="/">Back to task list</Link>
                    </div>
                </div>
              }
        </div>
    );
};

export default TaskDetails;
