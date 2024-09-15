import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Historychat() {
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);

  //useEffect to fetch the chat history
  useEffect(() => {
    // const fetchChats = async () => {
    //   try {
    //     setIsLoading(true);
    //     const response = await fetch("http://localhost:5000/chats");
    //     if (!response.ok) {
    //       throw new Error("Something went wrong!");
    //     }
    //     const data = await response.json(); //get the data from the response
    //     setChats(data); //set the data to the chats state
    //     setIsLoading(false);
    //   } catch (error) {
    //     setError(error.message);
    //     setIsLoading(false);
    //   }
    // };
    // fetchChats(); //call the fetchChats function
    const mockChats = [
      { id: 1, title: "Implementing Scrollable Chat Layout", lastMessage: "8 minutes ago" },
      { id: 2, title: "Chatbox with AI Assistant Response", lastMessage: "1 day ago" },
      { id: 3, title: "Building a Generative AI Chat Assistant", lastMessage: "1 day ago" },
      { id: 4, title: "Making a Translation Interface Mobile-Responsive", lastMessage: "2 days ago" },
      { id: 5, title: "Implementing a Visible and Functional Logout Dialog", lastMessage: "3 days ago" },
    ];
    setChats(mockChats);
  
  }, []);


  //filter the chats based on the search term
  const filteredChats = chats.filter((chat) => {
    chat.title.toLowerCase().includes(searchTerm.toLowerCase()); //filter the chats based on the search term
  });

  //if the data is still loading
  if (isLoading) {
    return (
      <div className="flex text-[#f0fff1] justify-center mt-24">
        <p>Loading...</p>
      </div>
    );
  }

  //if there is an error
  if (error) {
    return (
      <div className="flex justify-center mt-24">
        <p> Error : {error}</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center mt-24  h-full">
      <div className=" w-[800px]">
        <div className="w-full">
          <input
            type="search"
            name="recentchats"
            placeholder="Search your chats"
            className="w-full px-3 h-14 py-2 rounded-xl border focus:outline-none border-green-900 bg-neutral-500 bg-opacity-15"
            id=""
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <p className="text-gray-300 mb-4 mt-2">
          You have {chats.length} previous chats with FinAI
        </p>
        <div className="mt-6 space-y-4">
          {filteredChats.map((chat, index) => (
            <Link to={`/chat/${chat.id}`} key={index}>
              <div className="mb-3 p-3 bg-neutral-500 bg-opacity-15 rounded-xl hover:bg-gray-400 transition w-full">
                <h3 className="font-medium text-white text-lg">{chat.title}</h3>
                <p className="text-sm text-gray-400">
                  Last message {chat.lastMessage}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
