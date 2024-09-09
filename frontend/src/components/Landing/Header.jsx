import arrow from "../../assets/svg/arrow.svg";
import logo from '../../assets/image/logo.png'
export default function Header() {
  return (
    <>
      <div className="flex justify-center w-full pt-10  ">
        <div className="flex justify-start">
          {/* <img src={logo} className="w-12 h-12 " alt="" /> */}
        </div>
        <div className="w-[490px] rounded-3xl h-12  border  px-4 flex items-center border-[#114124] bg-lime-100 bg-opacity-15 ">
          <ul className="flex gap-x-9 items-center text-[#f0fff1]  text-opacity-1 ">
            <li>
            <img src={logo} className="w-9 h-9 " alt="" />

            </li>
            <li className="hover:underline hover:underline-offset-4 cursor-pointer">Home</li>
            <li className="hover:underline hover:underline-offset-4 cursor-pointer">About</li>
            <li className="hover:underline hover:underline-offset-4 cursor-pointer">Feature</li>
            <li className="relative ">
              <button className="text-center justify-center px-3 py-1 text- border flex bg-gradient-to-br from-black to-green-900 rounded-3xl bg-opacity-1 items-center gap-x-1 w-full  max-w-[24] hover:transition-transform hover:scale-110   [background:linear-gradient(45deg,#000,theme(colors.slate.800)_50%,#14532d)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.slate.600/.48)_80%,_#f0fff1_86%,_#f0fff1_90%,_#f0fff1_94%,_theme(colors.slate.600/.48))_border-box] border-transparent animate-border">
             <p>   Get Started</p>
             <img src={arrow} alt="" className="-rotate-90 h-5 w-5 " />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
