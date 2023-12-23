import { Search} from "lucide-react";
import React from "react";

const TextInput = ({ placeholder, value, onChange, button, onClick }) => {
  return (
    <div className="lg:flex lg:flex-row flex flex-col items-center lg:gap-x-4 gap-y-3">
      <input
        type="text"
        className="w-full px-3 py-2 border bg-white rounded   "
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {button && (
        <button
          className="px-5 lg:py-2.5 py-2 bg-blue-600 text-white rounded-2xl"
          onClick={onClick}
        >
          <Search/>
        </button>
      )}
    </div>
  );
};

export default TextInput;
