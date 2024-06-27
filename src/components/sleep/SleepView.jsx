import {useEffect, useMemo, useRef, useState} from "react";
import {get, format, getDaysInMonth} from "date-fns";
import classNames from "classnames";
import {getSleepLogs, setSleepLog} from "../../utils/db";

const DayInYear = ({monthCount, todayIndex, dayInMonthIndex}) => {
    const [isTargetMet, setIsTargetMet] = useState(false);

    return (
        <div
            onClick={() => {
                setIsTargetMet(!isTargetMet);
                setSleepLog(`${todayIndex}/${monthCount}/2024`, !isTargetMet);
            }}
            className={classNames({
                "text-xs text-white/80 flex justify-center items-center size-10": true,
                "bg-green-500": isTargetMet,
                "bg-gray-600": !isTargetMet,
                "animate-pulse": todayIndex === monthCount * dayInMonthIndex,
                "cursor-pointer": true,
            })}>
            {dayInMonthIndex}
        </div>
    )
};

const MonthDays = ({count = 0, todayIndex}) => {
    const monthName = format(new Date(2021, count, 1), "MMMM");
    const daysInMonth = getDaysInMonth(new Date(2021, count, 1));

    return (
        <div>
            <h3>{monthName}</h3>
            <div className="flex flex-wrap m-auto gap-1 overflow-y-auto w-80">
                {new Array(daysInMonth)
                    .fill(0)
                    .map((_, index) => {
                        return (
                            <DayInYear
                                key={index}
                                monthCount={count}
                                dayInMonthIndex={index + 1}
                                todayIndex={todayIndex}/>
                        );
                    })}
            </div>
        </div>
    )

}

export const SleepView = ({date}) => {
    const [sleepLogs, setSleepLogs] = useState([]);
    const ref = useRef();
    const [monthsCount] = useState(new Array(12).fill(0));
    const todayIndex = useMemo(() => {
        return new Date().getDate() * new Date().getMonth();
    }, []);

    useEffect(() => {
        ref.current.scrollTo(0, todayIndex * 9)
    }, []);

    useEffect(() => {
        getSleepLogs(date).then(logs => {
            setSleepLogs(logs);
        });
    }, [date]);

    return (
        <section className="w-full">
            <div className="w-full flex justify-between font-mono text-5xl text-white my-4">
                <h1 className="">8 hours sleep</h1>
                <h2 className="">{monthsCount.length} months, {todayIndex}</h2>
            </div>
            <div
                ref={ref}
                className="flex flex-wrap m-auto gap-1 h-[60vh] overflow-y-auto w-80">
                {monthsCount.map((_, index) => {
                    return (
                        <MonthDays
                            key={index}
                            todayIndex={todayIndex}
                            count={index}/>
                    );
                })}
            </div>
        </section>
    )
};