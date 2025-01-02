import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../App/AuthSlice";
import { fetchUserDetails, fetchCustomerDetails } from "../../App/UserSlice";
import { ShoppingCart } from "lucide-react";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { Box, Avatar, Menu, MenuItem } from "@mui/material";
import "./Header.scss";
import a from "../../Assets/education.svg";
import LoginSignup from "../LoginSignup/LoginSignup";
import { setValue, setPage } from "../../App/BookContainerSlice";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let nav = useNavigate();
  let search;

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userDetails = useSelector((state) => state.user.userDetails);
  const customerDetails = useSelector((state) => state.user.customerDetails);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchUserDetails());
      dispatch(fetchCustomerDetails());
    }
  }, [isAuthenticated, dispatch]);
  const cartItems = useSelector((state) => state.cart.items);

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
    localStorage.removeItem("accessToken");
    dispatch(logout());
  };


  const handleUserProfile = async () => {
      navigate("/userprofile")
  }

  const handleCartClick = () => {
    navigate("/cart");
  };
  return (
    <>
      <header className="header">
        <div style={{ display: "flex", gap: "1em", width: "100%" }}>
          <div className="logo" onClick={() => navigate("/")}>
            <img src={a} alt="Logo" className="logo-image" />
            Bookstore
          </div>
          <input type="text" placeholder="Search" className="search-bar" onChange={(e) => {
            const value = e.currentTarget.value
            clearTimeout(search);
            search = setTimeout(() => {dispatch(setValue(/^[a-zA-Z0-9]+$/.test(value) ? value : "")); dispatch(setPage(1))}, 750);
            nav("/");
            }}/>
        </div>
      <div className="user-actions">
        <div className="icon">
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar
              alt={userDetails?.name || "User Profile"}
              src={userDetails?.avatar || ""}
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
                  <MenuItem onClick={handleUserProfile}>
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
          <div className="icon cart-icon" onClick={handleCartClick}>
            <div className="cart-icon-wrapper">
              <ShoppingCart className="shopping-cart-icon" />
              {cartItems.length > 0 && (
                <span className="cart-badge">{cartItems.length}</span>
              )}
            </div>
            <span className="label">Cart</span>
          </div>
        </div>
      </header>
    </>
   );
}
export default Header;