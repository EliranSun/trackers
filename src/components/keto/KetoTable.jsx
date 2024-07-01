import {useCallback, useEffect, useMemo, useState} from "react";
import {Measurement} from "../atoms/Measurement";
import {Measurements} from "../atoms/Measurements";
import {getKetoLogs} from "../../utils/db";
import {KetoEntry} from "./KetoEntry";

const getEmptyEntry = () => ({
    name: "",
    calories: null,
    protein: null,
    carbs: null,
    created_at: new Date(),
});

export const TOTAL_CARBS = 40;

export const KetoTable = ({date}) => {
        const [logs, setLogs] = useState([]);
        const [mainEntry, setMainEntry] = useState(getEmptyEntry());

        const fetch = useCallback(() => {
            getKetoLogs(date).then(data => {
                setMainEntry(getEmptyEntry());
                setLogs(data);
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
            <div className="flex flex-col justify-center gap-2 rounded-3xl py-4">
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
                        range={[0, TOTAL_CARBS]}/>
                </Measurements>

                <div className="h-full overflow-x-hidden overflow-y-auto">
                    <KetoEntry
                        date={date}
                        id={mainEntry.id}
                        name={mainEntry.name}
                        isSelected={true}
                        calories={mainEntry.calories}
                        protein={mainEntry.protein}
                        carbs={mainEntry.carbs}
                        isNew={mainEntry.isNew}
                        refetch={fetch}
                    />
                </div>
                <div className="flex gap-1 flex-wrap">
                    {logs.map(data => (
                        <KetoEntry
                            date={date}
                            id={data.id}
                            name={data.name}
                            isNew={data.isNew}
                            calories={data.calories}
                            protein={data.protein}
                            carbs={data.carbs}
                            key={data.created_at}
                            refetch={fetch}
                            onSelectEntry={(isSelected) => {
                                // alert(JSON.stringify(isSelected));
                                setMainEntry(isSelected ? data : getEmptyEntry());
                            }}
                        />
                    ))}
                </div>
            </div>
        )
    }
;