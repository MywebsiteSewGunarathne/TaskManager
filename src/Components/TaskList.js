import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const TaskList = () => {
    const [taskdata, taskdatachange] = useState(null);
    const navigate = useNavigate();
    const LoadDetail = (id) => {
        navigate('/task/details/' + id);
    }
    const LoadEdit = (id) => {
        navigate('/task/edit/' + id);

    }
    const RemoveFunction = (id) => {
        if (window.confirm('Do you want to delete ?')) {
            fetch("http://localhost:8000/task/" + id, {
                method: "DELETE"

            }).then((res) => {
                alert('Delete Successfully')
                window.location.reload();

            }).catch((err) => {
                console.log(err.message);
            })
        }


    }

    useEffect(() => {
        fetch("http://localhost:8000/task")
            .then((res) => res.json())
            .then((resp) => {
                taskdatachange(resp);
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
                            </tr>
                        </thead>
                        <tbody>
                            {taskdata &&
                                taskdata.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.description}</td>
                                        <td>
                                            <a onClick={() => { LoadEdit(item.id) }} className="btn btn-edit">Edit</a>
                                            <a onClick={() => { RemoveFunction(item.id) }} className="btn btn-remove">Delete</a>
                                            <a onClick={() => { LoadDetail(item.id) }} className="btn btn-details">Details</a>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TaskList;
