import React, { useState } from 'react';
import Login from './components/Login';
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';
import './components/styles.css';

const App = () => {
  const [token, setToken] = useState(null);
  const handleLogout = () => {
    setToken(null);
    alert('Logged out successfully');
  };

  return (
    <div className="app-container">
      {}
      {!token ? (
        <div className="login-container">
          <Login setAuth={setToken} />
        </div>
      ) : (
        <div className="task-container">
          {}
          <TaskList token={token} />
          <AddTask token={token} />
          {}
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default App;
