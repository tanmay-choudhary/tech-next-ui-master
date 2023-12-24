import React from "react";

function Card({ patentId, description, date, phase }) {
  return (
    <div className="bg-white shadow-xl rounded-xl border border-blue-100 p-4 space-y-5 mb-5">
      <p className="bg-blue-100 px-3 py-2 rounded-3xl font-medium text-sm inline-flex">
        {phase}
      </p>
      <h1 className="font-medium text-base text-black">
        PATENT ID: <span className="font-normal text-gray-500">{patentId}</span>
      </h1>
      <p className="text-base text-gray-600">{description}</p>
      <p className="font-medium text-base text-black">
        Date: <span className="text-gray-500 font-normal">{date}</span>
      </p>
    </div>
  );
}

export default Card;
