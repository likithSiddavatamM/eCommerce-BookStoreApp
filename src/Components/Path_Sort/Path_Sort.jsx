import React from "react";
import './Path_Sort.scss'
import { useLocation, useNavigate } from "react-router-dom";

export default () => {
    const location = useLocation();
    const navigate = useNavigate();
    let path = location.pathname.match(/^\/[^\/]*/)[0];
  
    let onChangePath = () => {
      switch (path) {
        case "/":
          return "";
        case "/cart":
          return " My Cart";
        case "/book":
          return " Book";
        case "/wishlist":
          return " My Wishlist";
        case "/userprofile":
          return " Profile";
        case "/orders":
          return " My Order";
        case "/admin":
          return " Admin";
        default:
          return "";
      }
    };
  
    return (
      <div className="container">
        <span
          className={`text ${path === '/' ? 'large' : 'small'}`}
          onClick={() => navigate('/')}
        >
          {path !== '/' ? "Home /" : "Books"}
          <span>{onChangePath()}</span>
        </span>
        <span className="separator"></span>
      </div>
    );
  };