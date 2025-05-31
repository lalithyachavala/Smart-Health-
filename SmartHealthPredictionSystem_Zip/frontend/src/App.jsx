import React, { useState } from "react";
import "./styles.css";

function App() {
  const [formData, setFormData] = useState({
    symptoms: "",
    bp: "",
    sugar: "",
    temperature: ""
  });
  const [prediction, setPrediction] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        bp: Number(formData.bp),
        sugar: Number(formData.sugar),
        temperature: Number(formData.temperature),
        symptoms: formData.symptoms.toLowerCase()
      })
    });
    const data = await res.json();
    setPrediction(data.prediction);
  };

  return (
    <>
      <div className="container">
        <h1>Smart Health Prediction</h1>
        <form onSubmit={handleSubmit}>
          <input
            name="symptoms"
            placeholder="Symptoms (e.g. fever, cough)"
            onChange={handleChange}
            required
          />
          <input
            name="bp"
            placeholder="Blood Pressure (mm Hg)"
            type="number"
            onChange={handleChange}
            required
          />
          <input
            name="sugar"
            placeholder="Sugar Level (mg/dL)"
            type="number"
            onChange={handleChange}
            required
          />
          <input
            name="temperature"
            placeholder="Body Temperature (°F)"
            type="number"
            onChange={handleChange}
            required
          />
          <button type="submit">Predict</button>
        </form>
        {prediction && (
          <div className="result">Predicted Disease: {prediction}</div>
        )}
      </div>

      <footer>
        <div className="footer-container">
          <div className="footer-section">
            <h3>Contact Us</h3>
            <p>HospitalVibe Clinic</p>
            <p>123 Wellness Blvd, Health City, HC 45678</p>
            <p>Email: contact@hospitalvibe.com</p>
            <p>Phone: +1 (555) 123-4567</p>
          </div>
          <div className="footer-section">
            <h3>About</h3>
            <p>
              HospitalVibe is a smart health prediction system designed to assist
              patients with quick preliminary disease prediction based on symptoms.
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          &copy; 2025 HospitalVibe. All rights reserved.
        </div>
      </footer>
    </>
  );
}

export default App;

