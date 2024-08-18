import { useMemo, useState } from "react";
import { Trackers, TrackerType } from "../../constants";
import { Checkbox } from "../atoms/Checkbox";
import { format, addDays, getDaysInMonth } from "date-fns";
import classNames from "classnames";

const Button = ({ children, isSelected, onClick }) => {
    return (
        <button
            className={classNames({
                "py-1 px-2 rounded-full": true,
                "bg-black dark:bg-white text-white dark:text-black": isSelected,
                "bg-white dark:bg-neutral-700 text-black dark:text-white": !isSelected,
            })}
            onClick={onClick}>
            {children}
        </button>
    );
};

const View = {
    DAY: 'DAY',
    WEEK: 'WEEK',
    MONTH: 'MONTH',
};

export const HabitTemplate = ({ date }) => {
    const [view, setView] = useState(View.DAY);
    const weekDays = useMemo(() => {
        const dateSplit = date.split('/');
        const year = Number(dateSplit[2]);
        const month = Number(dateSplit[1]) - 1;
        const day = Number(dateSplit[0]);
        const currentDateObject = new Date(year, month, day);
        const daysInCurrentMonth = getDaysInMonth(currentDateObject);
        
        let arrayLength = 0;
        let currentDayIndex = 0;
        
        if (view === View.DAY) {
            arrayLength = 1;
            currentDayIndex = currentDateObject.getDay();
        }
        
        if (view === View.WEEK) {
            arrayLength = 7;
            currentDayIndex = currentDateObject.getDay();
        }
        
        if (view === View.MONTH) {
            arrayLength = daysInCurrentMonth;
            currentDayIndex = currentDateObject.getDay();
        }
        
        return new Array(arrayLength).fill(0).map((_, index) => {
            const dayFormat = view === View.MONTH ? 'd' : 'EEE';
            const dayModifier = view === View.MONTH ? 1 : 0;
            return {
                dayName: format(addDays(currentDateObject, index + dayModifier - currentDayIndex), dayFormat),
                date: format(addDays(currentDateObject, index + dayModifier - currentDayIndex), 'dd/MM/yyyy')
            };
        });
    }, [date, view]);
    
    const checkboxTrackers = useMemo(() => {
        return Object.values(Trackers).filter(tracker => tracker.type === TrackerType.CHECKBOX);
    }, []);
    
    return (
        <div className="grid grid-cols-1 gap-2 justify-center m-auto w-full text-black dark:text-white">
            <div className="flex gap-2">
                <Button
                    isSelected={view === View.DAY}
                    onClick={() => setView(View.DAY)}>
                    Day
                </Button>
                <Button
                    isSelected={view === View.WEEK}
                    onClick={() => setView(View.WEEK)}>
                    Week
                </Button>
                <Button
                    isSelected={view === View.MONTH}
                    onClick={() => setView(View.MONTH)}>
                    Month
                </Button>
            </div>
            <div className="flex gap-px w-full text-[10px] font-mono">
                {weekDays.map(({ dayName }, index) => {
                    return <span key={index} className="w-12 flex-grow">{dayName}</span>
                })}
            </div>
            {checkboxTrackers.map(tracker => {
                const Icon = tracker.icon;
                return (
                    <div key={tracker.name}
                         className="flex flex-col gap-1 bg-white dark:bg-neutral-700 border-2 dark:border-black rounded-xl p-2">
                        <h1 className="flex items-center gap-1 text-sm">
                            <Icon/><span className="">{tracker.name}</span>
                        </h1>
                        <div className={classNames({
                            "flex w-full rounded-lg overflow-hidden": true,
                            "flex-col": view === View.DAY,
                            "gap-[2px]": view !== View.MONTH,
                            "gap-px": view === View.MONTH,
                        })}>
                            {weekDays.map(({ date: weekDate }, index) => {
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