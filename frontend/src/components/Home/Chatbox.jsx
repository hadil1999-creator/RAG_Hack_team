import { useEffect, useRef, useState } from "react";
import arrow from "../../assets/svg/arrow.svg";
import {  useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export default function Chatbox() {
  const [Content, setContent] = useState("");
  // const [AiResponse, setAiResponse] = useState("");
 const navigate = useNavigate();
  // make submit button visible if there is text in the chatbox
  const handleInputChange = (e) => {
    setContent(e.target.value); // set the content of the chatbox
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (Content.trim()) {
      const id = uuidv4();
      navigate(`/chat/${id}`, { state: { initialMessage: Content } });
      // setContent("");
    }
  }

  return (
    <form     onClick={handleSubmit} className="flex justify-center absolute top-[35%] text-">
      <div className="w-[660px]  min-h-36 max-h-96 flex bg-neutral-700 bg-opacity-25 border border-green-950 p-4 gap-x-4 rounded-3xl">
        
        <textarea className="w-[600px] min-h-36 max-h-96 overflow-y-auto text-white resize-none focus:outline-none bg-transparent" onChange={handleInputChange} value={Content}  placeholder="Type your prompt here" />
        <div>
          {Content.trim().length > 0 && (
            <button
              type="submit"
          
              className="bg-[#67a390] flex rotate-180 justify-center items-center rounded-xl w-10 h-10 hover:bg-[#5d9382]"
            >
              <img src={arrow} alt="submit" />
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
