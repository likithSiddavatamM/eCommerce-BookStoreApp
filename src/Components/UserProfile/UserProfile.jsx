import React, { useState } from "react";
import "./UserProfile.scss";
import profilepic from '../../assets/shreya-image.png'


const UserProfile = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedType, setSelectedType] = useState("");

  const handleModalOpen = () => setShowModal(true);
  const handleModalClose = () => setShowModal(false);

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value); 
  };

  return (
    <div className="profile-className-container">
      <div className="profile-className-section">
        <div className="profile-className-header">
          <h2 className="profile-className-title">Personal Details</h2>
          <button className="profile-className-edit-btn">Edit</button>
        </div>

        <div className="profile-className-profile-image-container">
          <div className="profile-className-profile-image">
            <img
              src={profilepic}
              className="profile-className-profile-picture"
              onClick={handleModalOpen}
            />
            
          </div>
          
        </div>
        <div className="profile-className-fields">
          <div className="profile-className-field">
            <label>First Name</label>
            <input type="text" />
          </div>
          <div className="profile-className-field">
            <label>Last Name</label>
            <input type="text" />
          </div>
        </div>
        <div className="profile-className-field">
          <label>Email ID</label>
          <input type="email" />
        </div>
        <div className="profile-className-field">
          <label>Password</label>
          <input type="password" />
        </div>
        <div className="profile-className-field">
          <label>Mobile Number</label>
          <input type="tel" />
        </div>
      </div>

      <div className="profile-className-section">
        <div className="profile-className-header">
          <h2 className="profile-className-title">Address Details</h2>
          <button className="profile-className-add-btn">Add New Address</button>
        </div>
      </div>

      <div className="profile-className-section">
        <div className="profile-className-header">
          <h2 className="profile-className-title">Work</h2>
          <button className="profile-className-edit-btn">Edit</button>
        </div>
        <div className="profile-className-field">
          <label>Address</label>
          <textarea></textarea>
        </div>
        <div className="profile-className-fields">
          <div className="profile-className-field">
            <label>City/Town</label>
            <input type="text" />
          </div>
          <div className="profile-className-field">
            <label>State</label>
            <input type="text" />
          </div>
        </div>
      </div>
  
       <div className="profile-className-section">
          <h2 className="profile-className-title">Types</h2>
          <div className="profile-className-radio-buttons">
            <label className={`profile-className-radio-button ${selectedType === "home" ? "selected" : ""}`}>
              <input
                type="radio"
                name="type"
                value="home"
                checked={selectedType === "home"}
                onChange={handleTypeChange}
              />
              Home
            </label>
            <label className={`profile-className-radio-button ${selectedType === "work" ? "selected" : ""}`}>
              <input
                type="radio"
                name="type"
                value="work"
                checked={selectedType === "work"}
                onChange={handleTypeChange}
              />
              Work
            </label>
            <label className={`profile-className-radio-button ${selectedType === "other" ? "selected" : ""}`}>
              <input
                type="radio"
                name="type"
                value="other"
                checked={selectedType === "other"}
                onChange={handleTypeChange}
              />
              Other
            </label>
          </div>
      </div>
    
      {showModal && (
        <div className="profile-className-modal-overlay">
          <div className="profile-className-modal">
            <button className="profile-className-modal-close" onClick={handleModalClose}>
              &times;
            </button>
            <div className="profile-className-modal-content">
              <label htmlFor="upload-image" className="profile-className-upload-label">
                <i className="profile-className-cloud-icon">&#8682;</i>
                <p>Upload Image</p>
              </label>
              <input type="file" id="upload-image" className="profile-className-file-input" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;

