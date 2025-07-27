'use client';
import LandingPage from "./(pages)/landingpage/page";
import Products from "./(pages)/products/page";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "./css/Home.css"

export default function Home() {
  const router = useRouter();
  const isSignedIn = false;
  const [isOfAge, setIsOfAge] = useState<boolean | null>(null);
  const [answeredAge, setAnsweredAge] = useState<boolean>(false);

  // Remembering age in local storage for one-time ask
  useEffect(() => {
    const storedAgeStatus = localStorage.getItem("isOfAge");
    if (storedAgeStatus === "true") setIsOfAge(true);
    else if (storedAgeStatus === "false") setIsOfAge(false);
  }, []);
  const handleAgeDecision = (value: boolean) => {
    setAnsweredAge(true);
    localStorage.setItem("isOfAge", String(value));
    setIsOfAge(value);
  };

  return (
    <>
    { isOfAge == null && answeredAge == false ? (
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
      ) : (
        <div>
          { isOfAge == true ? ( 
            <div>
              <LandingPage/>
            </div>
            ) : (
            <div className="h-[100vh] flex justify-center items-center">
              <p>Sorry, but you are not old enough to visit this website.</p>
            </div>
            )}
        </div>
      )}
    </>
  );
}