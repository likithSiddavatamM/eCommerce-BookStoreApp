import React, { useState, useEffect } from "react";
import "./UserProfile.scss";
import profilepic from '../../Assets/default.jpg';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { fetchUserDataApiCall, updateUserDataApiCall } from "../../Api";
import Address from "../Address/Address";
import { useDispatch, useSelector } from "react-redux";

const UserProfile = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageName, setImageName] = useState("");
  const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    profilePicture: "",
  });

  const userDetails = useSelector((state) => state.user.userDetails);

  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log("Fetching user data...");
        const data = await fetchUserDataApiCall();
        console.log("Fetched user data:", data.data.data);
        setUserData(data.data.data);
        if (data.profilePicture) {
          setSelectedImage(data.profilePicture);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleModalOpen = () => setShowModal(true);
  const handleModalClose = () => setShowModal(false);


  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImageName(`${file.name} (${file.type.split("/")[1]})`);
    }
  };

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev); 
  };

  const handleSave = async () => {
    try {
      console.log("Saving updated user data...");

      const updateData = new FormData();
      updateData.append("firstName", userDetails.firstName);
      updateData.append("lastName", userDetails.lastName);
      updateData.append("email", userDetails.email);
      
      if (selectedImage) {
        updateData.append("profilePicture", selectedImage); 
      }

      await updateUserDataApiCall(updateData); 
      console.log("User data updated successfully");
    } catch (error) {
      console.error("Error updating user data:", error);
    }
    finally{
      setIsEditing(false);
    }
  };

  const style = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <div className="profile-className-container">
      <div className="profile-className-section">
        <div className="profile-className-header">
          <h2 className="profile-className-title">Personal Details</h2>
          {!isEditing ? (
            <button className="profile-className-edit-btn" onClick={handleEditToggle}>
              Edit
            </button>
          ) : (
            <button className="profile-className-save-btn" onClick={handleSave}>
              Save
            </button>
          )}
        </div>

        <div className="profile-className-profile-image-container">
          <div className="profile-className-profile-image">
            <img
              src={selectedImage ? URL.createObjectURL(selectedImage) : userDetails?.profilePicture || profilepic}
              className="profile-className-profile-picture"
              onClick={handleModalOpen}
            />
          </div>
        </div>

        <div className="profile-className-fields">
          <div className="profile-className-field">
            <label>First Name</label>
            <input
              type="text"
              value={userDetails?.firstName}
              readOnly={!isEditing}
              onChange={(e) => setUserData((prev) => ({ ...prev, firstName: e.target.value }))}
            />
          </div>
          <div className="profile-className-field">
            <label>Last Name</label>
            <input
              type="text"
              value={userDetails?.lastName}
              readOnly={!isEditing}
              onChange={(e) => setUserData((prev) => ({ ...prev, lastName: e.target.value }))}
            />
          </div>
        </div>
        <div className="profile-className-field">
          <label>Email ID</label>
          <input type="email" value={userDetails?.email} readOnly />
        </div>
        <div className="profile-className-field">
          <label>Password</label>
          <input type="password" value="********" readOnly />
        </div>
      </div>

      <Address />

      {showModal && (
        <Modal open={showModal} onClose={handleModalClose}>
          <Box sx={style}>
            <Typography variant="h6" component="h2">
              Upload Profile Image
            </Typography>
            <Typography sx={{ mt: 2 }}>
              <label htmlFor="upload-image" className="profile-className-upload-label">
                <CloudUploadIcon fontSize="large" sx={{ height: 80, width: 75, marginLeft: 2 }} />
                <p>Click to upload</p>
              </label>
              <input
                type="file"
                id="upload-image"
                className="profile-className-file-input"
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />
            </Typography>

            {selectedImage && (
              <div className="profile-className-uploaded-image">
                <img src={URL.createObjectURL(selectedImage)} alt="Uploaded Preview" style={{ width: 100, height: 100 }} />
                <p>{imageName}</p>
              </div>
            )}

            <button className="profile-className-save-btn" onClick={handleSave}>
              Save
            </button>
            <Button onClick={handleModalClose} >
              Close
            </Button>
          </Box>
        </Modal>
      )}
    </div>
  );
};

export default UserProfile;


