import { useState, useEffect, useRef } from "react";
import arrow from "../assets/svg/arrow.svg";
import { useParams, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Chat() {
  const { id } = useParams(); // get the id from the url
  const location = useLocation();
  const [response, setResponse] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputContent, setInputContent] = useState("");
  const messageEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const initialMessageProcessed = useRef(false);

  useEffect(() => {
    if (location.state?.initialMessage && !initialMessageProcessed.current) {
      handleNewResponse(location.state.initialMessage);
      initialMessageProcessed.current = true;
    }
  }, [location.state]);

  useEffect(() => {
    scrollToBottom();
  }, [response]);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleNewResponse = async (content) => {
    setResponse((prev) => [...prev, { content, isUser: true }]);
    setInputContent("");
    setIsLoading(true);

    // Send the user's input to the backend API and get the response
    try {
      const res = await fetch("http://localhost:8000/api/get-answer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: content }),
      });

      if (res.ok) {
        const data = await res.json();
        const aiResponse = data.answer; // Get the answer from the backend
        setResponse((prev) => [...prev, { content: aiResponse, isUser: false }]);
      } else {
        const errorData = await res.json();
        setResponse((prev) => [...prev, { content: `Error: ${errorData.detail}`, isUser: false }]);
      }
    } catch (error) {
      setResponse((prev) => [...prev, { content: `Error: ${error.message}`, isUser: false }]);
    } finally {
      setIsLoading(false);
      scrollToBottom();
    }
  };

  const handleInputChange = (e) => {
    setInputContent(e.target.value); // set the content of the chatbox
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputContent.trim()) {
      handleNewResponse(inputContent);
    }
  };

  return (
    <div className="h-full w-full flex justify-center">
      <div className="flex flex-col ">
        <div className="mt-14 flex ">
          <div
            ref={chatContainerRef}
            className="mt-1 overflow-y-auto w-[900px] transition-transform scale-95 mb-36 justify-center flex-1"
          >
            {response.map((res, index) => (
              <div
                key={index}
                className={`mb-4 ${
                  res.isUser
                    ? "bg-green-600 rounded-2xl px-4 py-2 text-lg"
                    : "bg-neutral-400 rounded-2xl bg-opacity-25 px-4 py-2 text-lg"
                }`}
              >
                <div
                  className={`inline-block p-2 rounded-[35px] ${
                    res.isUser ? "text-white" : "text-white"
                  }`}
                >
                  {res.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="text-left mt-2">
                <div className="inline-block text-[#f0fff1] p-2 rounded-lg">
                  Thinking...
                </div>
              </div>
            )}
            <div ref={messageEndRef} />
          </div>
        </div>
        <div className="fixed bottom-0">
          <form action="" onSubmit={handleSubmit}>
            <div className="w-[900px] items-center min-h-24 max-h-96 flex bg-[#1a2216] bg-o border border-green-950 p-4 gap-x-4 rounded-t-[35px]">
              <textarea
                className="w-[100%] min-h-20 max-h-96 overflow-y-auto text-white resize-none focus:outline-none bg-transparent"
                placeholder="Type your prompt here"
                onChange={handleInputChange}
                value={inputContent}
              />
              <div className="mb-6 mx-4">
                {inputContent.trim().length > 0 && (
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
        </div>
      </div>
      <div className="mt-12 w-36 h-8 flex ml-14">
        <Link to="/home">
          <button className="text-green-400 bg-neutral-500 rounded-lg bg-opacity-15 w-36 h-8">
            Start new Chat
          </button>
        </Link>
      </div>
    </div>
  );
}
