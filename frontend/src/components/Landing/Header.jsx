import React, { useState } from "react";
import { Link } from "react-router-dom";
import arrow from "../../assets/svg/arrow.svg";
import logo from "../../assets/image/logo.png";

export default function Header() {
  const [showText, setShowText] = useState(false);

  const handleAboutClick = (event) => {
    event.preventDefault(); // Prevent default link behavior
    setShowText(!showText); // Toggle the text visibility
  };

  return (
    <header className="flex fixed z-50 justify-center w-full pt-10">
      <nav className="w-[490px] rounded-3xl h-12 border px-4 flex items-center border-[#114124] bg-lime-100 bg-opacity-15">
        <ul className="flex gap-x-9 items-center text-[#f0fff1] text-opacity-1 w-full">
          <li>
            <Link to="/" aria-label="Home">
              <img src={logo} className="w-9 h-9" alt="Logo" />
            </Link>
          </li>
          <li>
            <a href="/#" className="hover:underline hover:underline-offset-4">
              Home
            </a>
          </li>
          <li>
            <Link
              to="/about"
              className="hover:underline hover:underline-offset-4"
              onClick={handleAboutClick} // Add the click handler
            >
              About
            </Link>
          </li>
          <li>
            <a href="/#feature" className="hover:underline hover:underline-offset-4">
              Features
            </a>
          </li>
          <li className="ml-auto">
            <Link 
              to="/login" 
              className="text-center justify-center px-3 py-1 flex bg-gradient-to-br from-black to-green-900 rounded-3xl bg-opacity-1 items-center gap-x-1 w-full max-w-[24] hover:transition-transform hover:scale-110"
            >
              <span>Get Started</span>
              <img src={arrow} alt="" className="-rotate-90 h-5 w-5" />
            </Link>
          </li>
        </ul>
      </nav>

      {showText && (
        <div className="about-text mt-4 mx-auto w-[490px] text-center bg-lime-100 p-4 border border-[#114124] rounded-md shadow-lg">
          <p>This project was submitted during Microsoft/Rag_Hack hackathon On September 2024</p>
        </div>
      )}
    </header>
  );
}
