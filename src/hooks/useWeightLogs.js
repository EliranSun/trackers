import { useCallback, useEffect, useState } from "react";
import { addWeightLog, editWeightLog, getWeightLogs } from "../utils/db";

export const useWeightLogs = (date) => {
  const [currentLog, setWeightLogs] = useState({
    weight: 0,
    fat: 0,
    date: "",
  });
  
  useEffect(() => {
    getWeightLogs(date)
      .then(data => {
        if (!data[0]) {
          setWeightLogs({
            weight: 0,
            fat: 0,
            date: date,
          });
          return;
        }
        
        setWeightLogs(data[0]);
      })
      .catch(error => console.error("Error getting weight logs", error))
  }, [date]);
  
  const addLog = useCallback(async (log) => {
    const data = await addWeightLog(date, log);
    setWeightLogs(data);
  }, [date]);
  
  const editLog = useCallback(async (id, editedLog) => {
    const data = await editWeightLog(id, editedLog);
    setWeightLogs(data);
  }, []);
  
  return {
    currentLog,
    addLog,
    editLog,
    refetch: () => getWeightLogs(date).then(data => setWeightLogs(data[0])),
  };
}