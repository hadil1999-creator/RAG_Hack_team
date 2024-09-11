import camera from "../../assets/svg/camera.svg";
import { useState, useRef } from "react";

export default function Card() {
  const profiles = [
    { name: "Name", type: "text" },
    { name: "Username", type: "text" },
  ];

  // add profile picture
  const [profilepicture, setProfilePicture] = useState(null);
  const fileInputRef = useRef(null);

  //  handle the file input
  const handlefileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-[#D9D9D9] text-[#e2fbe4] bg-opacity-10 rounded-3xl w-[700px] h-96">
      <form action="" className="p-5 flex flex-col">
        <div className="flex justify-between items-center px-10">
          <div className="group">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlefileChange}
              ref={fileInputRef}
            />
           
            <button
              type="button"
              className=" overflow-hidden flex justify-center group-hover:opacity-85 items-center w-44 h-44  rounded-full "
              onClick={() => fileInputRef.current.click()}
            > <img
              src={camera}
              className=" absolute opacity-0 group-hover:opacity-100 w-8 h-8 top-[27%] left-[46%] z-40"
              alt=""
            />
              {profilepicture ? (
                <img
                  src={profilepicture}
                  alt="preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              )}
            </button>
          </div>
          <ul className="space-y-4">
            {profiles.map((profile, index) => (
              <li key={index} className="flex flex-col ">
                <label htmlFor={profile.name} className="text-2xl">
                  {profile.name}
                </label>
                <input
                  type="text"
                  id="name"
                  className=" rounded-xl w-96 bg-neutral-500 bg-opacity-20 focus:outline-none mt-3 px-2 py-3"
                />
              </li>
            ))}
          </ul>
        </div>{" "}
        <div className="flex justify-end mt-10 mr-10">
          <button className="w-44 px-2 py-3 rounded-xl bg-green-400">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
