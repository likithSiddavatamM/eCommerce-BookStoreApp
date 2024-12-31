import React, { useState ,useEffect} from "react";
import "./UserProfile.scss";
import profilepic from '../../Assets/img1.png'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { fetchUserDataApiCall } from "../../Api";



const UserProfile = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [selectedImage, setSelectedImage] = useState(null); 
  const [imageName, setImageName] = useState(""); 
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    profilePicture: "",
  });

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
      } finally {
      }
    };

    fetchUserData();
  }, []);

  const handleModalOpen = () => setShowModal(true);
  const handleModalClose = () => setShowModal(false);

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value); 
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file)); // Create an image URL to display
      setImageName(`${file.name} (${file.type.split("/")[1]})`); // Store file name with extension
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
          <button className="profile-className-edit-btn">Edit</button>
        </div>

        <div className="profile-className-profile-image-container">
          <div className="profile-className-profile-image">
            <img
              src={userData.profilePicture || profilepic}
              className="profile-className-profile-picture"
              onClick={handleModalOpen}
            />            
          </div>
          
        </div>
        <div className="profile-className-fields">
          <div className="profile-className-field">
            <label>First Name</label>
            <input type="text" value={userData.firstName} readOnly onChange={(e) => setUserData(prev => ({ ...prev, firstName: e.target.value }))}/>
          </div>
          <div className="profile-className-field">
            <label>Last Name</label>
            <input type="text"  value={userData.lastName} readOnly onChange={(e) => setUserData(prev => ({ ...prev, lastName: e.target.value }))}/>
          </div>
        </div>
        <div className="profile-className-field">
          <label>Email ID</label>
          <input type="email" value={userData.email} readOnly/>
        </div>
        <div className="profile-className-field">
          <label>Password</label>
          <input type="password" value="********" readOnly/>
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
          <label>Mobile Number</label>
          <input type="tel" />
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
        <Modal
        open={showModal}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Upload Profile Image
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <label htmlFor="upload-image" className="profile-className-upload-label">
            <CloudUploadIcon fontSize="large" sx={{ height: 80,width:75 ,marginLeft:2}}/>
              <p>Click to upload</p>
            </label>
            <input
              type="file"
              id="upload-image"
              className="profile-className-file-input"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
            />
          </Typography>

          {selectedImage && (
            <div className="profile-className-uploaded-image">
              <img src={selectedImage} alt="Uploaded Preview" style={{ width: 100, height: 100 }} />
              <p>{imageName}</p>
            </div>
          )}

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







