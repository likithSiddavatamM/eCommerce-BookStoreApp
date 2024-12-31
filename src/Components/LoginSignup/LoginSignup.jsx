import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import logo from "../../Assets/2766594.png";
import "./LoginSignup.scss";
import { loginApiCall } from '../../Api';
import { signupApiCall } from '../../Api';
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
  const [error, setError] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleToggle = () => {
    setIsLogin(!isLogin);
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setError("");
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.trim() === "") {
      setError("Password cannot be empty.");
      return;
    }

    loginApiCall({email,password},`users/login`)
     
    .then((result)=>{

     const {data}=result
     console.log(result);
     localStorage.setItem('accessToken',data.data.accessToken)
     console.log(data.data.accessToken);
     toast.success("Login Successfully !!", {
      position: "bottom-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
    setTimeout(() => {
      onClose()
  }, 2000); 

  console.log(data.message)
  console.log(data.user)
   
    })
    .catch((error)=>{
        console.log(error)
        toast.error(error.message, {
          position: "bottom-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
    })
    setError("");
    alert("Login Successful!");
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (firstName.trim() === "") {
      setError("First Name cannot be empty.");
      return;
    }
    if (lastName.trim() === "") {
      setError("Last Name cannot be empty.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.trim() === "") {
      setError("Password cannot be empty.");
      return;
    }
    
    signupApiCall({firstName,lastName,email,password},`users`)
    .then((result)=>{ 
    const {data}=result
        if(data.message==="User registered successfully"){
            toast.success("User Successfully Created!!", {
                position: "bottom-center",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
              });
        }
        else{
            toast.error("User Not Created!", {
                position: "bottom-center",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
              });
        }
    })
    .catch((error)=>{
    console.log(error)
    toast.error("Server Error!!", {
        position: "bottom-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    })

    setError("");
    alert("Signup Successful!");
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
                        <form >
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



