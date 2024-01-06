import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddVoiture = () => {
  const [voiture, setVoiture] = useState({
    id: 0,
    marque: '',
    matricule: '',
    model: '',
    client: { id: 0, nom: '', age: 0.0 },
  });
  const [errors, setErrors] = useState({});
  const [clients, setClients] = useState([]);
  const [client, setClient] = useState({ id: 0, nom: '', age: 0.0 });

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:8088/clients')
      .then((response) => setClients(response.data))
      .catch((error) => console.error('Error fetching clients', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVoiture((prevVoiture) => ({
      ...prevVoiture,
      [name]: value,
    }));
    setErrors({ ...errors, [name]: '' });
  };

  const handleInputChange1 = (e) => {
    const selectedClientId = e.target.value;
    const selectedClient = clients.find((client) => client.id === parseInt(selectedClientId));
    setClient(selectedClient);
    console.log(clients.find((client) => client.id === parseInt(selectedClientId)))
    voiture.client = clients.find((client) => client.id === parseInt(selectedClientId));
    console.log(voiture.client.id)

  };

  const validateForm = () => {
    const newErrors = {};

    if (!voiture.matricule.trim()) {
      newErrors.matricule = 'Matricule is required';
    }

    return newErrors;
  };

  const handleAddVoiture = (e) => {
    e.preventDefault();

    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }


    axios
      .post('http://localhost:8089/voitures', voiture)
      .then((response) => {
        console.log('Voiture added successfully');
        navigate('/voiture-list');
      })
      .catch((error) => console.error('Error adding voiture', error));
  };

  return (
    <div className="container mt-3">
      <div className="mb-3">
        <label className="form-label">id:</label>
        <input
          type="text"
          className={`form-control ${errors.matricule ? 'is-invalid' : ''}`}
          name="id"
          value={voiture.id}
          onChange={handleInputChange}
          required
        />
        {errors.matricule && <div className="invalid-feedback">{errors.matricule}</div>}
      </div>
      <div className="mb-3">
        <label className="form-label">Matricule:</label>
        <input
          type="text"
          className={`form-control ${errors.matricule ? 'is-invalid' : ''}`}
          name="matricule"
          value={voiture.matricule}
          onChange={handleInputChange}
          required
        />
        {errors.matricule && <div className="invalid-feedback">{errors.matricule}</div>}
      </div>
      <div className="mb-3">
        <label className="form-label">Marque:</label>
        <input
          type="text"
          className={`form-control`}
          name="marque"
          value={voiture.marque}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Model:</label>
        <input
          type="text"
          className={`form-control`}
          name="model"
          value={voiture.model}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Client:</label>
        <select
          className={`form-select ${errors.client ? 'is-invalid' : ''}`}
          name="client"
          value={client.id}
          onChange={handleInputChange1}
        >
          <option value="">Select a client</option>
          {clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.nom}
            </option>
          ))}
        </select>
        {errors.client && <div className="invalid-feedback">{errors.client}</div>}
      </div>
      <button className="btn btn-outline-success" onClick={(e) => handleAddVoiture(e)}>
        Add voiture
      </button>
    </div>
  );
};

export default AddVoiture;
