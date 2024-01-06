import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';

const EditClient = () => {
  const { id } = useParams();
  const [client, setClient] = useState({ nom: '', age: '' });
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8088/clients/${id}`)
        .then(response => {
          setClient(response.data);
        })
        .catch(error => console.error('Error fetching client details', error));
    }
  }, [id]);

  const handleInputChange = (e) => {
    setClient((prevClient) => ({
      ...prevClient,
      [e.target.name]: e.target.value,
    }));
  };

  const handleEditClient = () => {
    if (id) {
      axios.put(`http://localhost:8088/clients/${id}`, client)
        .then(response => {
          console.log('Client updated successfully', response);
          navigate('/client-list');
        })
        .catch(error => console.error('Error editing client', error));
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/home">Microservice App</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/home">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/add-client">Add Client</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/client-list">Client List</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/voiture-list">Voiture List</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container mt-3 col-8">
        <h2>Edit Client</h2>
        <div className="mb-3">
          <label className="form-label">Nom:</label>
          <input
            type="text"
            className="form-control"
            name="nom"
            value={client.nom}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Age:</label>
          <input
            type="text"
            className="form-control"
            name="age"
            value={client.age}
            onChange={handleInputChange}
          />
        </div>
        <button className="btn btn-primary" onClick={handleEditClient}>Update Client</button>
      </div>
    </div>
  );
};

export default EditClient;
