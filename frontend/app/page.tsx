'use client';
import LandingPage from "./(pages)/landingpage/page";
import Products from "./(pages)/products/page";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const isSignedIn = false;

  return (
    <>
      { !isSignedIn && (
        <LandingPage/>
      )}
    </>
  );
}