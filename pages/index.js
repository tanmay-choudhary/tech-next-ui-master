import Card from "@/Components/Card";
import FilterDrawer from "@/Components/FilterDrawer";
import Loader from "@/Components/common/Loader";
import TextInput from "@/Components/common/TextInput";
import { useState, useEffect } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/patent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            patent_id: "",
            phase: "",
            patent_text: "",
            date: "",
            offset: "",
            limit: 10,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const result = await response.json();
        setData(result); // Assuming the response is an array, adjust accordingly
        //setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        //setLoading(false);
      }
    };

    fetchData();
  }, []);
  const handleSearch = () => {
    console.log("Searching...");
  };

  // const data = [
  // 	{
  // 		patentId: "Phase 1",
  // 		description:
  // 			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, excepturi sit Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, excepturi sit Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, excepturi sit molestiae...",
  // 		date: "12-12-1222",
  // 	},
  // 	{
  // 		patentId: "Phase 2",
  // 		description:
  // 			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, excepturi sit Lorem ipsum dolor sit Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, excepturi sit  amet consectetur adipisicing elit. Itaque, excepturi sit molestiae...",
  // 		date: "12-12-1222",
  // 	},
  // ];
  return (
    <>
      <Loader />
      <div className="p-8 container mx-auto ">
        <div className="">
          <TextInput
            placeholder="Search by patent text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            button={true}
            onClick={handleSearch}
          />
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
              handleApplyFilter={() => setShowFilterDrawer(false)}
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
            />
          ))}
        </div>
      </div>
    </>
  );
}
