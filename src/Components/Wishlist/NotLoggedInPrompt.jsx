import React, { useState } from "react";
import { ShoppingBag } from 'lucide-react';
import LoginSignup from "../LoginSignup/LoginSignup";
import "./NotLoggedInPrompt.scss";

const NotLoggedInPrompt = ({ message, iconSize = 64 }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="not-logged-in">
      <ShoppingBag size={iconSize} className="not-logged-in-icon" />
      <h2>Please login</h2>
      <p>{message}</p>
      <button className="login-btn" onClick={toggleModal}>
        Login
      </button>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <LoginSignup onClose={toggleModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default NotLoggedInPrompt;
