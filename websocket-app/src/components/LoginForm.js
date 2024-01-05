// LoginForm.jsx
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        const response = await fetch('http://localhost:8088/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            console.log('Login successful');
            // Redirect to /home upon successful login
            navigate('/client-list');
        } else {
            console.error('Invalid credentials');
            setError('Invalid credentials. Please check your username and password.');
        }
    };

    return (
        <div className="background-image">
        <div className="container mt-1 d-flex justify-content-center align-items-center card-container">
            <div className="card p-3 col-5">
                <h2 className="text-center mb-5">Login</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="mb-3">
                    <label className="form-label">Username:</label>
                    <input
                        type="text"
                        className={`form-control ${error && 'is-invalid'}`}
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                            setError('');
                        }}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password:</label>
                    <input
                        type="password"
                        className={`form-control ${error && 'is-invalid'}`}
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setError('');
                        }}
                    />
                </div>
                <button className="btn btn-primary" onClick={handleLogin}>
                    Login
                </button>
            </div>
        </div>
        </div>
    );
};

export default LoginForm;
