import React, { useState } from 'react';
import arrow from "../../assets/svg/arrow.svg";
import logo from '../../assets/image/logo.png';

export default function Header() {
  const [dialogContent, setDialogContent] = useState(null);

  const openDialog = (content) => {
    setDialogContent(content);
  };

  const closeDialog = () => {
    setDialogContent(null);
  };

  return (
    <>
      <div className="flex justify-center w-full pt-10">
        <div className="flex justify-start">
          {/* <img src={logo} className="w-12 h-12" alt="" /> */}
        </div>
        <div className="w-[490px] rounded-3xl h-12 border px-4 flex items-center border-[#114124] bg-lime-100 bg-opacity-15">
          <ul className="flex gap-x-9 items-center text-[#f0fff1] text-opacity-1">
            <li>
              <img src={logo} className="w-9 h-9" alt="" />
            </li>
            <li
              className="hover:underline hover:underline-offset-4 cursor-pointer"
              onClick={() => openDialog('Welcome to our AI-powered financial advisor app! This project was developed during Microsoft RAG_Hack 2024')}
            >
              Home
            </li>
            <li
              className="hover:underline hover:underline-offset-4 cursor-pointer"
              onClick={() => openDialog('This cutting-edge solution provides personalized financial advice and recommendations tailored to your unique circumstances. By harnessing the power of RAG (Retrieval Augmented Generation), our app processes extensive financial data to offer you precise, data-driven insights. This app is designed to assist with financial planning, but should not replace professional financial advice.')}
            >
              About
            </li>
            <li
              className="hover:underline hover:underline-offset-4 cursor-pointer"
              onClick={() => openDialog('You can access a fine-tuned AI model, expertly trained on financial data, to provide high-quality insights related to finance and investment. Additionally, you can upload your own data to benefit from targeted information retrieval, enabling more specialized responses tailored to your specific situation and documents. The model has been fine-tuned and deployed using advanced cloud technologies, ensuring low latency and rapid responses for seamless user experience. This setup guarantees optimal performance, offering personalized, accurate, and timely financial advice.')}
            >
              Feature
            </li>
            <li className="relative">
              <button className="text-center justify-center px-3 py-1 flex bg-gradient-to-br from-black to-green-900 rounded-3xl bg-opacity-1 items-center gap-x-1 w-full max-w-[24] hover:transition-transform hover:scale-110">
                <p>Get Started</p>
                <img src={arrow} alt="" className="-rotate-90 h-5 w-5" />
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Dialog */}
      {dialogContent && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <p>{dialogContent}</p>
            <button
              onClick={closeDialog}
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
