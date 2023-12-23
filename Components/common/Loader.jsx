import React, { useState, useEffect } from "react";

const Loader = () => {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 2000);

   
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {showLoader ? (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-white z-50">
          <div className="inline-block h-20 w-20 animate-spin rounded-full border-t-4 border-blue-400 border-r-transparent border-solid"></div>
        </div>
      ) : null}
    </div>
  );
};

export default Loader;
