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
        <Link className="btn-primary" href={"/register"}>Sign In</Link>
      </div>
    </div>
  )
}