import React, { useState } from "react";
import axios from "axios";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaHome,
  FaMoneyBillWave,
  FaHistory,
  FaHeart,
  FaUsers,
  FaCity,
  FaMapMarkerAlt,
} from "react-icons/fa";

const initialState = {
  name: "",
  email: "",
  password: "",
  phone: "",
  residenceType: "",
  monthlyIncome: "",
  previousLoan: "",
  maritalStatus: "",
  numberOfDependents: "",
  city: "",
  state: "",
};

const Signup = () => {
  const [form, setForm] = useState(initialState);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showMsg, setShowMsg] = useState(false);

  const handleChange = (e) => {
  const { name, value } = e.target;

  // Convert "true"/"false" string to boolean for previousLoan
  if (name === 'previousLoan') {
    setForm((prev) => ({
      ...prev,
      [name]: value === 'true',  // "true" => true, "false" => false
    }));
  } else {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setShowMsg(false);

    if (!form.name || !form.email || !form.password) {
      setError("Name, Email, and Password are required");
      setShowMsg(true);
      return;
    }

    try {
      const res = await axios.post("https://demo-yt1z.onrender.com/api/auth/register", form);
      setMessage(res.data.message || "User registered successfully");
      localStorage.setItem("token", res.data.token);
      setForm(initialState);
      setShowMsg(true);
    } catch (err) {
      setError(err.response?.data?.message || "Error registering user");
      setShowMsg(true);
    }
  };

  const closePopup = () => {
    setShowMsg(false);
    setMessage("");
    setError("");
  };

  return (
    <>
      {/* Popup Modal */}
      {showMsg && (
        <div className="popup-overlay">
          <div className={`popup-message ${message ? "success-popup" : "error-popup"}`}>
            <p>{message || error}</p>
            <button className="btn-ok" onClick={closePopup}>
              OK
            </button>
          </div>
        </div>
      )}

      {/* Signup Form */}
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="mb-3 input-group">
          <span className="input-group-text bg-primary text-white">
            <FaUser />
          </span>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter your name*"
          />
        </div>

        <div className="mb-3 input-group">
          <span className="input-group-text bg-primary text-white">
            <FaEnvelope />
          </span>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter your email*"
          />
        </div>

        <div className="mb-3 input-group">
          <span className="input-group-text bg-primary text-white">
            <FaLock />
          </span>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter your password*"
          />
        </div>

        <div className="mb-3 input-group">
          <span className="input-group-text bg-primary text-white">
            <FaPhone />
          </span>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="form-control"
            placeholder="Phone number"
          />
        </div>

        <div className="mb-3 input-group">
          <span className="input-group-text bg-primary text-white">
            <FaHome />
          </span>
          <select
            name="residenceType"
            value={form.residenceType}
            onChange={handleChange}
            className="form-select"
          >
            <option value="">Select residence type</option>
            <option value="Owned">Owned</option>
            <option value="Rented">Rented</option>
            <option value="Company Provided">Company Provided</option>
          </select>
        </div>

        <div className="mb-3 input-group">
          <span className="input-group-text bg-primary text-white">
            <FaMoneyBillWave />
          </span>
          <input
            type="number"
            name="monthlyIncome"
            value={form.monthlyIncome}
            onChange={handleChange}
            className="form-control"
            placeholder="Monthly income"
          />
        </div>

        <div className="mb-3 input-group">
          <span className="input-group-text bg-primary text-white">
            <FaHistory />
          </span>
          <select
              name="previousLoan"
              value={form.previousLoan}
              onChange={handleChange}
              className="form-control"
              
           >
             <option value="">Previous Loan</option>
             <option value="true">Yes</option>
             <option value="false">No</option>
           </select>

        </div>

        <div className="mb-3 input-group">
          <span className="input-group-text bg-primary text-white">
            <FaHeart />
          </span>
          <select
            name="maritalStatus"
            value={form.maritalStatus}
            onChange={handleChange}
            className="form-select"
          >
            <option value="">Select marital status</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
            <option value="Divorced">Divorced</option>
            <option value="Widowed">Widowed</option>
          </select>
        </div>

        <div className="mb-3 input-group">
          <span className="input-group-text bg-primary text-white">
            <FaUsers />
          </span>
          <input
            type="number"
            name="numberOfDependents"
            value={form.numberOfDependents}
            onChange={handleChange}
            className="form-control"
            placeholder="Number of dependents"
            min="0"
          />
        </div>

        <div className="mb-3 input-group">
          <span className="input-group-text bg-primary text-white">
            <FaCity />
          </span>
          <input
            type="text"
            name="city"
            value={form.city}
            onChange={handleChange}
            className="form-control"
            placeholder="City"
          />
        </div>

        <div className="mb-3 input-group">
          <span className="input-group-text bg-primary text-white">
            <FaMapMarkerAlt />
          </span>
          <input
            type="text"
            name="state"
            value={form.state}
            onChange={handleChange}
            className="form-control"
            placeholder="State"
          />
        </div>

        <button
          type="submit"
          className="btn btn-gradient w-100 fw-bold py-2 fs-5 mt-3"
        >
          Register
        </button>
      </form>
    </>
  );
};

export default Signup;
