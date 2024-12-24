import React, { useState } from 'react';
import axios from '../api';

const AddTask = ({ token }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        '/tasks',
        { name, description, dueDate },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setName('');
      setDescription('');
      setDueDate('');
      alert('Task added successfully');
    } catch (error) {
      console.error('Error adding task:', error);
      alert('Failed to add task');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Task</h2>
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
      <button type="submit">Add Task</button>
    </form>
  );
};

export default AddTask;
