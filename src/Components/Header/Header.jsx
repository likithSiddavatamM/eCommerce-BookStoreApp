import React from "react"
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import './Header.scss'
import a from '../../Assets/education.svg'
export default () => {

  return (
    <header className="header">
      <div style={{display:"flex", gap:"1em"}}>
      <div className="logo">
          <img src={a} alt="Logo" className="logo-image" />
          Bookstore
      </div>
      <input type="text" placeholder="Search" className="search-bar" />
      </div>
      

      <div className="user-actions">
        <div className="icon">
          <AccountCircleIcon style={{ fontSize: "1.5em", cursor: "pointer" }} />
          <span className="label">Profile</span>
        </div>
        <div className="icon">
          <ShoppingCartIcon style={{ fontSize: "1.5em", cursor: "pointer" }} />
          <span className="label">Cart</span>
        </div>
      </div>
    </header>
  )
}