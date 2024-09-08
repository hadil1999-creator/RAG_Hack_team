import Header from "../components/Landing/Header.jsx";
// import Footer from "../components/Landing/Footer.jsx";
import robo from "../assets/image/robo.png";

export default function landing() {
  return (
    <div className="bg-gradient-to-br from-black to-[#33705f] h-screen overflow-x-hidden w-full">
      <Header />

      <section className="flex items-center w-full px-20 ">
        <div className="w-1/2">
          <h1 className="text-8xl text-opacity0 text-[#f0fff1] font-mono">
            Building a Better life with Finance
          </h1>
          <div className="flex justify-center">
            <button className="mt-4 border text-xl text-[#f0fff1] px-3 py-3 rounded-lg w-96 [background:linear-gradient(45deg,#000,theme(colors.slate.800)_50%,#14532d)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.slate.600/.48)_80%,_#f0fff1_86%,_#f0fff1_90%,_#f0fff1_94%,_theme(colors.slate.600/.48))_border-box] border-transparent animate-border hover:transition-transform hover:scale-110 shadow-2xl">
              Sign up Now
            </button>
          </div>{" "}
        </div>
        <div className="w-1/2">
          <img src={robo} className="w-[750px] h-[605px] " alt="" />
        </div>
      </section>

      {/* feature section */}
      <section className="mt-7 h-screen ">
        <div className="flex flex-col items-center gap-6 px-10">
          <div className="flex gap-x-6">
            {" "}
            <div className="w-[500px] h-72 flex p-8  items-end shadow-[12px_12px_0px_rgb(0,0,0)]  rounded-3xl bg-black bg-opacity-40 ">
              <h1 className="text-5xl text-opacity-20 font-mono font-semibold text-[#f0fff1]">
                Ask Anything about Finace investing,stocks
              </h1>
            </div>{" "}
            <div className="w-[500px] h-72 flex p-8  items-end border-green-900 border rounded-3xl bg-black bg-opacity-40   shadow-[12px_12px_0px_rgb(0,0,0)]">
              <h1 className="text-5xl text-opacity-20 font-mono font-semibold text-[#f0fff1]">
                Ask Anything about Finace investing,stocks
              </h1>
            </div>
          </div>

          <div className="flex gap-x-6">
            <div className="bg-green-200 w-[500px] p-10 text h-72 rounded-3xl   shadow-[12px_12px_0px_rgb(0,0,0)]">
              Time to prepare Finances
            </div>
            <div className="w-[500px]  shadow-[12px_12px_0px_rgb(0,0,0)] rounded-3xl h-72  bg-black"></div>
          </div>

          <div className=""></div>
          <div className=""></div>
        </div>
      </section>
    </div>
  );
}
