import {useEffect, useState} from "react";
import {updateExpectation, updateHourlyIsApproved, updateReality} from "../../utils/db";
import classNames from "classnames";

export const HourlyTypes = {
    UNKNOWN: "Unknown",
    MISMATCH: "Mismatch",
    PARTIAL: "Partial",
    FULFILLED: "Fulfilled"
};

const Hour = ({value, ...rest}) => {
    return (
        <div
            {...rest}
            className={classNames({
                "w-12 text-[10px] py-2 flex gap-2 justify-center items-start": true,
                "bg-transparent dark:bg-gray-700": true,
                "text-black dark:text-white": true,
            })}>
            {value}
        </div>
    );
};

const LogEntry = ({children, isActive}) => {
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
    const [reality, setReality] = useState(initReality || "");
    const [expectation, setExpectation] = useState(initExpectation || "");
    const [isApproved, setIsApproved] = useState(initIsApproved);
    const [message, setMessage] = useState("");

    useEffect(() => {
        setReality(initReality);
    }, [initReality]);

    useEffect(() => {
        setIsApproved(initIsApproved);
    }, [initIsApproved]);

    useEffect(() => {
        if (initReality !== "") setReality(initReality);
        if (initExpectation !== "") setExpectation(initExpectation);
    }, [initReality, initExpectation]);

    useEffect(() => {
        setTimeout(() => setMessage(""), 5000);
    }, [reality, expectation]);

    return (
        <>
            <div className="flex items start gap-1 w-full overflow-hidden">
                <Hour
                    value={hour}
                    onClick={() => {
                        setIsApproved(!isApproved);
                        updateHourlyIsApproved(id, !isApproved)
                            .then(data => console.info("Updated isApproved", data))
                            .catch(error => console.error("Failed to update isApproved", error))
                            .finally(refetch);
                    }}/>
                <div className="flex flex-col gap-1 rounded-lg overflow-hidden w-full border-2">
                    <LogEntry isActive>
                    <textarea
                        className="w-full h-full text-xs bg-transparent"
                        value={reality}
                        placeholder="Thoughts..."
                        onChange={event => {
                            const value = event.target.value;
                            setReality(value);
                        }}
                        onBlur={event => {
                            const value = event.target.value;
                            if (value === initReality)
                                return;

                            updateReality(date, hour, value)
                                .then(data => setMessage(`${date} ${hour} ${value.slice(-10)} saved!`))
                                .catch(error => setMessage("Failed to update reality"));

                            onEntryComplete();
                        }}
                    />
                    </LogEntry>
                    <LogEntry isActive={isApproved === false}>
                    <textarea
                        className="w-full h-full text-wrap text-xs bg-transparent"
                        value={expectation}
                        placeholder="Anything else..."
                        onChange={event => {
                            const value = event.target.value;
                            setExpectation(value);
                        }}
                        onBlur={(event) => {
                            const value = event.target.value;
                            if (value === initExpectation)
                                return;

                            updateExpectation(date, hour, value)
                                .then(data => setMessage(`${date} ${hour} ${value.slice(-10)} saved!`))
                                .catch(error => setMessage("Failed to update expectation"));
                        }}/>
                    </LogEntry>
                </div>
            </div>
            <div
                className={classNames({
                    "transition-all duration-300 ease-in-out": true,
                    "shadow-lg": true,
                    "flex items-center justify-center gap-2": true,
                    "text-xs text-center fixed inset-x-0 m-auto bottom-32 bg-black text-white rounded-full p-4 w-fit h-5": true,
                    "opacity-0": !message,
                    "opacity-100": message,
                    "pointer-events-none": true,
                })}>
                {message}
            </div>
        </>
    )
}