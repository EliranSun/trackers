import {useCallback, useEffect, useState} from "react";
import {getHourlyLogs, getKetoLogs, getWeightLogs} from "../../utils/db";
import {KetoEntry} from "../keto/KetoEntry";
import {MetricInput} from "../weight/WeightView";
import {HourEntry} from "../hourly/HourEntry";
import {formatHour} from "../hourly/HourlyView";

const hour = new Date().getHours();

const Checkbox = ({label, isChecked, onChange}) => {
    return (
        <div className="flex flex-col items-center gap-2">
            <input
                type="checkbox"
                checked={isChecked}
                onChange={onChange}
                className="size-8"/>
            <h2>{label}</h2>
        </div>
    )
}

export const HubView = ({date, time}) => {
    const [ketoEntry, setKetoEntry] = useState({});
    const [hourEntry, setHourEntry] = useState({});
    const [isSleepGoalMet, setIsSleepGoalMet] = useState(false);
    const [weightEntry, setWeightEntry] = useState({
        weight: 0,
        fat: 0,
    });

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
            <div className="grid grid-cols-3 gap-4 py-8">
                <Checkbox
                    label="Sleep"
                    isChecked={isSleepGoalMet}
                    onChange={() => setIsSleepGoalMet(!isSleepGoalMet)}/>
                <Checkbox
                    label="Pron"
                    isChecked={isSleepGoalMet}
                    onChange={() => setIsSleepGoalMet(!isSleepGoalMet)}/>
                <Checkbox
                    label="Angry"
                    isChecked={isSleepGoalMet}
                    onChange={() => setIsSleepGoalMet(!isSleepGoalMet)}/>
                <Checkbox
                    label="Date"
                    isChecked={isSleepGoalMet}
                    onChange={() => setIsSleepGoalMet(!isSleepGoalMet)}/>
                <Checkbox
                    label="Esx"
                    isChecked={isSleepGoalMet}
                    onChange={() => setIsSleepGoalMet(!isSleepGoalMet)}/>
                <Checkbox
                    label="Lie/Not saying what I want"
                    isChecked={isSleepGoalMet}
                    onChange={() => setIsSleepGoalMet(!isSleepGoalMet)}/>
                <Checkbox
                    label="Dinner"
                    isChecked={isSleepGoalMet}
                    onChange={() => setIsSleepGoalMet(!isSleepGoalMet)}/>
                <Checkbox
                    label="Snore"
                    isChecked={isSleepGoalMet}
                    onChange={() => setIsSleepGoalMet(!isSleepGoalMet)}/>
                <Checkbox
                    label="Small Things"
                    isChecked={isSleepGoalMet}
                    onChange={() => setIsSleepGoalMet(!isSleepGoalMet)}/>
            </div>
        </section>
    )
}