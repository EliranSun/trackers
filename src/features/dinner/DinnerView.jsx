import { useEffect, useState } from "react";
import { getSleepLogs, setSleepLog } from "../../utils/db";
import { CalendarTemplate } from "../../components/templates/CalendarTemplate";

export const DinnerView = ({ date }) => {
  const [dinnerLogs, setDinnerLogs] = useState([]);
  
  useEffect(() => {
    getSleepLogs().then((logs) => {
      setDinnerLogs(logs);
    });
  }, []);
  
  return (
    <CalendarTemplate
      title="Dinner"
      date={date}
      data={dinnerLogs}
      onClick={async (id, value) => {
        try {
          await setSleepLog(date, value, id);
        } catch (error) {
          console.error(error);
        }
      }}
    />
  );
};
