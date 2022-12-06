import React from 'react';

const Left = ({dark}) => {
  
  return (
    <div
      className={`bg-white  ${
        !dark ? 'shadow-post' : ''
      } dark:bg-[#242526] flex flex-col items-center rounded-lg py-2 sm:py-3 md:py-4 px-5 md:fixed w-full mb-5 md:w-[24%] `}
    ></div>
  );
};

export default Left;
