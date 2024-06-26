import classNames from "classnames";
import { useCallback, useEffect, useState } from "react";
import { Measurements } from "./Measurements";
import { Measurement } from "./Measurement";
import { getHourlyLogs, InstantiateHours, updateExpectation } from "../utils/db";

const getHours = () => new Array(24).fill(0).map((_, i) => {
  const adjustedIndex = i + 7;
  
  if (adjustedIndex > 23) {
    return `0${adjustedIndex - 24}:00`;
  }
  
  if (adjustedIndex > 9) {
    return `${adjustedIndex}:00`;
  }
  
  return `0${adjustedIndex}:00`;
});

const HourlyTypes = {
  UNKNOWN: "Unknown",
  MISMATCH: "Mismatch",
  FULFILLED: "Fulfilled"
};


const Entry = ({ hour, reality, expectation, onEntryComplete }) => {
  const [status, setStatus] = useState(HourlyTypes.UNKNOWN);
  const [reality, setReality] = useState(reality || "");
  const [expectation, setExpectation] = useState(expectation || "");
  
  return (
    <div className="flex gap-1 w-full">
      <div className="w-1/6 p-2 bg-white/10">
        {hour}
      </div>
      <div className="flex flex-col gap-px w-full">
        <div key={`${hour}-expectation`} className="bg-white/10 h-16 px-2">
          <input
            type="text"
            className="w-full h-full bg-transparent"
            value={expectation}
            onChange={event => {
              const value = event.target.value;
              setExpectation(value);
            }}
            onBlur={(event) => {
              const value = event.target.value;
              updateExpectation(date, hour, value)
                .then(data => console.info("Updated expectation", data))
                .catch(error => console.error("Failed to update expectation", error));
            }}/>
        </div>
        <div key={`${hour}-reality`} className="bg-white/10 h-16 px-2">
          <input
            type="text"
            className="w-full h-full bg-transparent"
            value={reality}
            onChange={event => {
              const value = event.target.value;
              setReality(value);
            }}
            onBlur={event => {
              const value = event.target.value;
              const newStatus = value === expectation ? HourlyTypes.FULFILLED : HourlyTypes.MISMATCH;
              setStatus(newStatus);
              onEntryComplete(newStatus);
            }}
          />
        </div>
      </div>
      <div className={classNames({
        "w-1/12 p-2 bg-white/10": true,
        "bg-gray-200": status === HourlyTypes.UNKNOWN,
      })}/>
    </div>
  )
}

export const RealityVsExpectationView = ({ date }) => {
  const [fulfilledPercentage, setFulfilledPercentage] = useState(0);
  const [hourlyData, setHourlyData] = useState(getHours().map(hour => ({
    hour,
    reality: "",
    expectation: "",
  })));
  
  const fetch = useCallback(async () => {
    getHourlyLogs(date).then(data => {
      if (data.length === 0) {
        console.info(`No data found for ${date} Instantiating hours...`);
        InstantiateHours(date, getHours());
      } else {
        console.info(`Fetched hourly data for ${date}`, data);
        setHourlyData(data);
      }
    });
  }, [date]);
  
  useEffect(() => {
    fetch();
  }, [date]);
  
  return (
    <section className="flex flex-col w-screen px-4 gap-1">
      <Measurements>
        <Measurement
          name="Fulfilled"
          value={fulfilledPercentage}
          range={[1, 100]}/>
        <Measurement
          name="Mismatch"
          value={100 - fulfilledPercentage}
          range={[-1, 0]}/>
        <Measurement
          name="Unknown"
          value={100 - fulfilledPercentage}
          range={[-1, 0]}/>
      </Measurements>
      {hourlyData.map(({ hour, reality, expectation }) =>
        <Entry
          hour={hour}
          reality={reality}
          expectation={expectation}
          onEntryComplete={(status) => {
            if (status === HourlyTypes.FULFILLED) {
              setFulfilledPercentage(prev => prev + 1);
            }
          }}
        />)}
    </section>
  )
};