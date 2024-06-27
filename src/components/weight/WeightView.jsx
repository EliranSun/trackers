import { useWeightLogs } from "../../hooks/useWeightLogs";
import { useState } from "react";

export const WeightView = ({ date }) => {
  const { logs, addLog, editLog } = useWeightLogs(date);
  const [newLog, setNewLog] = useState({ weight: 75, fat: 20 });
  
  return (
    <section className="flex flex-col justify-center">
      <div className="flex flex-col items-center">
        <div
          key={`weight-log-${date}`}
          className="bg-gray-700 my-4 p-2 grid grid-cols-3 gap-2 max-w-screen-sm rounded-lg w-full">
          <input
            type="number"
            className="col-span-3"
            value={newLog.weight}
            onChange={event => setNewLog({ ...newLog, weight: Number(event.target.value) })}
          />
          <label className="col-span-3">Weight</label>
          <input
            type="number"
            className="col-span-3"
            value={newLog.fat}
            onChange={event => setNewLog({ ...newLog, fat: Number(event.target.value) })}
          />
          <label className="col-span-3">%</label>
        </div>
        <button onClick={() => addLog(newLog)}>
          🪵 LOG IT!
        </button>
        {logs.map(log => (
          <div
            key={`weight-log-${date}`}
            className="bg-gray-700 my-4 p-2 grid grid-cols-3 gap-2 max-w-screen-sm rounded-lg w-full">
            <input
              type="number"
              className="col-span-3"
              value={log.weight}
              onChange={event => editLog(log.id, { ...log, weight: Number(event.target.value) })}
            />
            <label className="col-span-3">Weight</label>
            <input
              type="number"
              className="col-span-3"
              value={log.fat}
              onChange={event => editLog(log.id, { ...log, fat: Number(event.target.value) })}
            />
            <label className="col-span-3">%</label>
          </div>
        ))}
      </div>
    </section>
  )
}