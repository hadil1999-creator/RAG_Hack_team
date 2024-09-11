import { Link } from "react-router-dom";
import Currentpath from "../shared/Currentpath";


export default function Sidebar() {
  const items = [
    {
      name: "Profile",
      link: "/settings/profile",
    },
    {
      name: "Account",
      link: "/settings/account",
    },
  ];
 

  
  //to check the current path
 
  return (
    <div className="flex ml-44 mt-12">
      <ul className="flex flex-col gap-y-8">
        {items.map((item, index) => (
          <li key={index} className={`${
              Currentpath(item.link,true)
                ? "bg-neutral-700 bg-opacity-35 rounded-xl px-2 py-1 w-52"
                : "px-2 py-1 w-44 rounded-xl"
            }`}>
            <Link to={item.link} className="text-3xl font-mono text-[#f0fff1]">{item.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
