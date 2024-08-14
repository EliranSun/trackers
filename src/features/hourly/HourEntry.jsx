import {useEffect, useState} from "react";
import {updateExpectation, updateHourlyIsApproved, updateReality} from "../../utils/db";
import classNames from "classnames";
import {CheckCircle, Circle, XCircle} from "@phosphor-icons/react";

export const HourlyTypes = {
    UNKNOWN: "Unknown",
    MISMATCH: "Mismatch",
    PARTIAL: "Partial",
    FULFILLED: "Fulfilled"
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
        <div className="flex gap-1 w-full rounded-lg overflow-hidden">
            <div
                onClick={() => {
                    setIsApproved(!isApproved);
                    updateHourlyIsApproved(id, !isApproved)
                        .then(data => console.info("Updated isApproved", data))
                        .catch(error => console.error("Failed to update isApproved", error))
                        .finally(refetch);
                }}
                className={classNames({
                    "w-1/3 p-2 flex gap-2 justify-center items-center": true,
                    "bg-gray-700": true,
                    // "bg-gray-700": status === HourlyTypes.UNKNOWN,
                    // "bg-red-500": status === HourlyTypes.MISMATCH,
                    // "bg-orange-500": status === HourlyTypes.PARTIAL,
                    // "bg-green-500": status === HourlyTypes.FULFILLED,
                })}>
                {(isApproved === null || isApproved === undefined)
                    ? <Circle size={32}/>
                    : isApproved
                        ? <CheckCircle size={32} weight="fill" color="green"/>
                        : <XCircle size={32} weight="fill" color="tomato"/>}
                <span>{hour}</span>
            </div>
            <div className="flex flex-col gap-1 w-full">
                <div key={`${hour}-reality`} className="bg-gray-700 h-full px-2">
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
                </div>
                {(isApproved === false) ?
                    <div key={`${hour}-expectation`} className="w-full bg-gray-700 px-2">
                        <input
                            type="text"
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
                    </div> : null}
            </div>
        </div>
    )
}