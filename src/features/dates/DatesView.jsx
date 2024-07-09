import {useEffect, useState} from "react";
import {DbTables, getLogs, setLog} from "../../utils/db";
import {CalendarTemplate} from "../../components/templates/CalendarTemplate";

export const DatesView = ({date}) => {
    const [datesLogs, setDatesLogs] = useState([]);

    useEffect(() => {
        getLogs(DbTables.DATES_LOGS).then((logs) => {
            console.log({logs});
            setDatesLogs(logs);
        });
    }, []);

    return (
        <CalendarTemplate
            title="Dates"
            date={date}
            data={datesLogs}
            onClick={async (id, value, selectedDate) => {
                try {
                    await setLog(DbTables.DATES_LOGS, selectedDate, value, id);
                    console.info("Log updated", {selectedDate, id, value});
                } catch (error) {
                    console.error(error);
                }
            }}
        />
    );
};
