import React, { useState, useEffect } from 'react';
import axios from '../api';
import EditTask from './EditTask';

const TaskList = ({ token }) => {
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/tasks', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        setTasks([]);
      }
    };
    fetchTasks();
  }, [token]);

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleEditClick = (id) => {
    setEditingTaskId(id);
  };

  const handleCloseEdit = () => {
    setEditingTaskId(null);
  };

  return (
    <div>
      <h2>Your Tasks</h2>
      {editingTaskId ? (
        <EditTask token={token} taskId={editingTaskId} onClose={handleCloseEdit} />
      ) : (
        tasks.map((task) => (
          <div key={task._id}>
            <h3>{task.name}</h3>
            <p>{task.description}</p>
            <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
            <button onClick={() => handleEditClick(task._id)}>Edit</button>
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
};

export default TaskList;
