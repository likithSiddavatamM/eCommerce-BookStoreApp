import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import logo from "../../Assets/2766594.png";
import "./LoginSignup.scss";
import { loginUser, registerUser } from "../../App/UserSlice";
import { useDispatch , useSelector} from "react-redux";
import { login } from "../../App/AuthSlice";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  maxWidth: 1000,
  bgcolor: "transparent",
  border: "none",
  borderRadius: "10px",
  p: 4,
};

const LoginSignup = ({ onClose }) => {
  const [open, setOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const dispatch = useDispatch();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { error } = useSelector((state) => state.user);

  const handleToggle = () => {
    setIsLogin(!isLogin);
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.", { theme: "colored" });
      return;
    }
    if (password.trim() === "") {
      toast.error("Password cannot be empty.", { theme: "colored" });
      return;
    }

    dispatch(loginUser({ email, password }))
    .unwrap()
    .then(() => {
      dispatch(login())
      toast.success("Login Successful!", { theme: "colored" });
      onClose();
    })
    .catch((err) => {
      toast.error(err || "Login failed.", { theme: "colored" });
    });
};
 

  const handleSignup = (e) => {
    e.preventDefault();
    if (firstName.trim() === "") {
      toast.error("Firstname fields cannot be empty.", { theme: "colored" });
      return;
    }
    if (lastName.trim() === "") {
      toast.error("Lastname fields cannot be empty.", { theme: "colored" });
      return;
    }
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.", { theme: "colored" });
      return;
    }
    if (password.trim() === "") {
      toast.error("Password cannot be empty.", { theme: "colored" });
      return;
    }
    
    dispatch(registerUser({ firstName, lastName, email, password }))
    .unwrap()
    .then(() => {
      toast.success("User registered successfully!", { theme: "colored" });
      handleToggle(); 
    })
    .catch((err) => {
      toast.error(err || "Signup failed.", { theme: "colored" });
    });
};

  return (
    <div>
      <Modal open={true}   onClose={onClose}>
        <Box sx={modalStyle}>
        <div className="loginsignup-container">
            <div className="loginsignup-image-card">
                <img
                    src={logo}
                    alt="Online Book Shopping"
                    className="loginsignup-image"
                />
                <p className="loginsignup-caption">ONLINE BOOK SHOPPING</p>
            </div>

            <div className="loginsignup-form-card">
                <div className="loginsignup-tabs">
                    <span 
                        className={`loginsignup-tab ${isLogin ? "active" : ""}`} 
                        onClick={() => handleToggle()}
                    >
                        LOGIN
                    </span>
                    <span 
                        className={`loginsignup-tab ${!isLogin ? "active" : ""}`} 
                        onClick={() => handleToggle()}
                    >
                        SIGNUP
                    </span>
                </div>
                <div className="loginsignup-form">
                    {isLogin ? (
                        <form>
                        <label>Email Id</label>
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                        {error && !validateEmail(email) && (
                            <span className="error-message">Please enter a valid email address.</span>
                        )}<br/>
                        <label>Password</label>
                        <input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                        {error && password.trim() === "" && (
                            <span className="error-message">Password cannot be empty.</span>
                        )}<br/>
                        <button type="submit" className="loginsignup-form-button" onClick={handleLogin}>Login</button>
                        <div className="forgot-password-container">
                            <a 
                                href="http://localhost:3000/ForgotPassword" 
                                className="forgot-password-link"
                            >
                                Forgot Password?
                            </a>
                        </div>
                    
                        <div className="or-container">
                            <span className="or-line"></span>
                            <span className="or-text">OR</span>
                            <span className="or-line"></span>
                        </div>
                    
                        <div className="social-buttons">
                            <button className="social-btn facebook-btn">Facebook</button>
                            <button className="social-btn google-btn">Google</button>
                        </div>
                    </form>
                    
                    ) : (
                        <form >
                            <label>First Name</label>
                            <input type="text" value={firstName}  onChange={(e) => setFirstName(e.target.value)}/>
                            {error && firstName.trim() === "" && (
                                <span className="error-message">First Name cannot be empty.</span>
                            )}<br/>
                            <label>Last Name</label>
                            <input type="text" value={lastName}  onChange={(e) => setLastName(e.target.value)}/>
                            {error && lastName.trim() === "" && (
                                <span className="error-message">Last Name cannot be empty.</span>
                            )}<br/>
                            <label>Email Id</label>
                            <input 
                                type="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                            />
                            {error && !validateEmail(email) && (
                                <span className="error-message">Please enter a valid email address.</span>
                            )}<br/>
                            <label>Password</label>
                            <input 
                                type="password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                            />
                            {error && password.trim() === "" && (
                                <span className="error-message">Password cannot be empty.</span>
                            )}<br/>
                            <button type="submit" className="loginsignup-form-button" onClick={handleSignup}>Signup</button>
                        </form>
                    )}
                </div>
            </div>
        </div>
     
        </Box>
      </Modal>

      <ToastContainer
            position="bottom-center"
            autoClose={4000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover={false}
            theme="colored"
            transition={Bounce}
            />
    </div>
  );
};

export default LoginSignup;



