import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../App/AuthSlice";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined"; 
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined"; 
import { Box, Avatar, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./Header.scss";
import a from "../../Assets/education.svg";
import LoginSignup from "../LoginSignup/LoginSignup";
import { fetchUserDataApiCall } from "../../Api";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
      setShowModal(!showModal);
      
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    dispatch(logout());
  };

  const handleUserData = async () => {
    try {
      const userData = await fetchUserDataApiCall();
      console.log("User Data:", userData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
 

  return (
    <header className="header">
      <div style={{ display: "flex", gap: "1em", width: "100%" }}>
        <div className="logo">
          <img src={a} alt="Logo" className="logo-image" />
          Bookstore
        </div>
        <input type="text" placeholder="Search" className="search-bar" />
      </div>
      <div className="user-actions">
        <div className="icon">
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar
              alt="User Profile"
              src=""
              sx={{ width: 30, height: 30, cursor: "pointer" }}
              onClick={handleMenuOpen}
            />
            <span className="label">Profile</span>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              {isAuthenticated ? (
                <>
                  <MenuItem onClick={handleUserData}>
                    Profile
                  </MenuItem>
                  <MenuItem
                    onClick={() => navigate("/orders")}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      fontFamily: "Roboto",
                    }}
                  >
                    <ListAltOutlinedIcon />
                    My Orders
                  </MenuItem>
                  <MenuItem
                    onClick={() => navigate("/wishlist")}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      fontFamily: "Roboto",
                    }}
                  >
                    <FavoriteBorderOutlinedIcon />
                    My Wishlist
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </>
              ) : (
                <>
                  <MenuItem
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "8px 12px",
                      margin: 0,
                      gap: "4px",
                      minHeight: "unset",
                    }}
                  >
                    <p className="header-msg-wlc">Welcome!</p>
                    <span className="header-msg">
                      To access account and manage orders
                    </span>
                    <button
                      className="header-login-btn"
                      onClick={toggleModal}
                    >
                      Login/Signup
                    </button>
                      {showModal && (
                          <div className="modal-overlay">
                              <div className="modal-content">
                                  <LoginSignup onClose={toggleModal} />
                              </div>
                          </div>
                      )}
                  </MenuItem>
                  <MenuItem
                    onClick={() => navigate("/orders")}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      fontFamily: "Roboto",
                    }}
                  >
                    <ListAltOutlinedIcon /> 
                    My Orders
                  </MenuItem>
                  <MenuItem
                    onClick={() => navigate("/wishlist")}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      fontFamily: "Roboto",
                    }}
                  >
                    <FavoriteBorderOutlinedIcon /> 
                    My Wishlist
                  </MenuItem>
                </>
              )}
            </Menu>
          </Box>
        </div>
        <div className="icon">
          <ShoppingCartIcon style={{ fontSize: "1.5em", cursor: "pointer" }} />
          <span className="label">Cart</span>
        </div>
      </div>
    </header>
  );
};


export default Header;



