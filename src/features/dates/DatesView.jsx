import { useEffect, useState } from "react";
import { DbTables, getLogs, setLog } from "../../utils/db";
import { CalendarTemplate } from "../../components/templates/CalendarTemplate";

export const DatesView = ({ date }) => {
  const [sleepLogs, setSleepLogs] = useState([]);
  
  useEffect(() => {
    getLogs(DbTables.DATES_LOGS).then((logs) => {
      setSleepLogs(logs);
    });
  }, []);
  
  return (
    <CalendarTemplate
      title="Dates"
      date={date}
      data={sleepLogs}
      onClick={async (id, value) => {
        try {
          await setLog(DbTables.DATES_LOGS, date, value, id);
        } catch (error) {
          console.error(error);
        }
      }}
    />
  );
};
