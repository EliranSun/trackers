import {useMemo, useState} from "react";
import {Trackers, TrackerType} from "../../constants";
import {Checkbox} from "../atoms/Checkbox";
import {format, addDays, getDaysInMonth} from "date-fns";
import classNames from "classnames";

export const HabitTemplate = ({date}) => {
    const [isMonthView, setIsMonthView] = useState(false);
    const weekDays = useMemo(() => {
        const dateSplit = date.split('/');
        const year = Number(dateSplit[2]);
        const month = Number(dateSplit[1]) - 1;
        const day = Number(dateSplit[0]);
        const currentDateObject = new Date(year, month, day);
        const daysInCurrentMonth = getDaysInMonth(currentDateObject);
        const arrayLength = isMonthView ? daysInCurrentMonth : 7;
        const currentDayIndex = isMonthView ? day : currentDateObject.getDay();
        console.log({day});

        return new Array(arrayLength).fill(0).map((_, index) => {
            const dayFormat = isMonthView ? 'd' : 'EEE';
            const dayModifier = isMonthView ? 1 : 0;
            return {
                dayName: format(addDays(currentDateObject, index + dayModifier - currentDayIndex), dayFormat),
                date: format(addDays(currentDateObject, index + dayModifier - currentDayIndex), 'dd/MM/yyyy')
            };
        });
    }, [date, isMonthView]);

    console.log({weekDays});

    const checkboxTrackers = useMemo(() => {
        return Object.values(Trackers).filter(tracker => tracker.type === TrackerType.CHECKBOX);
    }, []);

    return (
        <div className="grid grid-cols-1 gap-2 justify-center m-auto w-full text-black dark:text-white">
            <button className="my-2" onClick={() => setIsMonthView(!isMonthView)}>
                This {isMonthView ? "Month" : "Week"}
            </button>
            <div className="flex gap-px w-full text-[10px] font-mono">
                {weekDays.map(({dayName}, index) => {
                    return <span key={index} className="w-12 flex-grow">{dayName}</span>
                })}
            </div>
            {checkboxTrackers.map(tracker => {
                const Icon = tracker.icon;
                return (
                    <div key={tracker.name} className="my-2">
                        <h1 className="flex items-center gap-2 mb-1">
                            <Icon size={20}/> {tracker.name}
                        </h1>
                        <div className={classNames({
                            "flex w-full": true,
                            "gap-1": !isMonthView,
                            "gap-px": isMonthView,
                        })}>
                            {weekDays.map(({date: weekDate}, index) => {
                                return (
                                    <Checkbox
                                        id={tracker.id}
                                        key={index}
                                        label={tracker.name}
                                        isSuccessMessage={tracker.isSuccessMessage}
                                        isFailureMessage={tracker.isFailureMessage}
                                        isPositive={tracker.isPositive}
                                        icon={tracker.icon}
                                        isHighlighted={weekDate === date}
                                        date={weekDate}
                                        isChecked={tracker.isChecked}/>
                                );
                            })}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}