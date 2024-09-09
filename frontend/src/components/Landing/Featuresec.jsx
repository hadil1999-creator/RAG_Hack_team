import Featurecard from "./Featurecard.jsx";
import dollar from "../../assets/svg/dollar.svg";
// import chart from "../../assets/svg/chart.svg";
import analysis from "../../assets/svg/analysis.svg";
import goal from "../../assets/svg/goal.svg";
import secure from "../../assets/svg/secure.svg";
export default function Featuresec() {
  return (
    <div className="">
      <section className=" w-full gap-x-1 flex flex-  bg-black px-14 bg-opacity-15 ">
        <div className="w-1/2 flex-col text-[#f0fff1]  font-serif flex justify-center mt-">
          <div className="flex flex-col items-center w-[45rem]">
            <div className="text-sm   rounded-3xl border px-3 py-1 w-28 shadow-sm shadow-lime-50 shadow-l text-center">
              Feature
            </div>
            <div className="text-8xl mt-8 font-mono">
              Essentials tools for your financial growth
              <p className="text-xl mt-1 text-center text-green-100 text-opacity-25">
                Unlock your financial potential with FinAI
              </p>
            </div>
          </div>
        </div>{" "}
        <div className="w-1/2 flex flex-col  mt- bg-red-00 items-center gap-y-4   transition-transform scale-75">
          <Featurecard
            icon={dollar}
            heading=" Personalized Advice"
            className="w-[950px] h-[15rem] "
          />

          <div className="flex  gap-x-8  ">
            {" "}
            <Featurecard
              icon={analysis}
              heading="Real-time Analysis"
              className="w-[300px] h-[30re]"
            />
            <div className="flex flex-col gap-y-4">
              <div className="flex gap-x-2">
                <Featurecard
                  heading="Time to prepare Finances"
                  className="w-[300px] h-[15rem]"
                />

                <Featurecard
                  heading="Goal Tracking"
                  icon={goal}
                  className="w-[300px] h-[15rem] "
                />
              </div>
              <Featurecard
                className="w-[620px] h-56"
                heading="Risk Assessment"
                icon={secure}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
