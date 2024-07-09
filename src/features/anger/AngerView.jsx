import { useEffect, useState } from "react";
import { DbTables, getLogs, setLog } from "../../utils/db";
import { CalendarTemplate } from "../../components/templates/CalendarTemplate";

export const AngerView = ({ date }) => {
  const [sleepLogs, setSleepLogs] = useState([]);
  
  useEffect(() => {
    getLogs(DbTables.ANGER_LOGS).then((logs) => {
      setSleepLogs(logs);
    });
  }, []);
  
  return (
    <CalendarTemplate
      title="Anger"
      date={date}
      data={sleepLogs}
      onClick={async (id, value) => {
        try {
          await setLog(DbTables.ANGER_LOGS, date, value, id);
        } catch (error) {
          console.error(error);
        }
      }}
    />
  );
};
