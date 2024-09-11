import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/image/logo.png';
import analysis from '../../assets/svg/analysis.svg';
import secure from '../../assets/svg/secure.svg';
import home from '../../assets/svg/home.svg';
import history from '../../assets/svg/history.svg';
import logout from '../../assets/svg/logout.svg';
import settings from '../../assets/svg/settings.svg';
import Currentpath from './Currentpath';

export default function Sidebar() {
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const icon1 = [
    { name: 'home', icon: home, link: '/home' },
    { name: 'stats', icon: analysis, link: '/analysis' },
    { name: 'history', icon: history, link: '/recentchats' },
  ];

  const icon2 = [
    { name: 'risk management', icon: secure, link: '/riskmanagement' },
    { name: 'settings', icon: settings, link: '/settings/profile' },
  ];

  const getItemClass = (path) => {
    return Currentpath(path)
      ? 'w-7 h-7 flex justify-center items-center rounded-md mx-auto bg-[#67a390] bg-opacity'
      : 'w-5 h-5 mx-auto';
  };

  const logoutHandler = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <>
      <div className="w-12 border-gray-900 border-r flex flex-col justify-between rounded-r-[32px] h-full bg-[#0D0C0C] shadow-sm shadow-gray-700">
        <div>
          <div className="flex justify-center">
            <img src={logo} alt="" className="w-8 h-8 my-8" />
          </div>
          <ul className="flex flex-col justify-center gap-y-9">
            {icon1.map((item, index) => (
              <li key={index} className={getItemClass(item.link)}>
                <Link to={item.link}>
                  <img src={item.icon} alt={item.name} className="w-5 h-5 mx-auto" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <ul className="flex flex-col justify-center gap-y-9 mb-8">
            {icon2.map((item, index) => (
              <li key={index} className={getItemClass(item.link)}>
                <Link to={item.link}>
                  <img src={item.icon} alt={item.name} className="w-5 h-5 mx-auto" />
                </Link>
              </li>
            ))}
            <li className="flex justify-center">
              <button className="w-5 h-5" onClick={() => setShowLogoutDialog(true)}>
                <img src={logout} alt="logout" className="w-full h-full" />
              </button>
            </li>
          </ul>
        </div>
      </div>

      {showLogoutDialog && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4">Confirm Logout</h2>
            <p className="mb-6">Are you sure you want to log out?</p>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => setShowLogoutDialog(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={logoutHandler}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}