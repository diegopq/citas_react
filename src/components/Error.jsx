import React from "react";

const Error = ({ children }) => {
  return (
    <div className="bg-red-100 p-3 uppercase mb-3 rounded">
      <p className="text-red-600 text-center font-bold">{children}</p>
    </div>
  );
};

export default Error;
