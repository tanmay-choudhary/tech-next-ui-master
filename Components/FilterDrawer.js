import React, { useState } from "react";
import TextInput from "./common/TextInput";
import DateInput from "./common/DateInput";


const FilterDrawer = ({handleClearFilter,handleApplyFilter}) => {
 const [phase,setPhase]= useState("")
  const [ id, setId ] = useState("")
  const [date, setDate] =useState("")
  return (
    <div className=" shadow-xl fixed right-0 top-0 h-[100vh] drawer  pt-28  space-y-12 pb-4 px-7 border rounded bg-white">
      <div className="mb-4 mt-4">
        <label className="block text-sm font-medium text-gray-700">
          Phase
        </label>
        <select
          className="mt-1 p-2 border rounded w-full"
          value={phase}
          onChange={(e) => setPhase(e.target.value)}
        >
          <option value="">Select Phase</option>
          <option value="Phase 1">Phase 1</option>
          <option value="Phase 2">Phase 2</option>
          
        </select>
      </div>

      <div className="mb-4">
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Patent Id
        </label>
        <TextInput
					placeholder="Search by patent id"
					value={id}
					onChange={(e) => setId(e.target.value)}
					
				/>
      </div>

      <div className="mb-4">
        <label className="mb-1 block text-sm font-medium text-gray-700">
           Date
        </label>
        <DateInput
					placeholder="Search by patent id"
					value={date}
					onChange={(e) => setDate(e.target.value)}
					
				/>
      </div>

     <div className=""> 
      <button
        className="bg-gray-300 text-gray-700 p-3 rounded hover:bg-gray-400 mr-2"
       onClick={handleClearFilter}
      >
        Clear Filters
      </button>
      <button
        className="bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
         onClick={handleApplyFilter}
      >
        Apply Filters
        </button>
        </div>
    </div>
  );
};

export default FilterDrawer;
