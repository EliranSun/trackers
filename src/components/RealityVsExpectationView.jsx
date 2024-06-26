import classNames from "classnames";
import { useState } from "react";
import { Measurements } from "./Measurements";
import { Measurement } from "./Measurement";
import { setData } from "../utils/storage";
import { TrackerNames } from "../constants";

const hours = new Array(24).fill(0).map((_, i) => {
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

const EXPECTATION_ENTRY_KEY = "expectation";
const REALITY_ENTRY_KEY = "reality";

const Entry = ({ date, hour, rowIndex, onEntryComplete }) => {
  const [status, setStatus] = useState(HourlyTypes.UNKNOWN);
  const [reality, setReality] = useState("");
  const [expectation, setExpectation] = useState("");
  
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
            onBlur={(event) => {
              const key = TrackerNames.HOURLY.toLowerCase();
              const value = event.target.value;
              setData(date, key, rowIndex, EXPECTATION_ENTRY_KEY, value);
              setExpectation(value);
            }}/>
        </div>
        <div key={`${hour}-reality`} className="bg-white/10 h-16 px-2">
          <input
            type="text"
            className="w-full h-full bg-transparent"
            onBlur={event => {
              const key = TrackerNames.HOURLY.toLowerCase();
              const value = event.target.value;
              setData(date, key, rowIndex, REALITY_ENTRY_KEY, value);
              setReality(value);
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
      {hours.map((hour, index) =>
        <Entry
          hour={hour}
          date={date}
          rowIndex={index}
          onEntryComplete={(status) => {
            if (status === HourlyTypes.FULFILLED) {
              setFulfilledPercentage(prev => prev + 1);
            }
          }}
        />)}
    </section>
  )
};