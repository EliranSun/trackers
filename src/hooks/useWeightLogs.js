import { useCallback, useEffect, useState } from "react";
import { addWeightLog, editWeightLog, getWeightLogs } from "../utils/db";

export const useWeightLogs = (date) => {
  const [weightLogs, setWeightLogs] = useState([]);
  
  useEffect(() => {
    getWeightLogs(date)
      .then(data => setWeightLogs(data))
      .catch(error => console.error("Error getting weight logs", error))
  }, [date]);
  
  const addLog = useCallback(async (log) => {
    const { data, error } = await addWeightLog(date, log);
    
    if (error) {
      console.error("Error adding weight log", error);
      return;
    }
    
    setWeightLogs([data, ...weightLogs]);
  }, [date, weightLogs]);
  
  const editLog = useCallback(async (id, editedLog) => {
    const { data, error } = await editWeightLog(id, editedLog);
    
    if (error) {
      console.error("Error adding weight log", error);
      return;
    }
    
    const updatedLogs = weightLogs.map(log => log.id === id ? data : log);
    setWeightLogs(updatedLogs);
  }, [weightLogs]);
  
  return {
    logs: weightLogs,
    addLog,
    editLog
  };
}