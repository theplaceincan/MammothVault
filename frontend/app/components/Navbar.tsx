'use client';
import Image from "next/image";
import "../css/Navbar.css"
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [logoIsHovered, setLogoIsHovered] = useState(false);

  return (
    <div className="navbar-container">
      <div className="navbar-logo">
        <div onMouseEnter={() => setLogoIsHovered(true)} onMouseLeave={() => setLogoIsHovered(false)}>
          <Link href={"/"}>
            <Image className="logo-img" width={60} height={70} src={logoIsHovered ? "/logos/white.png" : "/logos/standard.jpg"} alt="MammothVault Logo" />
          </Link>
        </div>
      </div>
      <div className="navbar-btns">
        <Link className="navbar-btn" href={"/products"}>Shop</Link>
        <Link className="navbar-btn" href={"/about"}>About</Link>
        <Link className="navbar-btn"href={"/contact"}>Contact Us</Link>
      </div>
      <div className="navbar-right">
        <Link className="navbar-btn" href={"/products"}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
        </Link>
      </div>
    </div>
  )
}