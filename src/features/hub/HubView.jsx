import {useCallback, useEffect, useState} from "react";
import {getHourlyLogs, getKetoLogs, getWeightLogs} from "../../utils/db";
import {KetoEntry} from "../keto/KetoEntry";
import {WeightMetricInput} from "../weight/WeightMetricInput";
import {HourEntry} from "../hourly/HourEntry";
import {formatHour} from "../hourly/HourlyView";

export const HubView = ({date}) => {
    const hour = new Date().getHours();
    const [ketoEntry, setKetoEntry] = useState({});
    const [hourEntry, setHourEntry] = useState({});
    const [weightEntry, setWeightEntry] = useState({weight: 0, fat: 0,});

    const fetch = useCallback(() => {
        getKetoLogs(date).then(data => {
            if (!data.length) {
                setKetoEntry({});
                return;
            }

            setKetoEntry(data[0]);
        });

        getWeightLogs(date).then(data => {
            if (data.length === 0) {
                setWeightEntry({weight: 0, fat: 0});
                return;
            }

            setWeightEntry(data[0]);
        });

        getHourlyLogs(date).then(data => {
            if (data.length === 0) {
                setHourEntry({});
                return;
            }

            const entry = data.find(entry => entry.hour === formatHour(hour));
            if (!entry.reality) {
                setHourEntry({});
                return;
            }

            setHourEntry(entry);
        });
    }, [date]);

    useEffect(() => {
        fetch();
    }, [date]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <section>
            <HourEntry
                id={hourEntry.id}
                hour={formatHour(hour)}
                date={date}
                isApproved={hourEntry.isApproved}
                reality={hourEntry.reality}
                expectation={hourEntry.expectation}
                refetch={fetch}
                onEntryComplete={fetch}/>
            <KetoEntry
                date={date}
                id={ketoEntry.id}
                name={ketoEntry.name}
                isSelected
                calories={ketoEntry.calories}
                protein={ketoEntry.protein}
                carbs={ketoEntry.carbs}
                isNew={ketoEntry.isNew}
                refetch={fetch}/>
            <div className="flex gap-1">
                <WeightMetricInput
                    value={weightEntry.weight}
                    onChange={value => setWeightEntry({...weightEntry, weight: value})}
                    label="Weight"/>
                <WeightMetricInput
                    value={weightEntry.fat}
                    onChange={value => setWeightEntry({...weightEntry, fat: value})}
                    label="% Fat"/>
            </div>
        </section>
    )
}