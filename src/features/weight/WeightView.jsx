import {useWeightLogs} from "../../hooks/useWeightLogs";
import {useEffect, useState} from "react";

const Metrics = ({children}) => {
    return (
        <div className="w-full bg-gray-700 my-4 p-2 flex flex-col gap-4 rounded-xl shadow">
            {children}
        </div>
    );
};

export const MetricInput = ({value, onChange, label}) => {
    return (
        <div className="flex flex-col bg-gray-600 rounded-lg items-center relative">
            <input
                value={value}
                type="number"
                className="bg-transparent text-8xl w-full text-center"
                onChange={event => onChange(Number(event.target.value))}
            />
            <label className="text-xl">{label}</label>
        </div>
    );
};

export const getCreatedTime = (date) => {
    if (!date) {
        return "No logs yet";
    }

    const createdDate = new Date(date);
    // 24-hour time format
    const createdTime = createdDate.toLocaleTimeString("en-IL", {
        hour: "2-digit",
        minute: "2-digit",
    });

    return `${createdTime}`;
}

export const WeightView = ({date}) => {
    const {currentLog, addLog, editLog, refetch} = useWeightLogs(date);
    const [newLog, setNewLog] = useState({weight: 0, fat: 0});

    useEffect(() => {
        setNewLog(currentLog);
    }, [currentLog]);

    return (
        <section className="flex flex-col justify-center">
            <div className="flex flex-col items-center">
                <Metrics>
                    {getCreatedTime(newLog.created_at)}
                    <MetricInput
                        value={newLog?.weight}
                        onChange={value => setNewLog({...newLog, weight: value})}
                        label="Weight"/>
                    <MetricInput
                        value={newLog?.fat}
                        onChange={value => setNewLog({...newLog, fat: value})}
                        label="% Fat"/>
                </Metrics>
                <button
                    disabled={newLog?.weight === currentLog?.weight && newLog?.fat === currentLog?.fat}
                    className="text-4xl bg-black rounded-full py-4 px-8 disabled:opacity-30 disabled:grayscale"
                    onClick={async () => {
                        if (currentLog?.weight || currentLog?.fat) {
                            await editLog(currentLog.id, newLog);
                            return;
                        }

                        await addLog(newLog);
                        await refetch();
                    }}>
                    {(currentLog?.weight || currentLog?.fat) ? "🪵LOGGED" : "🪵LOG IT!"}
                </button>
            </div>
        </section>
    )
}