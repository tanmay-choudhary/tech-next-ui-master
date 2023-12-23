import React from 'react'

function DateInput({  value, onChange }) {
  return (
    <div>
    
      <input
        type="date"
        className="w-full px-3 py-2 border  rounded"
        value={value}
              onChange={ onChange }
              
      />
    </div>
  )
}

export default DateInput