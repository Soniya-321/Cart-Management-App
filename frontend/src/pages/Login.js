import React, { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/api/auth/login', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('username', res.data.username); 
      console.log(res.data.username);
      navigate('/dashboard');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div className="container mt-5">
  <div className="row min-vh-100 align-items-center justify-content-flex-start m-0">
    <h2 className="text-center m-0 text-success order-0 ">Welcome Back</h2>
    <div className="col-md-6 order-1 order-md-0 m-0 p-0">
      <div className="card shadow-md border-0 rounded-4 p-4 w-100 m-0">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              id="username"
              className="form-control border border-dark"
              placeholder="Enter your username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              id="password"
              type="password"
              className="form-control border border-dark"
              placeholder="Enter your password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>

          <button className="btn btn-success w-100">Login</button>
        </form>
      </div>
    </div>

    <div className="col-md-6 order-0 order-md-1 m-0">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQX9A5dXy1TroyyQPqIauBbN03gwOgXLjFNSjE-sKs8AyAWjmtnaWGI2L4SdcHdYbG1C20&usqp=CAU"
        alt="Login Visual"
        className="img-fluid w-100"
      />
    </div>
  </div>
</div>

  );
};

export default Login;