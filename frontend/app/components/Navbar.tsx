'use client';
import Image from "next/image";
import "../css/Navbar.css"
import { useState } from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [logoIsHovered, setLogoIsHovered] = useState(false);
  const [totalQty, setTotalQty] = useState(0);

  const navbar_paths = ["/products", "/about", "/contact"]
  const current_path = usePathname();
  function isOnPageCheck(curr_path: string, dest_path: string) {
    console.log(curr_path)
    console.log(dest_path)
    if (curr_path == dest_path) return true;
    return false;
  }

  const cartId =
    typeof window !== 'undefined' ? localStorage.getItem('cartId') : null;
  async function getCartSize() {
    if (!cartId) { return; }
    const res = await fetch(`/api/cart/get?id=${encodeURIComponent(cartId)}`, {
      cache: 'no-store',
    });
    const data = res.ok ? await res.json() : null;
    setTotalQty(data.totalQuantity)
  }
  getCartSize()

  return (
    <div className="navbar-container">
      <div className="navbar-logo">
        <div onMouseEnter={() => setLogoIsHovered(true)} onMouseLeave={() => setLogoIsHovered(false)}>
          <Link href={"/"}>
            <Image className="logo-img" width={60} height={70} src={logoIsHovered ? "/logos/white.png" : "/logos/standard.jpg"} alt="MammothVault Logo" />
          </Link>
        </div>
      </div>
      <div className="navbar-btns-container">
        <Link className={`navbar-btn ${isOnPageCheck(current_path, navbar_paths[0]) ? "navbar-btn-active" : ""}`}
          href={"/products"}>Shop</Link>
        {/* <Link className={`navbar-btn ${isOnPageCheck(current_path, navbar_paths[1]) ? "navbar-btn-active" : ""}`}
          href={"/about"}>About</Link>
        <Link className={`navbar-btn ${isOnPageCheck(current_path, navbar_paths[2]) ? "navbar-btn-active" : ""}`}
          href={"/contact"}>Contact Us</Link> */}
      </div>
      <div className="navbar-right">
        <Link className="navbar-btn mini-count" href={"/cart"}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
          </svg>
          {totalQty > 0 && <span className="count-badge">{totalQty}</span>}
        </Link>
        <Link className="navbar-btn" href={"/products"}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </Link>
      </div>
    </div>
  )
}