import {useEffect, useState} from "react";
import {setSleepLog} from "../../utils/db";
import classNames from "classnames";

export const DayOfYear = ({
                              id,
                              isTargetMet: initIsTargetMet,
                              date,
                              now,
                              dayInMonthIndex,
                              isLastInMonth,
                              isEven,
                          }) => {
    const [isTargetMet, setIsTargetMet] = useState(null);

    useEffect(() => {
        setIsTargetMet(initIsTargetMet);
    }, [initIsTargetMet]);

    return (
        <div
            onClick={async () => {
                setIsTargetMet(!isTargetMet);
                try {
                    await setSleepLog(date, !isTargetMet, id);
                    console.info("Sleep log updated");
                } catch (error) {
                    console.error(error);
                }
            }}
            className={classNames({
                "bg-gray-800": isTargetMet === null && !isEven,
                "bg-gray-700": isTargetMet === null && isEven,
                "w-full h-10": true,
                // "opacity-0": dayInMonthIndex === 0,
                "text-xs text-white/80 flex justify-center items-center": true,
                "bg-green-500": isTargetMet,
                "bg-red-500": isTargetMet === false,
                "border-4 border-white": date === now,
                "cursor-pointer": true,
            })}
        >
            {dayInMonthIndex}
        </div>
    );
};