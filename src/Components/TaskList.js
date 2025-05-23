
import { useEffect, useState, useCallback , useMemo} from "react";
import { Link, useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useSwipeable } from "react-swipeable";
import { useSelector, useDispatch } from "react-redux";
import { fetchTasks, deleteTask } from "../Redux/TaskSlice";

const TaskList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const tasks = useSelector(state => state.tasks.tasks);
  const status = useSelector(state => state.tasks.status);
  const error = useSelector(state => state.tasks.error);
  const loadingTaskId = useSelector(state => state.tasks.loadingTaskId);

  const [crossOverTask, setCrossOverTask] = useState([]);


  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTasks());
    }
  }, [status, dispatch]);


  const LoadDetail = useCallback((id) => navigate('/task/details/' + id), [navigate]);
  const LoadEdit = useCallback((id) => navigate('/task/edit/' + id), [navigate]);


  const RemoveFunction = useCallback((id) => {
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure you want to delete this task?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => dispatch(deleteTask(id))
        },
        {
          label: 'No'
        }
      ]
    });
  }, [dispatch]);


  const handleDeleteDirect = useCallback((id) => {
    dispatch(deleteTask(id));
  }, [dispatch]);


  const tapTaskCross = useCallback((id) => {
    if (crossOverTask.includes(id)) {
      setCrossOverTask(prev => prev.filter(taskId => taskId !== id));
    } else {
      setCrossOverTask(prev => [...prev, id]);
    }
  },[]);

  const TaskRow = ({ item }) => {
    const handlers = useSwipeable({
      onSwipedLeft: () => handleDeleteDirect(item.id),
      preventDefaultTouchmoveEvent: true,
      trackMouse: true
    });

    const isTapped = crossOverTask.includes(item.id);

    return (
      <tr {...handlers} style={{ touchAction: 'pan-y' }}>
        <td
          onClick={() => tapTaskCross(item.id)}
          style={{ textDecoration: isTapped ? 'line-through' : 'none', cursor: 'pointer' }}
        >
          {item.id}
        </td>
        <td
          onClick={() => tapTaskCross(item.id)}
          style={{ textDecoration: isTapped ? 'line-through' : 'none', cursor: 'pointer' }}
        >
          {item.name}
        </td>
        <td
          onClick={() => tapTaskCross(item.id)}
          style={{ textDecoration: isTapped ? 'line-through' : 'none', cursor: 'pointer' }}
        >
          {item.description}
        </td>
        <td>
          <a
            onClick={() => LoadEdit(item.id)}
            className={`btn btn-edit ${isTapped ? 'disabled' : ''}`} style={{ pointerEvents: isTapped ? 'none' : 'auto', opacity: isTapped ? 0.5 : 1 }}
            disabled={isTapped}
          >
            Edit
          </a>
          <a
            onClick={() => RemoveFunction(item.id)}
            className="btn btn-remove"
            disabled={loadingTaskId === item.id}
          >
            {loadingTaskId === item.id ? 'Loading...' : 'Delete'}
          </a>

          <a onClick={() => LoadDetail(item.id)} className="btn btn-details">
            Details
          </a>
        </td>
      </tr>
    );
  };

  const renderedTaskRows = useMemo(() => {
    return tasks.map(item => (
      <TaskRow
        key={item.id}
        item={item}
      />
    ));

    
  }, [tasks, crossOverTask, tapTaskCross, handleDeleteDirect, loadingTaskId]);

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <h2>Task List</h2>
        </div>
        <div className="card-body">
          <div>
            <Link to="task/create" className="btn btn-green">Add New Task</Link>
          </div>

          <table className="my-table">
            <tbody>{renderedTaskRows}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TaskList;
