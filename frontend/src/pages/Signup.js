import React, { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/api/auth/signup', form);
      console.log(API);
      navigate('/login');
    } catch (err) {
      alert('Signup failed');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row min-vh-100">
      <h2 className="text-center m-0 mt-0 order-0 align-self-center justify-self-center">Create Your Account</h2>
        <div className="col-md-6 order-1 order-md-0 m-0 p-0" >
          <div className="card shadow-md border-0 rounded-4 m-0 p-5 w-100" >
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
                  placeholder="Enter a secure password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                />
              </div>

              <button className="btn btn-primary w-100">Signup</button>
            </form>
          </div>
        </div>

        <div className="col-md-6 order-0 order-md-1 m-0" >
          <img
            src="https://static.vecteezy.com/system/resources/previews/003/689/228/non_2x/online-registration-or-sign-up-login-for-account-on-smartphone-app-user-interface-with-secure-password-mobile-application-for-ui-web-banner-access-cartoon-people-illustration-vector.jpg"
            alt="Signup Illustration"
            className="img-fluid"
          />
        </div>
      </div>
    </div>

  );
};

export default Signup;