import {useEffect, useState} from "react";
import {DbTables, getLogs, setLog} from "../../utils/db";
import classNames from "classnames";

export const Checkbox = ({
                             id,
                             label,
                             date,
                             isChecked: initIsChecked = null,
                             isFailureMessage,
                             isSuccessMessage,
                             isPositive,
                             isHighlighted,
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
                // "border-2 font-mono": true,
                "bg-gray-200": isChecked === null,
                "border-gray-300": !isHighlighted,
                "border-2 border-black": isHighlighted,
                "bg-green-300 text-black": isChecked !== null && showPositive,
                "bg-red-300 text-black": isChecked !== null && !showPositive,
            })}>
            {/*<span className="opacity-40">{date}</span>*/}
            {/*{isChecked !== null ?*/}
            {/*    <h2 className="text-xs">*/}
            {/*        {showPositive ? isSuccessMessage : isFailureMessage}*/}
            {/*    </h2> : null}*/}
        </button>
    )
}