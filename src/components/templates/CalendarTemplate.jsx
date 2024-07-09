import {DayOfYear} from "../atoms/DayOfYear";
import {MonthDays} from "../molecules/MonthDays";
import {useEffect, useMemo, useRef, useState} from "react";
import {getFirstDayOfYearIndex} from "../../utils";
import {format} from "date-fns";
import classNames from "classnames";
import {MonthsColors} from "../../constants";

export const CalendarTemplate = ({title = "", data = [], date, onClick}) => {
        const ref = useRef();
        const [monthName, setMonthName] = useState("");
        const [monthNumber, setMonthNumber] = useState(0);
        const [monthsCount] = useState(new Array(12).fill(0));
        const extraDays = useMemo(() => {
            const startOfYearExtraDays = getFirstDayOfYearIndex(new Date().getFullYear());
            return new Array(startOfYearExtraDays).fill(0).map((_) => _);
        }, []);

        useEffect(() => {
            if (!ref.current) return;
            setMonthName(new Date().toLocaleDateString("en-IL", {month: "long"}));
            const weekOfYear = format(new Date(), "I");

            ref.current.scrollTo({
                top: weekOfYear * 40,
                behavior: "smooth",
            });

            ref.current.addEventListener("scroll", () => {
                const percentage = ref.current.scrollTop / ref.current.clientHeight;
                const monthIndex = Math.floor(percentage * 40 / 12);
                const month = new Date().setMonth(monthIndex);
                setMonthNumber(monthIndex);
                setMonthName(format(month, "MMMM"));
            });
        }, [ref]);

        return (
            <section className="w-full">
                <div className="w-full flex flex-col text-center font-mono text-xl text-white my-4">
                    <h2 className={classNames({
                        "text-5xl": true,
                        [MonthsColors[monthNumber]]: true,
                    })}>
                        {monthName}
                    </h2>
                    <h1 className="text-sm">{title}</h1>
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
                                onClick={onClick}
                                dayInMonthIndex={index + 1}
                            />
                        );
                    })}
                    {monthsCount.map((_, index) => {
                        return (
                            <MonthDays
                                key={index}
                                logs={data}
                                onClick={onClick}
                                count={index}
                            />
                        );
                    })}
                </div>
            </section>
        );
    }
;