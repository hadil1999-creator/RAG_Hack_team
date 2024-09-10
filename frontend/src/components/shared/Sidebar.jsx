import logo from "../../assets/image/logo.png";
import analaysis from "../../assets/svg/analysis.svg";
import secure from "../../assets/svg/secure.svg";
import home from "../../assets/svg/home.svg";
import history from "../../assets/svg/history.svg";
import logout from "../../assets/svg/logout.svg";
import settings from "../../assets/svg/settings.svg";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Sidebar() {
  const icon1 = [
    { name: "home", icon: home, link: "/home" },
    { name: "stats", icon: analaysis, link: "/analysis" },
    { name: "history", icon: history, link: "/recentchats" },
  ];

  const icon2 = [
    // { name: "darkmode", icon: secure, link: "/darkmode" },
    { name: "risk management", icon: secure, link: "/riskmanagement" },
    { name: "settings", icon: settings, link: "/settings" },
    { name: "logout", icon: logout, link: "/logout" },
  ];

  //check teh current page and highlight the icon
  const location = useLocation();
  const isCurrentPath = (path) => {
    return location.pathname === path; // Check if the current path is the same as the given path
  };
  const isActivePath = (path) => {
    return location.pathname.startsWith(path); // Check if the current path starts with the given path
  };

  return (
    <div>
      <div className="w-12 border-gray-900 border-r justify-between flex flex-col  rounded-r-[32px] h-full bg-[#0D0C0C] shadow-sm shadow-gray-700">
        <div>
          {" "}
          <div className="flex justify-center">
            <img src={logo} alt="" className="w-8 h-8 my-8" />
          </div>
          <ul className="flex flex-col justify-center gap-y-9 ">
            {icon1.map((item, index) => (
              <li key={index}  className={`${isCurrentPath(item.link) ?"w-7 h-7 flex justify-center items-center rounded-md mx-auto bg-[#67a390] bg-opacity5" :"w-5 h-5 mx-auto"}`}>
                <Link to={item.link}>
                  <img
                    src={item.icon}
                    alt={item.name}
                    className="w-5 h-5 mx-auto"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <ul className="flex flex-col justify-center gap-y-9 mb-8">
            {" "}
            {icon2.map((item, index) => (
              <li key={index} className={`${isCurrentPath(item.link) ?"w-7 h-7 flex justify-center items-center rounded-md mx-auto bg-[#67a390] bg-opacity5" :"w-5 h-5 mx-auto"}`}>
                <Link to={item.link}>
                  <img
                    src={item.icon}
                    alt={item.name}
                    className="w-5 h-5 mx-auto"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
