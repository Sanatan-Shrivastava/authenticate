import React from 'react'
import './home.css'
import { Link } from "react-router-dom";

function Home() {
    return (
      <div className="home_page">
        <h1>Hi, Welcome to Stige Authentication Gateway!</h1>
        <br />
        <br />
        <br />
        <br />
        <h1>Click on Sign in to Register/Login</h1>
        <br />
        <br />
        <Link to="/login">
          <i className="fas fa-user"></i> Sign in
        </Link>
      </div>
    );
}

export default Home
