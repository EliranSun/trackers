import { useCallback, useEffect, useMemo, useState } from "react";
import { Measurement } from "./Measurement";
import { Measurements } from "./Measurements";
import { getKetoLogs } from "../utils/db";
import { isSameDay } from "date-fns";
import { KetoEntry } from "./KetoEntry";

export const KetoTable = ({ date }) => {
    const [logs, setLogs] = useState([]);
    
    const fetch = useCallback(() => {
      getKetoLogs(date).then(data => {
        const filteredKetoLogs = data.filter(log => isSameDay(log.created_at, new Date())).reverse();
        setLogs([
          {
            name: "",
            calories: null,
            protein: null,
            carbs: null,
            created_at: new Date(),
          },
          ...filteredKetoLogs,
        ]);
      });
    }, [date]);
    
    useEffect(() => {
      fetch();
    }, [date]);
    
    const caloriesSum = useMemo(() => {
      return logs.reduce((acc, row) => {
        if (!row.calories) {
          return acc;
        }
        
        return acc + Number(row.calories);
      }, 0);
    }, [logs]);
    
    const proteinSum = useMemo(() => {
      return logs.reduce((acc, row) => {
        if (!row.protein) {
          return acc;
        }
        
        return acc + Number(row.protein);
      }, 0);
    }, [logs]);
    
    const carbsSum = useMemo(() => {
      return logs.reduce((acc, row) => {
        if (!row.carbs) {
          return acc;
        }
        
        return acc + Number(row.carbs);
      }, 0);
    }, [logs]);
    
    return (
      <div className="flex flex-col gap-2 rounded-3xl py-4">
        <Measurements>
          <Measurement
            name="Calories"
            value={caloriesSum}
            range={[100, 2000]}/>
          <Measurement
            name="Protein"
            value={proteinSum}
            range={[120, 150]}/>
          <Measurement
            name="Carbs"
            value={carbsSum}
            range={[0, 40]}/>
        </Measurements>
        <div className="h-full overflow-x-hidden overflow-y-auto">
          {logs.map(data => (
            <KetoEntry
              data={data}
              key={data.created_at}
              onAddEntry={() => setTimeout(fetch, 3000)}
            />
          ))}
        </div>
      </div>
    )
  }
;