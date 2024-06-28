import {useEffect, useMemo, useRef, useState} from "react";
import {format, getDaysInMonth} from "date-fns";
import classNames from "classnames";
import {getSleepLogs, setSleepLog} from "../../utils/db";

const DayInYear = ({
                       id,
                       isTargetMet: initIsTargetMet,
                       date,
                       now,
                       dayInMonthIndex
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
                "opacity-0": dayInMonthIndex === 0,
                "text-xs text-white/80 flex justify-center items-center size-14": true,
                "bg-green-500": isTargetMet,
                "bg-red-500": isTargetMet === false,
                "bg-gray-600": isTargetMet === null,
                "border-2 border-white": date === now,
                "cursor-pointer": true,
            })}>
            {dayInMonthIndex}
        </div>
    )
};

const MonthDays = ({count = 0, todayIndex, logs}) => {
    const year = new Date().getFullYear();
    const daysFromPreviousMonth = getDaysInMonth(new Date(year, count - 1, 1)) % 7;
    const monthName = format(new Date(year, count, 1), "MMMM");
    const daysInMonth = getDaysInMonth(new Date(year, count, 1));

    return (
        <div>
            <h3 className="font-mono text-xl mt-6">{monthName}</h3>
            <div className="flex flex-wrap m-auto gap-1 overflow-y-auto">
                {new Array(daysInMonth)
                    .fill(0)
                    .map((_, index) => {
                        const now = new Date().toLocaleDateString("en-IL");
                        const date = new Date(year, count, index + 1).toLocaleDateString("en-IL");
                        const currentDayLog = logs.find(log => log.date === date);

                        return (
                            <DayInYear
                                key={date}
                                now={now}
                                date={date}
                                id={currentDayLog?.id}
                                isTargetMet={currentDayLog ? currentDayLog.isMet : null}
                                dayInMonthIndex={index + 1}
                            />
                        );
                    })}
            </div>
        </div>
    )

}

const DAY_HEIGHT = 12;

export const SleepView = ({date}) => {
    const [sleepLogs, setSleepLogs] = useState([]);
    const ref = useRef();
    const [monthsCount] = useState(new Array(12).fill(0));
    const todayIndex = useMemo(() => {
        return new Date().getDate() * new Date().getMonth();
    }, []);

    useEffect(() => {
        if (!ref.current) return;

        ref.current.scrollTo({
            top: todayIndex * DAY_HEIGHT,
            behavior: "smooth",
        });
    }, [ref]);

    useEffect(() => {
        getSleepLogs().then(logs => {
            setSleepLogs(logs);
        });
    }, []);

    return (
        <section className="w-full">
            <div className="w-full flex flex-col text-center font-mono text-xl text-white my-4">
                <h1 className="">8 hours sleep</h1>
                <h2 className="">{monthsCount.length} months, {todayIndex}</h2>
            </div>
            <div
                ref={ref}
                className="flex flex-wrap m-auto gap-1 h-[60vh] overflow-y-auto w-[calc(60px*7)]">
                {monthsCount.map((_, index) => {
                    return (
                        <MonthDays
                            key={index}
                            logs={sleepLogs}
                            todayIndex={todayIndex}
                            count={index}/>
                    );
                })}
            </div>
        </section>
    )
};