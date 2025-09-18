import React from "react";

const Filter = () => {
  return (
    <ul className="flex justify-between items-center gap-2 m-3 bg-white rounded-full shadow-sm px-2 py-1 text-sm">
      <li className="px-4 py-2 bg-purple-500 text-white rounded-full cursor-pointer transition hover:bg-purple-600">
        All
      </li>
      <li className="px-4 py-2 text-gray-600 rounded-full cursor-pointer hover:bg-slate-100 transition">
        To do
      </li>
      <li className="px-4 py-2 text-gray-600 rounded-full cursor-pointer hover:bg-slate-100 transition">
        In progress
      </li>
      <li className="px-4 py-2 text-gray-600 rounded-full cursor-pointer hover:bg-slate-100 transition">
        Done
      </li>
    </ul>
  );
};

export default Filter;
