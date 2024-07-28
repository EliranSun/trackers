import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import { useEffect, useState } from "react";
import { getAllWeightLogs } from "../../utils/db";

const getLinearRegression = (data) => {
  const n = data.length;
  const sumX = data.reduce((sum, point) => sum + point.x, 0);
  const sumY = data.reduce((sum, point) => sum + point.y, 0);
  const sumXY = data.reduce((sum, point) => sum + point.x * point.y, 0);
  const sumX2 = data.reduce((sum, point) => sum + point.x * point.x, 0);
  
  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;
  
  return data.map(point => ({
    x: point.x,
    y: slope * point.x + intercept,
  }));
};

export const WeightLineChart = () => {
  const [logs, setLogs] = useState([]);
  const [trendLine, setTrendLine] = useState([]);
  const [showTrendLine, setShowTrendLine] = useState(true);
  const [weightEdges, setWeightEdges] = useState({ max: 0, min: 0 });
  const [fatEdges, setFatEdges] = useState({ max: 0, min: 0 });
  
  useEffect(() => {
    getAllWeightLogs().then(items => {
      const data = items.filter(item => item.weight > 1).reverse()
        .slice(-10)
        .map(item => {
          const date = item.date.split("/");
          const day = Number(date[0]);
          const month = Number(date[1]);
          
          return {
            date: `${day}/${month}`,
            weight: Math.round(item.weight),
            fat: item.fat,
          };
        })
      
      setLogs(data);
      
      let highestWeight;
      let lowestWeight;
      let lowestFat;
      let highestFat;
      
      const foo = data.map((item, index) => {
        if (item.weight > highestWeight) {
          highestWeight = item.weight;
        }
        
        if (item.weight < lowestWeight) {
          lowestWeight = item.weight;
        }
        
        if (item.fat > highestFat) {
          highestFat = item.fat;
        }
        
        if (item.fat < lowestFat) {
          lowestFat = item.fat;
        }
        
        return { x: index, y: item.weight };
      });
      
      setTrendLine(getLinearRegression(foo));
      
      setWeightEdges({
        max: highestWeight + 10,
        min: lowestWeight - 10,
      });
      
      setFatEdges({
        max: highestFat + 10,
        min: lowestFat - 10,
      });
    });
  }, []);
  
  return (
    <div className="-ml-10">
      <button onClick={() => setShowTrendLine(!showTrendLine)}>Toggle Trendline</button>
      <LineChart width={window.innerWidth * 1.13} height={window.innerHeight * 0.66} data={logs}>
        {/*{showTrendLine ? <Line type="linear" data={trendLine} dataKey="y" stroke="#82ca9d" dot={false} name="Trendline"/> : null}*/}
        <XAxis dataKey="date"/>
        
        <Line yAxisId="left" dot={false} type="basis" dataKey="weight" stroke="#8884d8"/>
        <YAxis yAxisId="left" allowDecimals={false} type="number" domain={[weightEdges.min, weightEdges.max]}/>
        
        <Line yAxisId="right" dot={false} type="basis" dataKey="fat" stroke="#82ca9d"/>
        <YAxis yAxisId="right" allowDecimals={false} type="number" orientation="right" domain={[fatEdges.min, fatEdges.max]}/>
      </LineChart>
    </div>
  );
}