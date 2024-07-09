import { getDaysInMonth } from "date-fns";
import { DayOfYear } from "../atoms/DayOfYear";

export const MonthDays = ({ count = 0, logs }) => {
  const year = new Date().getFullYear();
  const daysInMonth = getDaysInMonth(new Date(year, count, 1));
  
  return (
    <>
      {new Array(daysInMonth).fill(0).map((_, index) => {
        const now = new Date().toLocaleDateString("en-IL");
        const date = new Date(
          year,
          count,
          index + 1,
        ).toLocaleDateString("en-IL");
        const currentDayLog = logs.find((log) => log.date === date);
        
        return (
          <DayOfYear
            key={date}
            now={now}
            date={date}
            isEven={count % 2 === 0}
            id={currentDayLog?.id}
            isLastInMonth={index === daysInMonth - 1}
            dayInMonthIndex={index + 1}
            isTargetMet={
              currentDayLog ? currentDayLog.isMet : null
            }
          />
        );
      })}
    </>
  );
};