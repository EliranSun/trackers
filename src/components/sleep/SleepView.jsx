import {useEffect, useMemo, useRef, useState} from "react";
import {getSleepLogs} from "../../utils/db";
import {MonthDays} from "./MonthDays";
import {getFirstDayOfYearIndex} from "../../utils";
import {DayOfYear} from "./DayOfYear";
import {format} from "date-fns";

const DAY_HEIGHT = 50;

export const SleepView = ({date}) => {
    const ref = useRef();
    const [sleepLogs, setSleepLogs] = useState([]);
    const [monthName, setMonthName] = useState("");
    const [monthsCount] = useState(new Array(12).fill(0));
    const extraDays = useMemo(() => {
        const startOfYearExtraDays = getFirstDayOfYearIndex(new Date().getFullYear());
        return new Array(startOfYearExtraDays).fill(0).map((_, index) => _);
    }, []);

    useEffect(() => {
        if (!ref.current) return;
        setMonthName(new Date().toLocaleDateString("en-IL", {month: "long"}));
        const weekOfYear = format(new Date(), "I");

        console.log(weekOfYear);

        ref.current.scrollTo({
            top: weekOfYear * 40,
            behavior: "smooth",
        });

        ref.current.addEventListener("scroll", () => {
            const percentage = ref.current.scrollTop / ref.current.clientHeight;
            const monthIndex = Math.floor(percentage * 40 / 12);
            const month = new Date().setMonth(monthIndex);
            setMonthName(format(month, "MMMM"));
        });

        return () => {
            // ref.current.removeEventListener("scroll", () => {
            // });
        }
    }, [ref]);

    useEffect(() => {
        getSleepLogs().then((logs) => {
            setSleepLogs(logs);
        });
    }, []);

    return (
        <section className="w-full">
            <div className="w-full flex flex-col text-center font-mono text-xl text-white my-4">
                <h2 className="text-5xl">
                    {monthName}
                </h2>
                <h1 className="text-sm">8 hours sleep</h1>
            </div>
            <div className="sticky top-0 font-mono w-full flex justify-evenly font-sm">
                <span>Sun</span>
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
            </div>
            <div
                ref={ref}
                className="relative m-auto h-[60vh] overflow-y-auto w-full grid grid-cols-7 gap-1">
                {extraDays.map((_, index) => {
                    return (
                        <DayOfYear
                            key={index}
                            date={date}
                            dayInMonthIndex={index + 1}
                        />
                    );
                })}
                {monthsCount.map((_, index) => {
                    return (
                        <MonthDays
                            key={index}
                            logs={sleepLogs}
                            count={index}
                        />
                    );
                })}
            </div>
        </section>
    );
};
