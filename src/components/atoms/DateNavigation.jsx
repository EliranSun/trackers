import { ONE_DAY } from "../../constants";
import { ArrowSquareLeft, ArrowSquareRight } from "@phosphor-icons/react";

export const DateNavigation = ({ dateObject, setDateObject, dateLabel, setDateLabel }) => {
  return (
    <div className="fixed top-0 z-10 bg-gray-900 h-16 left-0 w-screen flex justify-evenly items-center">
      <button
        className="text-xl p-4 w-1/3 flex justify-center items-center"
        onClick={() => {
          const newDate = new Date(dateObject.getTime() - ONE_DAY);
          setDateLabel(newDate.toLocaleDateString("en-IL"));
          setDateObject(newDate);
        }}>
        <ArrowSquareLeft size={32} weight="fill"/>
      </button>
      <h1 className="">{dateLabel}</h1>
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
