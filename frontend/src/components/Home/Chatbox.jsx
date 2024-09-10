import { useEffect, useRef, useState } from "react";
import arrow from "../../assets/svg/arrow.svg";



export default function Chatbox() {
  const [content, setContent] = useState("");
  const [isEmpty, setIsEmpty] = useState(true);
  const contentEditableRef = useRef(null);

  useEffect(() => {
    if (contentEditableRef.current) {
      contentEditableRef.current.focus();
    }
  }, []);
  const handleInput = (e) => {
    const text = e.target.innerText;
    setContent(text);
    setIsEmpty(text.trim() === "");
  };

  return (
    <div className="flex justify-center absolute top-[35%] text-white">
      <div className="w-[660px] flex bg-neutral-700 bg-opacity-25 border border-green-950 p-4 gap-x-4 rounded-3xl">
        <div
          contentEditable="true"
          className={`w-[600px] min-h-36 max-h-96 overflow-y-auto text-white  focus:outline-none   ${
            isEmpty ? "before:pointer-events-none" : ""
          }`}
          ref={contentEditableRef}
          placeholder="Type your prompt here"
          onInput={handleInput}
        >
          {content}
        </div>
        <div>
          <button type="submit"  className="bg-[#67a390] flex rotate-180 justify-center items-center rounded-xl w-10 h-10 hover:bg-[#5d9382]">
            <img src={arrow} alt="submit" />
          </button>
        </div>
      </div>
    </div>
  );
}
