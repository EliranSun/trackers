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
  const [showTrendLine, setShowTrendLine] = useState(true);
  const [trendLine, setTrendLine] = useState([]);
  
  useEffect(() => {
    getAllWeightLogs().then(items => {
      const data = items.filter(item => item.weight > 1).reverse();
      setLogs(data);
      setTrendLine(getLinearRegression(data.map((item, index) => ({ x: index, y: item.weight }))));
    });
  }, []);
  
  return (
    <div>
      <button onClick={() => setShowTrendLine(!showTrendLine)}>Toggle Trendline</button>
      <LineChart width={window.innerWidth - 20} height={400} data={logs}>
        <Line type="monotone" yAxisId="left" dataKey="weight" stroke="#8884d8"/>
        <Line type="monotone" yAxisId="right" dataKey="fat" stroke="#82ca9d"/>
        {showTrendLine ? <Line type="linear" data={trendLine} dataKey="y" stroke="#82ca9d" dot={false} name="Trendline"/> : null}
        <XAxis dataKey="date"/>
        <YAxis domain={[60, 80]}/>
        <YAxis yAxisId="left" domain={['auto', 'auto']}/>
        <YAxis yAxisId="right" orientation="right" domain={['auto', 'auto']}/>
      </LineChart>
    </div>
  );
}