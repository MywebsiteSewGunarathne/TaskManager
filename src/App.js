import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskList from './Components/TaskList';
import TaskDetails from './Components/TaskDetails';
import TaskCreate from './Components/TaskCreate';
import TaskEdit from './Components/TaskEdit';
import { TaskProvider } from './Components/TaskContext';
import 'react-confirm-alert/src/react-confirm-alert.css';



function App() {
    return (
      <div className="App">
      <h1>Task Manager Application</h1>
        
            <Router>
                <TaskProvider>
                <Routes>
                    <Route path="/" element={<TaskList />} />
                    <Route path="/task/details/:taskid" element={<TaskDetails />} />
                    <Route path="/task/create" element={<TaskCreate />} />
                    <Route path="/task/edit/:taskid" element={<TaskEdit />} />
                </Routes>
                </TaskProvider>
            </Router>
        
        </div>
    );
}

export default App;
