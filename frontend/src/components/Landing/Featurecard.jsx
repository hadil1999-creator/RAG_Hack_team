import PropTypes from "prop-types";

export default function Featurecard({heading, icon, description,className}) {
  return (
    <div className={`bg-gradient-to-tr group opacity-65 hover:opacity-100 hover:bg-gradient-to-br hover:from-black hover:to-green-400 cursor-pointer from-green-950 via-black to-green-950 border border-green-700  p-10 text  rounded-[35px] flex items-end  shadow-2xl] ${className}` }>
      <div className="flex flex-col">
      {icon && ( 
        <div className="group-hover:fill-[#f0fff1] 
            transition-colors duration-300 ">
          <img src={icon} className="w-10 h-10 group-hover:opacity-100" alt="icon" />
        </div> 
      )}
      <div className="flex flex-col text-4xl ">
        <h3 className=" font-semibold mb-2 text-[#f0fff1] text-opacity-25">{heading}</h3>
        {description && <p className="text-sm text-[#f0fff1]">{description}</p>}
      </div>
      </div>
    </div>
  );
}
Featurecard.propTypes = {
    heading: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
  };
