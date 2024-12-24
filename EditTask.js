import React, { useState, useEffect } from 'react';
import axios from '../api';

const EditTask = ({ token, taskId, onClose }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/tasks/${taskId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const { name, description, dueDate } = response.data;
        setName(name);
        setDescription(description);
        setDueDate(dueDate);
      } catch (error) {
        console.error('Error fetching task:', error);
      }
    };

    fetchTask();
  }, [taskId, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/tasks/${taskId}`,
        { name, description, dueDate },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onClose();
      alert('Task updated successfully');
    } catch (error) {
      console.error('Error updating task:', error);
      alert('Failed to update task');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Task</h2>
      <label>Task Name:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <label>Description:</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      ></textarea>
      <label>Due Date:</label>
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        required
      />
      <button type="submit">Update Task</button>
      <button type="button" onClick={onClose}>Cancel</button>
    </form>
  );
};

export default EditTask;
