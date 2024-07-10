import {useCallback, useEffect, useMemo, useState} from "react";
import {DbTables, getHourlyLogs, getKetoLogs, getLogs, getWeightLogs, setLog} from "../../utils/db";
import {KetoEntry} from "../keto/KetoEntry";
import {MetricInput} from "../weight/WeightView";
import {HourEntry} from "../hourly/HourEntry";
import {formatHour} from "../hourly/HourlyView";
import {Trackers, TrackerType} from "../../constants";
import classNames from "classnames";

const hour = new Date().getHours();

const Checkbox = ({
id, 
label, 
date, 
icon: Icon, 
isChecked: initIsChecked = null,
isFailureMessage,
isSuccessMessage,
isPositive,
}) => {
    const [isChecked, setIsChecked] = useState(initIsChecked);

    useEffect(() => {
        const key = DbTables[label];
        if (!key || !date) {
            return;
        }

        getLogs(DbTables[label], date).then(data => {
            console.log({label, date, data});
            if (data.length === 0) {
                setIsChecked(null);
                return;
            }

            setIsChecked(data[0].isMet);
        });
    }, [date, label]);

    return (
        <button
            onClick={async () => {
                setIsChecked(!isChecked);
                try {
                    await setLog(DbTables[label], date, !isChecked, id);
                    console.info("Log updated", date, label, isChecked)
                } catch (error) {
                    console.error(error, date, label, isChecked);
                }
            }}
            className={classNames({
                "flex flex-col items-center gap-2 p-5": true,
                "border-2 border-gray-300": true,
                "bg-green-300 border-green-500 text-black": isChecked !== null && isChecked,
                "bg-red-300 border-red-500 text-black": isChecked !== null && !isChecked,
            })}>
            <Icon size={42}/>
            <h2 className="text-xs">
                {(isChecked && isPositive) ? isSuccessMessage : ""}
                 {(!isChecked && isPositive) ? isFailureMessage : ""}
                {(isChecked && !isPositive) ? isSuccessMessage : ""}
                {(!isChecked && !isPositive) ? isFailureMessage : ""}
            </h2>
        </button>
    )
}

export const HubView = ({date}) => {
    const [ketoEntry, setKetoEntry] = useState({});
    const [hourEntry, setHourEntry] = useState({});
    const [weightEntry, setWeightEntry] = useState({weight: 0, fat: 0,});
    const checkboxTrackers = useMemo(() => {
        return Object.values(Trackers).filter(tracker => tracker.type === TrackerType.CHECKBOX);
    }, []);

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

            const entry = data.find(entry =>
                entry.hour === formatHour(hour));
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
                <MetricInput
                    value={weightEntry.weight}
                    onChange={value => setWeightEntry({...weightEntry, weight: value})}
                    label="Weight"/>
                <MetricInput
                    value={weightEntry.fat}
                    onChange={value => setWeightEntry({...weightEntry, fat: value})}
                    label="% Fat"/>
            </div>
            <div className="grid grid-cols-2 gap-2 justify-center py-8 h-80">
                {checkboxTrackers.map(tracker => (
                    <Checkbox
                        key={tracker.name}
                        id={tracker.id}
                        label={tracker.name}
                        isSuccessMessage={tracker.isSuccessMessage}
                        isFailureMessage={tracker.isFailureMessage}
                        isPositive={tracker.isPositive}
                        icon={tracker.icon}
                        date={date}
                        isChecked={tracker.isChecked}/>
                ))}
            </div>
        </section>
    )
}