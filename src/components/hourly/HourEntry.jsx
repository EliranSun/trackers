import { useEffect, useState } from "react";
import { updateExpectation, updateReality } from "../../utils/db";
import classNames from "classnames";

export const HourlyTypes = {
  UNKNOWN: "Unknown",
  MISMATCH: "Mismatch",
  FULFILLED: "Fulfilled"
};
export const HourEntry = ({ date, hour, reality: initReality, expectation: initExpectation, onEntryComplete }) => {
  const [status, setStatus] = useState(HourlyTypes.UNKNOWN);
  const [reality, setReality] = useState(initReality || "");
  const [expectation, setExpectation] = useState(initExpectation || "");
  
  useEffect(() => {
    if (initReality !== "") setReality(initReality);
    if (initExpectation !== "") setExpectation(initExpectation);
    
    if (initReality && initExpectation) {
      setStatus(initReality === initExpectation ? HourlyTypes.FULFILLED : HourlyTypes.MISMATCH);
    }
  }, [initReality, initExpectation]);
  
  return (
    <div className="flex gap-1 w-full">
      <div className={classNames({
        "w-1/6 p-2 bg-white/10": true,
        "bg-gray-200": status === HourlyTypes.UNKNOWN,
        "bg-red-500": status === HourlyTypes.MISMATCH,
        "bg-green-500": status === HourlyTypes.FULFILLED,
      })}>
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
              updateReality(date, hour, value)
                .then(data => console.info("Updated reality", data))
                .catch(error => console.error("Failed to update reality", error));
              
              const isFulfilled = value === expectation ? HourlyTypes.FULFILLED : HourlyTypes.MISMATCH;
              setStatus(isFulfilled);
              onEntryComplete();
            }}
          />
        </div>
      </div>
    
    </div>
  )
}