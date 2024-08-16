import {ONE_DAY} from "../../constants";
import {ArrowSquareLeft, ArrowSquareRight} from "@phosphor-icons/react";
import {format} from "date-fns";
import classNames from "classnames";

export const DateNavigation = ({dateObject, setDateObject, dateLabel, setDateLabel}) => {
    return (
        <div
            className={classNames({
                "w-screen": true,
                "fixed top-0 z-10 h-10 left-0 p-2 px-8": true,
                "text-black dark:text-white": true,
                "flex justify-between items-center": true,
                "bg-[#fcd34d] dark:bg-amber-500": true,
            })}>
            <div className="flex items-center font-bold gap-2">
                <span>🪵</span>
                <h2>{format(dateObject, "EEEE")},</h2>
                <h1>{dateLabel}</h1>
            </div>
            <div className="flex gap-2">
                <button onClick={() => {
                    const newDate = new Date(dateObject.getTime() - ONE_DAY);
                    setDateLabel(newDate.toLocaleDateString("en-IL"));
                    setDateObject(newDate);
                }}>
                    <ArrowSquareLeft size={32} weight="fill"/>
                </button>
                <button onClick={() => {
                    const newDate = new Date(dateObject.getTime() + ONE_DAY);
                    setDateLabel(newDate.toLocaleDateString("en-IL"));
                    setDateObject(newDate);
                }}>
                    <ArrowSquareRight size={32} weight="fill"/>
                </button>
            </div>
        </div>
    );
};
