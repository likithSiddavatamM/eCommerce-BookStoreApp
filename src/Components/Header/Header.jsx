import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ShoppingCart } from 'lucide-react';
import { useLocation, useNavigate } from "react-router-dom";
import { fetchUserDetails, fetchOrders ,logout } from "../../App/UserSlice";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { Box, Avatar, Menu, MenuItem } from "@mui/material";
import "./Header.scss";
import bookStore from "../../Assets/education.svg";
import LoginSignup from "../LoginSignup/LoginSignup";
import { setValue, setPage } from "../../App/BookContainerSlice";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let location = useLocation();
  let nav = useNavigate();
  let search;

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const userDetails = useSelector((state) => state.user.userDetails);
  const cartItems = useSelector((state) => state.cart.items  || []);

  useEffect(() => {
    if (isAuthenticated && !userDetails) {
      dispatch(fetchUserDetails());
      dispatch(fetchOrders());
    }
  }, [isAuthenticated, userDetails, dispatch]);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleMenuClose();
  };

  const handleUserProfile = async () => {
    navigate("/userprofile");
    handleMenuClose();
  };

  const handleMenuItemClick = (action) => {
    action();
    handleMenuClose();
  };

  const handleCartClick = () => {
    navigate("/cart");
  };

  const isAdmin = userDetails?.role === "admin";

  return (
    <>
      <header className="header">
        {isAdmin ? (
          <div className="user-header">
          <div style={{ display: "flex", gap: "1em", width: "100%" }}>
            <div className="logo" onClick={() =>{ navigate("/");  dispatch(setPage(1)) }}>
              <img src={bookStore} alt="Logo" className="logo-image" />
              Bookstore
            </div>
          </div>
          <div className="user-actions">
          <div className="icon">
            <Box sx={{ display: "flex", flexDirection:"column" ,alignItems: "center", gap: 1 }}>
              <Avatar
                alt={userDetails?.firstName || "Profile"}
                src={userDetails?.profilePicture || ""}
                sx={{ width: 27, height: 27, cursor: "pointer" }}
                onClick={handleMenuOpen}
              />
              <span className="label">{userDetails?.firstName || "Profile"}</span>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
              >
                    
                      {isAuthenticated ? (
                        <>
                          <MenuItem onClick={handleUserProfile}>Profile</MenuItem>
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
                            <button className="header-login-btn" onClick={toggleModal}>
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
                        </>
                      )}
                    </Menu>
                  </Box>
                </div>
          </div>
        </div>
          
          
        ):( 
        <div className="user-header">
          <div style={{ display: "flex", gap: "1em", width: "100%" }}>
            <div className="logo" onClick={() =>{ navigate("/");  dispatch(setPage(1)) }}>
              <img src={bookStore} alt="Logo" className="logo-image" />
              Bookstore
            </div>
            <input type="text" placeholder="Search" className="search-bar" onChange={
              (e) => {
              const value = e.currentTarget.value
              clearTimeout(search);
              search = setTimeout(() => {dispatch(setValue(/^[a-zA-Z0-9 ]+$/.test(value) ? value : "")); dispatch(setPage(1))}, 750);
              location.pathname!="/"&&nav("/");
              }}/>
          </div>
          <div className="user-actions">
          <div className="icon">
            <Box sx={{ display: "flex", flexDirection:"column" ,alignItems: "center", gap: 1 }}>
              <Avatar
                alt={userDetails?.firstName || "Profile"}
                src={userDetails?.profilePicture || ""}
                sx={{ width: 27, height: 27, cursor: "pointer" }}
                onClick={handleMenuOpen}
              />
              <span className="label">{userDetails?.firstName || "Profile"}</span>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
              >
                    
                      {isAuthenticated ? (
                        <>
                          <MenuItem onClick={handleUserProfile}>Profile</MenuItem>
                          <MenuItem
                            onClick={() => handleMenuItemClick(() => navigate("/orders"))}
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
                            onClick={() => handleMenuItemClick(() => navigate("/wishlist"))}
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
                            <button className="header-login-btn" onClick={toggleModal}>
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
                            onClick={() => handleMenuItemClick(() => navigate("/orders"))}
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
                            onClick={() => handleMenuItemClick(() => navigate("/wishlist"))}
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

                <div className="icon cart-icon" onClick={handleCartClick}>
                  <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
                    <ShoppingCart className="shopping-cart-icon" sx={{ width: 30, height: 30, cursor: "pointer" }} />
                    {cartItems.length > 0 && (
                      <span className="cart-badge">{cartItems.length}</span>
                    )}
                    <span className="label">Cart</span>
                  </Box>
                </div>
          </div>
        </div>
          )}
      </header>
    </>
  );
};

export default Header;