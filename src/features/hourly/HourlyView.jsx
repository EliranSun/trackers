import { useCallback, useEffect, useState } from "react";
import { Measurements } from "../../components/atoms/Measurements";
import { Measurement } from "../../components/atoms/Measurement";
import { getHourlyLogs, InstantiateHours } from "../../utils/db";
import { HourEntry, HourlyTypes } from "./HourEntry";

export const formatHour = (hour) => {
    if (hour > 23) {
        return `0${hour - 24}:00`;
    }
    
    if (hour > 9) {
        return `${hour}:00`;
    }
    
    return `0${hour}:00`;
};

const getHours = (startOfDay = 7) => new Array(24).fill(0).map((_, i) => {
    const adjustedIndex = i + startOfDay;
    return formatHour(adjustedIndex);
});

// to prevent duplicate data store on dev
let singleton = null;

class Hourly {
    constructor({
        hour,
        reality,
        expectation,
        isApproved,
        id,
    }) {
        this.hour = hour;
        this.reality = reality;
        this.expectation = expectation;
        this.isApproved = isApproved;
        this.id = id;
    }
}

export const HourlyView = ({ date }) => {
    const [fulfilledPercentage, setFulfilledPercentage] = useState(0);
    const [mismatchPercentage, setMismatchPercentage] = useState(0);
    const [hourlyData, setHourlyData] = useState(getHours().map(hour => ({
        hour,
        reality: "",
        expectation: "",
    })));
    
    const fetch = useCallback(async () => {
        getHourlyLogs(date).then(data => {
            const hourData = data.map(item => new Hourly(item));
            
            if (hourData.length === 0) {
                const hours = getHours();
                console.info(`No data found for ${date} Instantiating ${hours.length} hours...`);
                if (!singleton) {
                    singleton = true;
                    InstantiateHours(date, hours).then(() => {
                        console.info(`Instantiated hours for ${date}, ${hours.length} hours`);
                    })
                }
            } else {
                setHourlyData(hourData.sort((a, b) => a.id - b.id));
                
                const handledItems = hourData.filter(({ reality }) => Boolean(reality));
                const fulfilled = hourData.filter(({ isApproved }) => isApproved).length;
                const mismatch = hourData.filter(({ isApproved }) => isApproved === false).length;
                
                setFulfilledPercentage((fulfilled / handledItems.length) * 100 || 0);
                setMismatchPercentage((mismatch / handledItems.length) * 100 || 0);
            }
        });
    }, [date]);
    
    useEffect(() => {
        fetch();
    }, [date]);
    
    return (
        <section className="flex flex-col gap-1">
            {hourlyData.map(({ id, hour, reality, expectation, isApproved }) =>
                <HourEntry
                    key={`${id}-${date}-${hour}`}
                    id={id}
                    hour={hour}
                    date={date}
                    isApproved={isApproved}
                    reality={reality}
                    expectation={expectation}
                    refetch={fetch}
                    onEntryComplete={fetch}/>
            )}
        </section>
    )
};