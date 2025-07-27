import Hero from "./Hero";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import Slogan from "./Slogan";
import TopProducts from "./TopProducts";

export default function LandingPage() {
  return (
    <>
      <Navbar/>
      <div>  
        <Hero/>
        <Slogan/>
        <TopProducts/>
      </div>
      <Footer/>
    </>
  )
}