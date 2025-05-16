import React, { createContext, useContext, useEffect, useState } from "react";
import { TASK_API_URL, TASK_API_URL_SLASH } from "../constant";
import { useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [taskdata, setTaskData] = useState([]);
    const [currentTask, setCurrentTask] = useState(null);
    const [loadingTaskId, setLoadingTaskId] = useState(null);
    const [crossOverTask, setCrossOverTask] = useState([]);
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

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
                            fetch(TASK_API_URL_SLASH + id, { method: "DELETE" })
                                .then((res) => {
                                    setTaskData((prev) => prev.filter(task => task.id !== id));
                                    alert('Deleted Successfully');
                                    setLoadingTaskId(null);
                                })
                                .catch((err) => {
                                    console.log(err.message);
                                    setLoadingTaskId(null);
                                });
                        }
                    },
                    {
                        label: 'No',
                        onClick: () => setLoadingTaskId(null)
                    }
                ]
            });
        };
    
        const handleDeleteDirect = (id) => {
            setLoadingTaskId(id);
            fetch(TASK_API_URL_SLASH + id, { method: "DELETE" })
                .then(() => {
                    setTaskData((prev) => prev.filter(task => task.id !== id));
                    setLoadingTaskId(null);
                })
                .catch((err) => {
                    console.log(err.message);
                    setLoadingTaskId(null);
                });
        };
    
        const tapTaskCross = (id) => {
            if (crossOverTask.includes(id)) {
                setCrossOverTask(prev => prev.filter(taskId => taskId !== id));
            } else {
                setCrossOverTask(prev => [...prev, id]);
            }
        };

        const SaveAlert = (taskid, id, name, description) => {
        const listdata = { id, name, description };
        setLoadingTaskId(true);
        confirmAlert({
            title: 'Confirm to Save',
            message: 'Are you sure you want to update this task?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        fetch(TASK_API_URL_SLASH + taskid, {
                            method: "PUT",
                            headers: { "content-type": "application/json" },
                            body: JSON.stringify(listdata)
                        }).then((res) => {
                            alert('Updated Successfully');
                            navigate('/');
                        }).catch((err) => {
                            console.log(err.message);
                        }).finally(() => {
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

    const CreateAlert = (name, description) => {
        const taskData = { name, description };
        setLoadingTaskId(true);
        confirmAlert({
            title: 'Confirm to Save',
            message: 'Are you sure you want to save this task?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        fetch(TASK_API_URL, {
                            method: "POST",
                            headers: { "content-type": "application/json" },
                            body: JSON.stringify(taskData)
                        }).then((res) => res.json())
                            .then((data) => {
                                alert('Saved Successfully ' + data.id);
                                navigate('/');
                            }).catch((err) => {
                                console.log(err.message);
                            }).finally(() => {
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

    const handlesubmit = (e) => {
        e.preventDefault();
        const listdata = ({ name, description });}

    //for all tasks
    useEffect(() => {
    fetch(TASK_API_URL)
      .then(res => res.json())
      .then(data => setTaskData(data))
      .catch(err => console.error(err));
  }, []);
    

    return (
        <TaskContext.Provider value={{  taskdata, setTaskData, currentTask, setCrossOverTask, setCurrentTask, loadingTaskId, setLoadingTaskId, crossOverTask, setCrossOverTask, id, setId, name, setName, description, setDescription, 
        LoadDetail, LoadEdit, RemoveFunction, handleDeleteDirect, tapTaskCross, SaveAlert, CreateAlert}}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTasks = () => useContext(TaskContext);
