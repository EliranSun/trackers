import { useWeightLogs } from "../../hooks/useWeightLogs";
import { useEffect, useState } from "react";
import { WeightMetrics } from "./WeightMetrics";
import { WeightMetricInput } from "./WeightMetricInput";
import { getCreatedTime } from "../../utils/date";
import { WeightLineChart } from "./WeightChart";

export const WeightView = ({ date }) => {
  const { currentLog, addLog, editLog, refetch } = useWeightLogs(date);
  const [newLog, setNewLog] = useState({ weight: 0, fat: 0 });
  
  useEffect(() => {
    setNewLog(currentLog);
  }, [currentLog]);
  
  return (
    <section className="flex flex-col justify-center">
      <div className="flex flex-col items-center">
        <WeightMetrics>
          {getCreatedTime(newLog?.created_at)}
          <WeightMetricInput
            value={newLog?.weight}
            onChange={value => setNewLog({ ...newLog, weight: value })}
            label="Weight"/>
          <WeightMetricInput
            value={newLog?.fat}
            onChange={value => setNewLog({ ...newLog, fat: value })}
            label="% Fat"/>
        </WeightMetrics>
        <button
          disabled={newLog?.weight === currentLog?.weight && newLog?.fat === currentLog?.fat}
          className="text-4xl bg-black rounded-full py-4 px-8 disabled:opacity-30 disabled:grayscale"
          onClick={async () => {
            if (currentLog?.weight || currentLog?.fat) {
              await editLog(currentLog.id, newLog);
              return;
            }
            
            await addLog(newLog);
            await refetch();
          }}>
          {(currentLog?.weight || currentLog?.fat) ? "🪵LOGGED" : "🪵LOG IT!"}
        </button>
      </div>
      
      <WeightLineChart/>
    </section>
  )
}