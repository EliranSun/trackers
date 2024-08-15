import { useEffect, useState } from "react";
import { updateExpectation, updateHourlyIsApproved, updateReality } from "../../utils/db";
import classNames from "classnames";

export const HourlyTypes = {
    UNKNOWN: "Unknown",
    MISMATCH: "Mismatch",
    PARTIAL: "Partial",
    FULFILLED: "Fulfilled"
};

const Hour = ({ value, ...rest }) => {
    /*
    * 
                {(isApproved === null || isApproved === undefined)
                    ? <Circle size={32}/>
                    : isApproved
                        ? <CheckCircle size={32} weight="fill" color="green"/>
                        : <XCircle size={32} weight="fill" color="tomato"/>}
    * */
    
    return (
        <div
            {...rest}
            className={classNames({
                "w-1/3 p-2 flex gap-2 justify-center items-center": true,
                "bg-white dark:bg-gray-700": true,
                "text-black dark:text-white": true,
            })}>
            {value}
        </div>
    );
};

const LogEntry = ({ children, isActive }) => {
    if (!isActive) {
        return null;
    }
    
    return (
        <div className="bg-white text-black dark:text-white dark:bg-gray-700 p-2 h-16 font-mono">
            {children}
        </div>
    );
};

export const HourEntry = ({
    id,
    date,
    hour,
    reality: initReality,
    expectation: initExpectation,
    isApproved: initIsApproved,
    onEntryComplete,
    refetch,
}) => {
    const [status, setStatus] = useState(HourlyTypes.UNKNOWN);
    const [reality, setReality] = useState(initReality || "");
    const [expectation, setExpectation] = useState(initExpectation || "");
    const [isApproved, setIsApproved] = useState(initIsApproved);
    
    useEffect(() => {
        setReality(initReality);
    }, [initReality]);
    
    useEffect(() => {
        setIsApproved(initIsApproved);
    }, [initIsApproved]);
    
    useEffect(() => {
        if (initReality !== "") setReality(initReality);
        if (initExpectation !== "") setExpectation(initExpectation);
        
        if (initReality && initExpectation) {
            const fullMatch = initReality.toLowerCase() === initExpectation.toLowerCase();
            const partialMatch = initReality.replace(",", "").split(" ").some(word => {
                return initExpectation.replace(",", "").toLowerCase().split(" ").includes(word.replace(",", "").toLowerCase());
            });
            
            if (fullMatch) {
                setStatus(HourlyTypes.FULFILLED);
            } else if (partialMatch) {
                setStatus(HourlyTypes.PARTIAL);
            } else {
                setStatus(HourlyTypes.MISMATCH);
            }
        }
    }, [initReality, initExpectation]);
    
    return (
        <div className="flex gap-1 w-full rounded-lg overflow-hidden border">
            <Hour
                value={hour}
                onClick={() => {
                    setIsApproved(!isApproved);
                    updateHourlyIsApproved(id, !isApproved)
                        .then(data => console.info("Updated isApproved", data))
                        .catch(error => console.error("Failed to update isApproved", error))
                        .finally(refetch);
                }}/>
            <div className="flex flex-col gap-1 w-full">
                <LogEntry isActive>
                    <textarea
                        className="w-full h-full text-xs bg-transparent"
                        value={reality}
                        placeholder="Reality"
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
                </LogEntry>
                <LogEntry isActive={isApproved === false}>
                    <textarea
                        className="w-full h-full text-wrap text-xs bg-transparent"
                        value={expectation}
                        placeholder="What would you do instead?"
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
                </LogEntry>
            </div>
        </div>
    )
}