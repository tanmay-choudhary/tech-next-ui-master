import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { API_URL } from "@/constants";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const Index = () => {
  const [state, setState] = useState({
    series: [
      {
        name: "Phase I",
        type: "column",
        data: [],
      },
      {
        name: "Phase II",
        type: "column",
        data: [],
      },
      {
        name: "Total (Phase I+ Phase II)",
        type: "line",
        data: [],
      },
    ],
    options: {
      chart: {
        type: "line",
        stacked: false,
        height: 400,
      },
      xaxis: {
        categories: [],
      },
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/get-count`, {
          method: "POST",
        });
        const data = await response.json();
        console.log("log data:", data);
        setState((prev) => ({
          ...prev,
          series: [
            { ...prev.series[0], data: data.phaseICounts },
            { ...prev.series[1], data: data.phaseIICounts },
            { ...prev.series[2], data: data.totalPhaseCounts },
          ],
          options: {
            ...prev.options,
            xaxis: {
              categories: data.years,
            },
          },
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const handleResize = () => {
      const windowHeight = window.innerHeight;
      setState((prev) => ({
        ...prev,
        options: {
          ...prev.options,
          chart: {
            ...prev.options.chart,
            height: windowHeight - 200,
          },
        },
      }));
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="p-6 lg:p-12 container mx-auto">
      <div id="chart">
        {typeof window !== "undefined" && (
          <ReactApexChart
            options={state.options}
            series={state.series}
            type="line"
            height={state.options.chart.height}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
