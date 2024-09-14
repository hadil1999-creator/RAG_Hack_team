import React, { useState } from "react";
import logo1 from "../assets/image/logo1.png";
import robom from "../assets/image/robom.png";

export default function Login() {
  // State to toggle between login and register forms
  const [isRegistering, setIsRegistering] = useState(false);

  // Toggle between login and register forms
  const toggleForm = () => setIsRegistering(!isRegistering);

  return (
    <div className="flex w-full h-screen justify-between">
      <div className="w-[55%] p-5">
        <div className="w-full h-full rounded-xl">
          <h1 className="text-6xl text-green-800 font-serif italic text-opacity-45">
            FinAI
          </h1>
          <div className="flex flex-col mt-16 ml-44 w-[26rem]">
            <div>
              <img src={logo1} className="w-16 rounded-xl h-16" alt="" />
              <h2 className="text-xl font-semibold mt-4">
                {isRegistering ? "Register" : "Login"}
              </h2>
              <p className="text-neutral-300">
                {isRegistering
                  ? "Create your account"
                  : "Welcome back to FinAI - Please log in"}
              </p>
              <hr className="border-neutral-400 w-[26rem] mt-3" />
            </div>

            <form action="" className="flex flex-col text-black mt-7 gap-y-4">
              <div>
                <label htmlFor="email" className="font-medium">
                  Email
                </label>
                <input
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
                  {!isRegistering && (
                    <a href="">
                      <p className="text-xs font-semibold mt-1 hover:text-green-700">
                        Forgot?
                      </p>
                    </a>
                  )}
                </span>
                <input
                  type="password"
                  id="password"
                  className="w-full h-10 outline outline-2 px-2 mt-1 outline-gray-300 focus:outline-green-600 rounded-lg"
                  required
                  placeholder="Type your password"
                />
              </div>
              <div className="mt-4">
                <button className="w-full h-10 bg-green-800 text-white rounded-lg">
                  {isRegistering ? "Register" : "Login"}
                </button>
              </div>
              <div className="mt-2">
                <p className="text-neutral-400">
                  {isRegistering ? (
                    <>
                      Already have an account?{" "}
                      <a
                        onClick={toggleForm}
                        className="text-green-700 cursor-pointer hover:underline hover:underline-offset-2"
                      >
                        Login
                      </a>
                    </>
                  ) : (
                    <>
                      Don&apos;t have an account?{" "}
                      <a
                        onClick={toggleForm}
                        className="text-green-700 cursor-pointer hover:underline hover:underline-offset-2"
                      >
                        Register
                      </a>
                    </>
                  )}
                </p>
              </div>
            </form>
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
