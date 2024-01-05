// App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import HomeComponent from './components/HomeComponent';
import AddClient from './components/AddClient';
import EditClient from './components/EditClient';
import ClientList from './components/ClientList';
const App = () => {
    const [authenticated, setAuthenticated] = useState(false);

    const handleLogin = () => {
        // Implement your authentication logic here
        // For simplicity, just set authenticated to true
        setAuthenticated(true);
    };

    return (
        <Router>
        
            <Routes>
                <Route
                    path="/"
                    element={
                        authenticated ? (
                            <Navigate to="/client-list" />
                        ) : (
                            <LoginForm onLogin={handleLogin} />
                        )
                    }
                />
                <Route path="/home" element={<HomeComponent />} />
                <Route path="/add-client" element={<AddClient />} />
                <Route path="/edit-client/:id" element={<EditClient />} />
                <Route path="/client-list" element={<ClientList />} />
            </Routes>
        </Router>
    );
};

export default App;
