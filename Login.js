import React, { useState } from 'react';

const Login = ({ setAuth }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    const hardcodedUsername = 'admin123';
    const hardcodedPassword = '123';

    if (username === hardcodedUsername && password === hardcodedPassword) {
      const token = 'mock-jwt-token';
      setAuth(token);
      setError(''); 
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="login-form">
      <h2>Login</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>} {}

      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
