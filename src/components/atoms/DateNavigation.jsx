import {ONE_DAY} from "../../constants";
import {ArrowSquareLeft, ArrowSquareRight} from "@phosphor-icons/react";
import {format} from "date-fns";
import classNames from "classnames";

export const DateNavigation = ({dateObject, setDateObject, dateLabel, setDateLabel}) => {
    return (
        <div
            className={classNames({
                "fixed top-0 z-10 bg-gray-50 dark:bg-gray-900 h-16 left-0 w-screen flex justify-evenly items-center": true,
                "text-black dark:text-white": true,
            })}>
            <button
                className="text-xl p-4 w-1/3 flex justify-center items-center"
                onClick={() => {
                    const newDate = new Date(dateObject.getTime() - ONE_DAY);
                    setDateLabel(newDate.toLocaleDateString("en-IL"));
                    setDateObject(newDate);
                }}>
                <ArrowSquareLeft size={32} weight="fill"/>
            </button>
            <div className="flex justify-center items-center flex-col">
                <h1>{dateLabel}</h1>
                <h2 className="text-lg">{format(dateObject, "EEEE")}</h2>
            </div>
            <button
                className="text-xl p-4 w-1/3 flex justify-center items-center"
                onClick={() => {
                    const newDate = new Date(dateObject.getTime() + ONE_DAY);
                    setDateLabel(newDate.toLocaleDateString("en-IL"));
                    setDateObject(newDate);
                }}>
                <ArrowSquareRight size={32} weight="fill"/>
            </button>
        </div>
    );
};
