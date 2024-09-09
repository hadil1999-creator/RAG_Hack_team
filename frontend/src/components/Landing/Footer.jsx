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
            <li>
              <p>Legal</p>
              <ul className="mt-6">
                <li>About</li>
                <li>Terms of Services</li>
                <li>Privacy Policy</li>
                <li>Support</li>
              </ul>
            </li>
            <li className="">
              <p className="text-xl">Contact Us</p>
              <ul className="mt-6">
                <li className="cursor-pointer">Twitter</li>
                <li className="cursor-pointer">Linkedin</li>
                <li className="cursor-pointer">Discord</li>
              </ul>
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
