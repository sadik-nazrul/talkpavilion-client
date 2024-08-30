import React from "react";

const SectionIntro = ({ title, subtitle }) => {
  return (
    <div className="w-full flex justify-center text-center">
      <div className="flex flex-col justify-center items-center lg:w-1/2 p-5 lg:pb-14 gap-2">
        <h2 className="lg:text-4xl text-2xl font-bold">{title}</h2>
        <h2>{subtitle}</h2>
      </div>
    </div>
  );
};

export default SectionIntro;
