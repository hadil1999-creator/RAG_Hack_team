import logo from "../../assets/image/logo.png";
export default function Footer() {
  return (
    <div className="w-full h-  bg-opacity-15 bg-black pt-8 ">
      <hr className="border-green-800 border mx-24" />
      <div className="flex justify-between px-36 mt-6 pb-4 text-[#f0fff1]">
        <div className="">
          <img src={logo} alt="" className="w-36 h-36" />
        </div>
        <div className="">
          <ul className="flex text-[#f0fff1] gap-x-8 text-lg font-mono">
           
            <li className="">
            <p className="text-2xl font-bold mb-4">Contact Us</p>
<div className="flex">
  <ul className="flex-1 list-disc pl-5 space-y-2">
    <li>
      <a href="https://www.linkedin.com/in/hadil-ben-amor-777a981ba/" target="_blank" rel="noopener noreferrer" className="text-white hover:underline">Hadil</a>
    </li>
    <li>
    <a href="https://www.linkedin.com/in/mishba-bagban/" target="_blank" rel="noopener noreferrer" className="text-white hover:underline">Misba</a>
   
    </li>
    <li>
    <a href="https://www.linkedin.com/in/ahmed-islam01/" target="_blank" rel="noopener noreferrer" className="text-white hover:underline">Ahmed</a>
    </li>
  </ul>
  <ul className="flex-1 list-disc pl-5 space-y-2">
    <li>
    <a href="https://www.linkedin.com/in/osama-ayman/" target="_blank" rel="noopener noreferrer" className="text-white hover:underline">Osama</a>
     
    </li>
    <li>
      <a href="https://www.linkedin.com/in/yusuph-taopheeq-baab2280/" target="_blank" rel="noopener noreferrer" className="text-white hover:underline">Yusuph</a>
    </li>
  </ul>
</div>

            </li>
            <li></li>
          </ul>
        </div>
      </div>
      <hr className="border-green-800  mt-8 mx-24" />
      <div className="px-24 pt-8 pb-4">
        <p className="text-[#f0fff1]">
          {" "}
          © 2024 FinAI. All rights reserved.{" "}
        </p>
      </div>
    </div>
  );
}
