import React, { useState } from "react";
import './Path_Sort.scss'
import { useLocation, useNavigate } from "react-router-dom";
import { InputLabel, MenuItem, Select } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setSort } from "../../App/BookContainerSlice";

export default () => {
    const location = useLocation();
    const navigate = useNavigate();
    let dispatch = useDispatch();
    let path = location.pathname.match(/^\/[^\/]*/)[0];
    let sort = useSelector(state => state.bookContainer.sort)
    const [selectedValue, setSelectedValue] = useState(parseInt(localStorage.getItem('sort')) || 0);
    const handleChange = (event) => {
      setSelectedValue(event.target.value);
    };
  
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
        <span className="sort">
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedValue}
            onChange={handleChange}
            className="Select"
          >
            <MenuItem className="Select" value={1} onClick={()=>dispatch(setSort(1))}>Price : Low to High</MenuItem>
            <MenuItem className="Select" value={-1} onClick={()=>dispatch(setSort(-1))}>Price : High to Low</MenuItem>
            <MenuItem className="Select" value={0} onClick={()=>dispatch(setSort(0))}>Sort by Revelence</MenuItem> 
            
          </Select>
        </span>
      </div>
    );
  };