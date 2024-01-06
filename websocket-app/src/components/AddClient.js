import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddClient = () => {
  const [client, setClient] = useState({ id: 99, nom: '', age: 0.0 });
  const [clients, setClients] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setClient({ ...client, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); // Clear the error when the input changes
  };


  const validateForm = () => {
    const newErrors = {};

    if (!client.nom.trim()) {
      newErrors.nom = 'Nom is required';
    }


    return newErrors;
  };

  const handleAddClient = (e) => {
  e.preventDefault(); // Prevent the default form submission behavior

  const newErrors = validateForm();

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  axios.post('http://localhost:8088/clients', client)
    .then(response => {
      console.log('Client added successfully');
      // Redirect to the client list after adding
      navigate('/client-list');

    })
    .catch(error => console.error('Error adding client', error));
};


  return (
    <div className="container mt-3">
      <div className="mb-3">
        <label className="form-label">Nom:</label>
        <input
          type="text"
          className={`form-control ${errors.nom ? 'is-invalid' : ''}`}
          name="nom"
          value={client.nom}
          onChange={handleInputChange}
          required
        />
        {errors.nom && <div className="invalid-feedback">{errors.nom}</div>}
      </div>
      <div className="mb-3">
        <label className="form-label">Age:</label>
        <input
          type="text"
          className={`form-control ${errors.age ? 'is-invalid' : ''}`}
          name="age"
          value={client.age}
          onChange={handleInputChange}
        />
        {errors.age && <div className="invalid-feedback">{errors.age}</div>}
      </div>
      <button className="btn btn-outline-success" onClick={(e) => handleAddClient(e)}>
    Add Client
    </button>
    </div>
  );
};

export default AddClient;
