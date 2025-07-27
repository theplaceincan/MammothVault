'use client';

import LandingPage from "./(pages)/landingpage/page";
import { useState, useEffect } from "react";
import "./css/Home.css";

export default function Home() {
  const [isOfAge, setIsOfAge] = useState<boolean | null>(null);

  useEffect(() => {
    const storedAgeStatus = localStorage.getItem("isOfAge");
    if (storedAgeStatus === "true") {
      setIsOfAge(true);
    }
  }, []);

  const handleAgeDecision = (value: boolean) => {
    localStorage.setItem("isOfAge", String(value));
    setIsOfAge(value);
  };

  if (isOfAge === null) {
    return (
      <div className="age-warning">
        <div className="age-container">
          <p className="age-text">Are you 18 years old or older?</p>
          <div className="age-btn-container">
            <button onClick={() => handleAgeDecision(true)} className="btn-primary w-full mr-3">Yes</button>
            <button onClick={() => handleAgeDecision(false)} className="btn-primary w-full ml-3">No</button>
          </div>
          <p className="text-xs text-zinc-500 mt-5">This website is for individuals at least 18 years of age.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {isOfAge ? (
        <LandingPage />
      ) : (
        <div className="h-[100vh] flex justify-center items-center">
          <p>Sorry, but you are not old enough to visit this website.</p>
        </div>
      )}
    </>
  );
}