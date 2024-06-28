import {useCallback, useEffect, useMemo, useState} from "react";
import {Measurement} from "../atoms/Measurement";
import {Measurements} from "../atoms/Measurements";
import {getKetoLogs} from "../../utils/db";
import {isSameDay} from "date-fns";
import {KetoEntry} from "./KetoEntry";

export const KetoTable = ({date}) => {
        const [logs, setLogs] = useState([]);

        const fetch = useCallback(() => {
            getKetoLogs(date).then(data => {
                setLogs([
                    {
                        name: "",
                        calories: null,
                        protein: null,
                        carbs: null,
                        created_at: new Date(),
                        isNew: true,
                    },
                    ...data,
                ]);
            });
        }, [date]);

        useEffect(() => {
            fetch();
        }, [date]);

        const caloriesSum = useMemo(() => {
            return logs.reduce((acc, row) => {
                if (!row.calories) {
                    return acc;
                }

                return acc + Number(row.calories);
            }, 0);
        }, [logs]);

        const proteinSum = useMemo(() => {
            return logs.reduce((acc, row) => {
                if (!row.protein) {
                    return acc;
                }

                return acc + Number(row.protein);
            }, 0);
        }, [logs]);

        const carbsSum = useMemo(() => {
            return logs.reduce((acc, row) => {
                if (!row.carbs) {
                    return acc;
                }

                return acc + Number(row.carbs);
            }, 0);
        }, [logs]);

        return (
            <div className="flex flex-col gap-2 rounded-3xl py-4">
                <Measurements>
                    <Measurement
                        name="Calories"
                        showMax
                        value={caloriesSum}
                        range={[100, 2000]}/>
                    <Measurement
                        name="Protein"
                        showMin
                        value={proteinSum}
                        range={[120, 150]}/>
                    <Measurement
                        name="Carbs"
                        showMax
                        value={carbsSum}
                        range={[0, 40]}/>
                </Measurements>
                <div className="h-full overflow-x-hidden overflow-y-auto">
                    {logs.map(data => (
                        <KetoEntry
                            date={date}
                            isNew={data.isNew}
                            id={data.id}
                            name={data.name}
                            calories={data.calories}
                            protein={data.protein}
                            carbs={data.carbs}
                            key={data.created_at}
                            refetch={async () => {
                                await fetch();
                            }}
                        />
                    ))}
                </div>
            </div>
        )
    }
;