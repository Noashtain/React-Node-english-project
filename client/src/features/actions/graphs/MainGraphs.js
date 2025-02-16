import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { useGetAllTestsMutation } from '../listWord/view/ListWordApiSlice';
import ScoreCharts from './ScoreCharts';
import useAuth from '../../../hooks/useAuth';

const colors = ['#9B153B', '#C63D5D', '#E64A7B', '#F7A6B2', '#FFB3B3'];

const MainGraphs = () => {
  const {_id:user}=useAuth()
  const [getAllTests] = useGetAllTestsMutation();
  const [testData, setTestData] = useState([]);

  // Fetch tests data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllTests({ user }).unwrap();
        if (!response.error) {
          setTestData(response.data);
          console.log(response.data,"data");
        }
      } catch (error) {
        console.error("Failed to fetch tests:", error);
      }
    };

    fetchData();
  }, [getAllTests]);

  // Prepare data for the charts based on testData
 // הוספנו בדיקה של מערך הנתונים לפני השרטוט
const barData = [
  {
    x: testData.map(item => item.title || "Test"), // שימוש ב-title עבור שם המבחן
    y: testData.map(item => item.mark || 0), // במידה ו-mark חסר, קובע ל-0
    type: 'bar',
    marker: { color: colors[0] },
  },
];

const lineData = [
  {
    x: testData.map(item => item.title || "Test"),
    y: testData.map(item => item.mark || 0),
    type: 'line',
    marker: { color: colors[1] },
  },
];

const pieData = [
  {
    labels: testData.map(item => item.title || "Test"),
    values: testData.map(item => item.mark || 0),
    type: 'pie',
    marker: { colors },
  },
];


  return (
    <div className='graphsContent'>
      <Box sx={{
        height: '68vh',
        width: '50w',
        margin: 'auto',
        backgroundColor: '#ffffff',
        padding: '20px',
        borderRadius: '16px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        overflowY: 'auto',
      }}>
        <div><ScoreCharts /></div>
        <div className='graphs'>
          <Plot
            className='chart'
            data={barData}
            layout={{
              title: 'ציונים לפי בוחן',
              paper_bgcolor: '#ffffff',
              plot_bgcolor: '#f3f3f3',
              height: 350,
              width: 400,
            }}
          />
          <Plot
            className='chart'
            data={lineData}
            layout={{
              title: 'התקדמות ציונים לאורך זמן',
              paper_bgcolor: '#ffffff',
              plot_bgcolor: '#f3f3f3',
              height: 350,
              width: 400,
            }}
          />
          <Plot
            className='chart'
            data={pieData}
            layout={{
              title: 'חלוקה לפי רמות ציונים',
              paper_bgcolor: '#ffffff',
              plot_bgcolor: '#f3f3f3',
              height: 350,
              width: 400,
            }}
          />
        </div>
      </Box>
    </div>
  );
};

export default MainGraphs;