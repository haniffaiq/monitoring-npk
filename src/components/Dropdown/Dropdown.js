import React, { useState } from 'react';

function Dropdown() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  }

  return (
    <div className="relative inline-block">
      <button onClick={handleDropdownClick} className="inline-flex justify-center items-center w-full px-4 py-2 text-sm font-medium text-white border border-white rounded-md hover:bg-white hover:text-green-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
         <p>Selamat Datang Om Don</p> 
        <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M10.292 13.707a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L10 11.586l3.293-3.293a1 1 0 011.414 1.414l-4 4z" clipRule="evenodd" />
        </svg>
      </button>
      {isDropdownOpen && (
        <div className="absolute z-10 mt-2 border border-white rounded-md shadow-lg">
          <a href="#" className="block px-4 py-2 text-sm text-white hover:bg-white hover:text-green-300">Item 1</a>
        </div>
      )}
    </div>
  );
}

export default Dropdown;
