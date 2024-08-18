import { useEffect, useState } from "react";
import { DbTables, getLogs, setLog } from "../../utils/db";
import classNames from "classnames";

export const Checkbox = ({
    id,
    label,
    date,
    isChecked: initIsChecked = null,
    isPositive,
    isHighlighted,
    isDayView,
}) => {
    const [isChecked, setIsChecked] = useState(initIsChecked);
    const showPositive = (isChecked && isPositive) || (!isChecked && !isPositive);
    
    useEffect(() => {
        const key = DbTables[label];
        if (!key || !date) {
            return;
        }
        
        console.warn("API CALL");
        getLogs(DbTables[label], date).then(data => {
            if (data.length === 0) {
                setIsChecked(null);
                return;
            }
            
            console.log({ data });
            setIsChecked(data[0].isMet);
        });
    }, [date, label]);
    
    return (
        <button
            onClick={async () => {
                setIsChecked(!isChecked);
                try {
                    await setLog(DbTables[label], date, !isChecked, id);
                } catch (error) {
                    console.error(error, date, label, isChecked);
                }
            }}
            className={classNames({
                "flex-grow": true,
                "h-6": true,
                "border-none": isDayView,
                "border-gray-300": !isHighlighted,
                "border-2 border-black rounded-lg dark:border-white": isHighlighted,
                "bg-gray-200 dark:bg-slate-50/10": isChecked === null,
                "bg-amber-400 dark:bg-amber-500 text-black": isChecked !== null && showPositive,
                "bg-neutral-600 dark:bg-neutral-500 text-black": isChecked !== null && !showPositive,
            })}>
        </button>
    )
}