import {useCallback, useEffect, useMemo, useState} from "react";
import {DbTables, getHourlyLogs, getKetoLogs, getLogs, getWeightLogs, setLog} from "../../utils/db";
import {KetoEntry} from "../keto/KetoEntry";
import {MetricInput} from "../weight/WeightView";
import {HourEntry} from "../hourly/HourEntry";
import {formatHour} from "../hourly/HourlyView";
import {TrackerIcons, TrackerNames, Trackers, TrackerType} from "../../constants";
import classNames from "classnames";

const hour = new Date().getHours();

const Checkbox = ({label, date, icon: Icon, isChecked: initIsChecked = null, onChange}) => {
    const [isChecked, setIsChecked] = useState(initIsChecked);

    useEffect(() => {
        const key = DbTables[label];
        if (!key || !date) {
            console.log({DbTables, label, date});
            return;
        }

        getLogs(DbTables[label], date).then(data => {
            if (data.length === 0) {
                setIsChecked(null);
                return;
            }

            setIsChecked(data[0].isMet);
        });
    }, []);
    return (
        <button
            onClick={() => onChange(!isChecked)}
            className={classNames({
                "flex flex-col items-center gap-2 p-8": true,
                "border-2 border-gray-300": true,
                "bg-green-100 border-green-500": isChecked !== null && isChecked,
                "bg-red-100 border-red-500": isChecked !== null && !isChecked,
            })}>
            {/*<input*/}
            {/*    type="checkbox"*/}
            {/*    checked={isChecked}*/}
            {/*    onChange={onChange}*/}
            {/*    className="size-8"/>*/}
            <Icon size={42}/>
            <h2>{label}</h2>
        </button>
    )
}

export const HubView = ({date, time}) => {
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

            const entry = data.find(entry => entry.hour === formatHour(hour));
            console.log({check: !entry.reality});
            if (!entry.reality) {
                setHourEntry({});
                return;
            }

            setHourEntry(entry);
        });
    }, [date]);

    useEffect(() => {
        fetch();
    }, [date]);

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
            <div className="grid grid-cols-2 gap-2 justify-center py-8">
                {checkboxTrackers.map(tracker => (
                    <Checkbox
                        key={tracker.name}
                        label={tracker.name}
                        icon={tracker.icon}
                        date={date}
                        isChecked={tracker.isChecked}
                        onChange={async (isChecked) => {
                            try {
                                await setLog(date, tracker.name, isChecked);
                            } catch (error) {
                                console.error(error);
                            }
                        }}/>
                ))}
            </div>
        </section>
    )
}