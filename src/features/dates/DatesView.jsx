import { useEffect, useState } from "react";
import { getSleepLogs, setSleepLog } from "../../utils/db";
import { CalendarTemplate } from "../../components/templates/CalendarTemplate";

export const DatesView = ({ date }) => {
  const [datesLogs, setDatesLogs] = useState([]);
  
  useEffect(() => {
    getSleepLogs().then((logs) => {
      setDatesLogs(logs);
    });
  }, []);
  
  return (
    <CalendarTemplate
      title="Dates"
      date={date}
      data={datesLogs}
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
