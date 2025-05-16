import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TASK_API_URL } from "../constant";
const TaskCreate = () => {
    
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();
    const handlesubmit=(e)=>{
        e.preventDefault();
        const listdata = ({name, description});
        
        fetch(TASK_API_URL,{
            method:"POST",
            headers:{"content-type":"application/json"},
            body:JSON.stringify(listdata)
             
        }).then ((res)=>res.json())
        .then((data)=>{
            alert('Saved Successfully ' + data.id)
            navigate('/')

        }).catch((err)=>{ 
            console.log(err.message);
        })

    }
    
    return (
        <div>
            <div className="row">
                <div className="column">
                    <div className="container" onSubmit={handlesubmit}>
                        <div className="card-title">
                            <h2> Task Create</h2>
                        </div>
                        <div className="form-container" style={{textAlign:"left"}}>
                            <form>
                                
                                <div className="form-group">
                                    <lable>Name</lable>
                                    <input value={name} onChange={e=>setName(e.target.value)}  type="text" placeholder="Enter task name" />
                                </div>
                                <div className="form-group">
                                    <lable>Description</lable>
                                    <input value={description} onChange={e=>setDescription(e.target.value)} type="text" placeholder="Enter task description" />
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

export default TaskCreate;