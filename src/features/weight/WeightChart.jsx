import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import { useEffect, useState } from "react";
import { getAllWeightLogs } from "../../utils/db";

export const WeightLineChart = () => {
  const [logs, setLogs] = useState([]);
  
  useEffect(() => {
    getAllWeightLogs().then(items => setLogs(items.filter(item => item.weight > 1)));
  }, []);
  
  console.log({ logs });
  
  return (
    <LineChart width={window.innerWidth - 20} height={400} data={logs}>
      <Line type="monotone" dataKey="weight" stroke="#8884d8"/>
      <CartesianGrid stroke="#ccc"/>
      <XAxis dataKey="date"/>
      <YAxis domain={['auto', 'auto']}/>
    </LineChart>
  );
}