import  { useState } from "react";
import logo1 from "../../assets/image/logo1.png";
import robom from "../../assets/image/robom.png";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Sign_up() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const handleGoogleLogin =() =>{
    // redirect to google login page
    window.location.href = "http://localhost:8000/users/google";
  }
  
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/users/signup", {
        email,
        password,
        cpassword,
      });
      alert("Signup Successful");
    } catch (err) {
      alert("Signup Failed" +"" + err.response.data.message);
    }
  };
  return (
    <div className="flex w-full h-screen justify-between">
      <div className="w-[55%] p-5">
        <div className="w-full h-full rounded-xl">
          <h1 className="text-6xl text-green-800 font-serif italic text-opacity-45">
            FinAI
          </h1>
          <div className="flex flex-col mt-10 ml-44 w-[26rem]">
            <div>
              <img src={logo1} className="w-16 rounded-xl h-16" alt="" />
              <h2 className="text-xl font-semibold mt-4">Sign Up</h2>
              <p className="text-neutral-300">
                Leverage your Finance with FinAI
              </p>
              <hr className="border-neutral-400 w-[26rem] mt-3" />
            </div>

            <form action="" onSubmit={handleSignup} className="flex flex-col text-black mt-4 gap-y-4">
              <div>
                <label htmlFor="email" className="font-medium">
                  Email
                </label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  id="email"
                  className="w-full h-10 outline outline-2 px-2 mt-1 outline-gray-300 focus:outline-green-600 rounded-lg"
                  required
                  placeholder="Type your email"
                />
              </div>
              <div className="mt-4">
                <span className="flex justify-between">
                  <label htmlFor="password" className="font-medium">
                    Password
                  </label>
                </span>
                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  className="w-full h-10 outline outline-2 px-2 mt-1 outline-gray-300 focus:outline-green-600 rounded-lg"
                  required
                  placeholder="Type your password"
                />
              </div>
              <div className="mt-4">
                <span className="flex justify-between">
                  <label htmlFor="password" className="font-medium">
                    Confirm Password
                  </label>
                </span>
                <input
                  type="password"
                  onChange={(e) => setCpassword(e.target.value)}
                  id="cpassword"
                  className="w-full h-10 outline outline-2 px-2 mt-1 outline-gray-300 focus:outline-green-600 rounded-lg"
                  required
                  placeholder="Type  password"
                />
              </div>
              <div className="mt-4 w-full flex justify-between">
                <button className="w-44 h-10 bg-green-800 text-white rounded-lg">
                  Sign Up
                </button>
                <p className="text-sm text-gray-400">OR</p>
                <button onClick={handleGoogleLogin} className="w-44 -h-10 font-medium text-[#f0fff1] bg-[#8aba8e] rounded-lg">
                  Login with Google
                </button>
              </div>
            
            </form>  <div className="">
                <p className="text-neutral-400 flex gap-x-1">
                  <>
                    Already have an account?{" "}
                    <Link to="/signin">
                      <p className="text-green-700 cursor-pointer hover:underline hover:underline-offset-2">
                        Sign in
                      </p>
                    </Link>
                  </>
                </p>
              </div>
          </div>
        </div>
      </div>
      <div className="w-[45%] transition-transform scale-95 p-12 rounded-2xl bg-gradient-to-tr from-green-950 via-black to-green-950">
        <div className="text-[#f0fff1] text-5xl">
          <span className="font-medium italic font-mono flex flex-col">
            Enter <span className="">the future</span>
          </span>{" "}
          <span className="flex flex-col ml-16 mt-5 font-serif text-[3.4rem]">
            of finance with <span className="text-green-600">FinAI</span>
          </span>{" "}
          <br />
        </div>
        <div className="flex justify-end">
          <img src={robom} alt="" className="w-96 h-96" />
        </div>
      </div>
    </div>
  );
}
