import Header from "../components/Landing/Header.jsx";
import Footer from "../components/Landing/Footer.jsx";
import robo from "../assets/image/robo.png";
import Featuresec from "../components/Landing/Featuresec.jsx";
import homes from "../assets/image/homes.png";
import { Link } from "react-router-dom";

export default function landing() {
  return (
    <div className="bg-gradient-to-br from-black via-[#33705f] to-[#13342b] h-screen overflow-x-hidden w-full">
      <div className="bg-[#f0fff1] w-full flex justify-center items-start">
        <p className="font-semibold font-mono">
          This project is built during the{" "}
          <a href="https://github.com/microsoft/RAG_Hack?tab=readme-ov-file" className="text-green-600 hover:underline hover:underline-offset-2">
            Microsoft/RAG_HACK 
          </a> on September 2024
        </p>
      </div>
      <Header />

      {/* hero section */}
      <section className="flex items-center w-full h-screen px-20 " id="home">
        <div className="w-1/2">
          <h1 className="text-8xl text-opacity0 text-[#f0fff1] font-serif">
            Building a Better life with{" "}
            <span className="text-green-300">Finance</span>
          </h1>
          <div className="flex justify-center">
            <Link to="/signup">
              <button className="mt-4 border text-xl text-[#f0fff1] px-3 py-3 rounded-lg w-96 [background:linear-gradient(45deg,#000,theme(colors.slate.800)_50%,#14532d)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.slate.600/.48)_80%,_#f0fff1_86%,_#f0fff1_90%,_#f0fff1_94%,_theme(colors.slate.600/.48))_border-box] border-transparent animate-border hover:transition-transform hover:scale-110 shadow-2xl">
                Sign up Now
              </button>
            </Link>
          </div>{" "}
        </div>
        <div className="w-1/2 ">
          <img src={robo} className="w-[750px] h-[605px] " alt="" />
        </div>
      </section>

      <section className="justify-center  flex  bg-opacity-15 bg-black">
        <div className=" transition-transform scale-90 rounded-[26px] relative -top-28">
          <img
            src={homes}
            className=" border-8  rounded-[25px]  w-[1300px] [background:linear-gradient(45deg,#000,theme(colors.slate.800)_50%,#14532d)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.slate.600/.48)_80%,_#f0fff1_86%,_#f0fff1_90%,_#f0fff1_94%,_theme(colors.slate.600/.48))_border-box] border-transparent animate-border"
            alt=""
          />
        </div>
      </section>
      {/* feature section */}
      <Featuresec />
      <Footer />
    </div>
  );
}
