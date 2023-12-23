import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const Index = () => {
  const [state, setState] = useState({
    series: [
      {
        name: 'Income',
        type: 'column',
        data: [11.4, 22, 28.5, 13.5, 29.5, 30.8, 39.8, 46.6],
      },
      {
        name: 'Cashflow',
        type: 'column',
        data: [11.1, 32, 32.1, 46, 45.1, 41.9, 33.5, 29.5],
      },
      {
        name: 'Revenue',
        type: 'line',
        data: [20, 29, 37, 36, 44, 45, 50, 58],
      },
    ],
    options: {
      chart: {
        type: 'line',
        stacked: false,
      },
  
    },
  });

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


    window.addEventListener('resize', handleResize);

 
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='p-6 lg:p-12 container mx-auto'>
      <div id="chart">
        {typeof window !== 'undefined' && (
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
