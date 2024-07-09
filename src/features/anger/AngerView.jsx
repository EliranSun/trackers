import { useEffect, useState } from "react";
import { getSleepLogs, setSleepLog } from "../../utils/db";
import { CalendarTemplate } from "../../components/templates/CalendarTemplate";

export const AngerView = ({ date }) => {
  const [sleepLogs, setSleepLogs] = useState([]);
  
  useEffect(() => {
    getSleepLogs().then((logs) => {
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
          await setSleepLog(date, value, id);
          console.info("Sleep log updated");
        } catch (error) {
          console.error(error);
        }
      }}
    />
  );
};
