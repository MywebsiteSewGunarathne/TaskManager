import './App.css';
import TaskCreate from './Components/TaskCreate.js';
import TaskDetails from './Components/TaskDetails.js';
import TaskEdit from './Components/TaskEdit.js';
import TaskList from './Components/TaskList.js';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <h1>Task Manager Application</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/task/create" element={<TaskCreate />} />
          <Route path="/task/details/:taskid" element={<TaskDetails />} />
          <Route path="/task/edit/:taskid" element={<TaskEdit />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
