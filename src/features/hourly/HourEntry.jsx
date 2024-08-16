import {useCallback, useEffect, useState} from "react";
import {updateExpectation, updateHourlyIsApproved, updateReality} from "../../utils/db";
import classNames from "classnames";
import {Disc, FloppyDisk, X} from "@phosphor-icons/react";

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
                "bg-transparent": true,
                "w-12 text-[10px] py-2 flex gap-2 justify-center items-start": true,
                "text-black dark:text-white": true,
            })}>
            {value}
        </div>
    );
};

const LogEntry = ({value, isSecondary}) => {
    if (isSecondary && !value) {
        return null;
    }

    return (
        <p className="bg-white text-left text-xs text-black dark:text-white dark:bg-neutral-700 p-2 h-16 font-mono overflow-y-auto">
            {value}
        </p>
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
    const [isLoading, setIsLoading] = useState(false);
    const [isAddEntryModalOpen, setIsAddEntryModalOpen] = useState(false);
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
        if (message) {
            setTimeout(() => setMessage(""), 5000);
        }
    }, [message]);

    const SaveIcon = isLoading ? Disc : FloppyDisk;

    const saveEntry = useCallback(() => {
        const promises = [];
        if (reality !== initReality) {
            promises.push(updateReality(date, hour, reality));
        }
        if (expectation !== initExpectation) {
            promises.push(updateExpectation(date, hour, expectation));
        }

        setIsLoading(true);
        Promise
            .all(promises)
            .then(data => {
                setMessage(`${date} ${hour} saved!`);
                onEntryComplete();
            })
            .catch(error => setMessage("Failed to update"))
            .finally(() => {
                setTimeout(() => {
                    setIsAddEntryModalOpen(false);
                    setIsLoading(false);
                }, 1000);
            });
    }, [date, hour, reality, expectation, initReality, initExpectation, onEntryComplete]);

    return (
        <>
            {isAddEntryModalOpen ? (
                <div className="fixed top-0 inset-x-0 w-screen h-screen z-30 backdrop-brightness-50">
                    <div className="bg-gray-100 dark:bg-neutral-800 border rounded-t-2xl h-full w-full mt-5 p-4">
                        <div className="flex w-full justify-between items-center text-black dark:text-white">
                            <X
                                size={32}
                                onClick={() => setIsAddEntryModalOpen(false)}/>
                            <SaveIcon
                                className={isLoading ? "animate-spin" : ""}
                                size={32}
                                onClick={saveEntry}/>
                        </div>
                        <div className="my-4 text-black dark:text-white">
                            <textarea
                                className="w-full bg-white dark:bg-neutral-700 h-[25vh] bg-transparent font-mono border rounded-xl p-4"
                                value={reality}
                                placeholder="Thoughts..."
                                onChange={event => {
                                    const value = event.target.value;
                                    setReality(value);
                                }}
                            />
                            <textarea
                                className="w-full bg-white dark:bg-neutral-700 h-[25vh] bg-transparent font-mono border rounded-xl p-4"
                                value={expectation}
                                placeholder="Anything else..."
                                onChange={event => {
                                    const value = event.target.value;
                                    setExpectation(value);
                                }}
                            />
                        </div>
                    </div>
                </div>
            ) : null}
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
                <div
                    onClick={() => setIsAddEntryModalOpen(true)}
                    className="flex flex-col gap-1 rounded-lg overflow-hidden w-full border-2 dark:border-black">
                    <LogEntry value={reality}/>
                    <LogEntry value={expectation} isSecondary/>
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