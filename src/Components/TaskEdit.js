import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const TaskEdit = () => {
    const { taskid } = useParams();
    //const [taskdata, setTaskData] = useState(null);


    useEffect(() => {
        fetch("http://localhost:8000/task/" + taskid)
            .then((res) => {
                return res.json();
            })
            .then((resp) => {
                idchange(resp.id);
                namechange(resp.name);
                descriptionchange(resp.description);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    const [id, idchange] = useState("");
    const [name, namechange] = useState("");
    const [description, descriptionchange] = useState("");
    const navigate = useNavigate();
    const handlesubmit = (e) => {
        e.preventDefault();
        const listdata = ({ id, name, description });

        fetch("http://localhost:8000/task/" + taskid,{
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(listdata)

        }).then((res) => {
            alert('Saved Successfully')
            navigate('/')

        }).catch((err) => {
            console.log(err.message);
        })



    }
    return (
        <div>
            <div className="row">
                <div className="column">
                    <div className="container" onSubmit={handlesubmit}>
                        <div className="card-title">
                            <h2> Task Edit</h2>
                        </div>
                        <div className="form-container" style={{ textAlign: "left" }}>
                            <form>
                                <div className="form-group">
                                    <lable>ID</lable>
                                    <input value={id}  type="text" placeholder="Enter task id" />
                                </div>
                                <div className="form-group">
                                    <lable>Name</lable>
                                    <input value={name} onChange={e => namechange(e.target.value)} type="text" placeholder="Enter task name" />
                                </div>
                                <div className="form-group">
                                    <lable>Description</lable>
                                    <input value={description} onChange={e => descriptionchange(e.target.value)} type="text" placeholder="Enter task description" />
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-edit">Save</button>
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