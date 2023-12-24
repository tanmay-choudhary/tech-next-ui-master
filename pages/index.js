import Card from "@/Components/Card";
import FilterDrawer from "@/Components/FilterDrawer";
import Loader from "@/Components/common/Loader";
import TextInput from "@/Components/common/TextInput";
import { useState, useEffect } from "react";
import { useData } from "@/context/DataContext";

export default function Home() {
  const [text, setText] = useState("");
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);
  const [data, setData] = useState([]);
  const { state, dispatch } = useData();
  const formData = state.formData;
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // Debounce function
  const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const debouncedSearch = debounce(async () => {
    try {
      const response = await fetch("http://localhost:3001/get-ids", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          patent_id: searchTerm,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const result = await response.json();
      setSuggestions(result || []); // Update suggestions with the result
      console.log("Searching...", searchTerm, result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, 1000);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3001/patent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          patent_id: formData.id,
          phase: formData.phase,
          patent_text: "",
          date: formData.date,
          offset: "",
          limit: 10,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const result = await response.json();
      setData(result); // Assuming the response is an array, adjust accordingly
      console.log(
        {
          patent_id: formData.id,
          phase: formData.phase,
          patent_text: "",
          date: formData.date,
          offset: "",
          limit: 10,
        },
        result
      );
      //setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      //setLoading(false);
    }
  };
  const handleSearch = () => {
    console.log("Searching...");
  };

  useEffect(() => {
    debouncedSearch();
  }, [searchTerm]);
  return (
    <>
      <Loader />
      <div className="p-8 container mx-auto ">
        <div className="">
          <TextInput
            placeholder="Search by patent ID"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              setSearchTerm(e.target.value); // Update the search term
              debouncedSearch(); // Trigger debounced search
            }}
            button={true}
            onClick={handleSearch}
          />
          {/* Display suggestions */}
          <div>
            {suggestions?.map((suggestion, index) => (
              <div key={index}>{suggestion}</div>
            ))}
          </div>
        </div>
        <div className="flex  items-center justify-center mt-5">
          <button
            onClick={() => setShowFilterDrawer(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Apply Other Filters
          </button>
          {showFilterDrawer && (
            <FilterDrawer
              handleClearFilter={() => setShowFilterDrawer(false)}
              handleApplyFilter={() => {
                setShowFilterDrawer(false);
                fetchData();
              }}
            />
          )}{" "}
        </div>
        <div className="mt-5">
          {data.map((item, index) => (
            <Card
              key={index}
              patentId={item.patent_id}
              description={item.patent_text}
              date={item.date}
              phase={item.phase}
            />
          ))}
        </div>
      </div>
    </>
  );
}
