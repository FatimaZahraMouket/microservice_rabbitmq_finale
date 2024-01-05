import React, { useEffect, useState } from 'react';
import { Chart } from 'chart.js/auto';

const WebSocketClient = () => {
  const [sensorValues, setSensorValues] = useState([]);
  const [chartInstance, setChartInstance] = useState(null); // Add this line
  const chartRef = React.createRef();

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');

    ws.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    ws.onmessage = (event) => {
      const receivedValue = parseInt(event.data, 10);
      console.log('Received sensor value:', receivedValue);

      setSensorValues((prevValues) => [...prevValues, receivedValue]);

      // Update the chart
      if (chartInstance) {
        const chart = chartRef.current.getContext('2d');
        chartInstance.destroy(); // Destroy existing chart instance
        setChartInstance(null); // Reset chart instance
      }

      const chartCanvas = chartRef.current;
      const ctx = chartCanvas.getContext('2d');
      const newChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels: Array(sensorValues.length).fill(''),
          datasets: [
            {
              label: 'LM35 Sensor Values',
              backgroundColor: 'rgba(75,192,192,0.4)',
              borderColor: 'rgba(75,192,192,1)',
              borderWidth: 1,
              data: sensorValues,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });

      setChartInstance(newChartInstance);
    };

    ws.onclose = () => {
      console.log('Disconnected from WebSocket server');
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      ws.close();
    };
  }, [sensorValues, chartInstance]); // Include chartInstance in the dependency array

  return (
    <div>
      <h1>LM35 Sensor Value</h1>
      <canvas ref={chartRef} width="400" height="150"></canvas>
    </div>
  );
};

export default WebSocketClient;


