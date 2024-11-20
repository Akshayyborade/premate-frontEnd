import React, { useRef, useEffect, useState } from 'react';
import "chart.js/auto";
import { Doughnut } from 'react-chartjs-2';

const AbsentsChart = ({ present, absent }) => {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState({
    labels: ['Present', 'Absent'],
    datasets: [
      {
        label: 'Student Attendance',
        data: [0, 0], // Initialize with zeros
        backgroundColor: ['#ffffff', '#ffffff'], // Temporary colors until gradients are set
        borderColor: '#ffffff',
        borderWidth: 2,
      }
    ]
  });

  useEffect(() => {
    const chart = chartRef.current;
    if (chart && chart.ctx) {
      const ctx = chart.ctx;

      // Create gradient for "Present" section
      const presentGradient = ctx.createLinearGradient(0, 0, 0, 400);
      presentGradient.addColorStop(0, '#24243e');
      presentGradient.addColorStop(0.5, '#302b63');
      presentGradient.addColorStop(1, '#0f0c29');

      // Create gradient for "Absent" section
      const absentGradient = ctx.createLinearGradient(0, 0, 0, 400);
      absentGradient.addColorStop(0, '#f76c6c');
      absentGradient.addColorStop(0.5, '#f5a623');
      absentGradient.addColorStop(1, '#f76c6c');

      // Update the state with the proper gradients and data
      setChartData({
        labels: ['Present', 'Absent'],
        datasets: [
          {
            label: 'Student Attendance',
            data: [present, absent],
            backgroundColor: [
              presentGradient,
              absentGradient,
            ],
            borderColor: '#ffffff',
            borderWidth: 2,
          }
        ]
      });
    }
  }, [present, absent]);

  return (
    <div style={{ width: '220px', height: '250px' }}> {/* Adjust the size here */}
    <h2 style={{ fontSize: '16px', textAlign: 'center' }}>Student Attendance</h2>
    <Doughnut ref={chartRef} data={chartData} />
  </div>
  );
};

export default AbsentsChart;
