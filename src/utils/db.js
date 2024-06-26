import {createClient} from "@supabase/supabase-js";
import {addDays, format} from "date-fns";

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_ANON_KEY);

const DbTables = {
    KETO_LOGS: "keto_logs",
    HOURLY_LOGS: "hourly_logs",
};

export async function getKetoLogs(date) {
    alert(date);
    const {data} = await supabase
        .from(DbTables.KETO_LOGS)
        .select("*")
        .eq("date", date);

    return data;
}

export async function addKetoLog(date, log) {
    const {data, error} = await supabase.from(DbTables.KETO_LOGS).insert({
        date,
        name: log.name,
        calories: log.calories,
        protein: log.protein,
        carbs: log.carbs,
    });

    console.log({data, error});
    return data;
}

export async function editKetoLog(id, log) {
    const {data, error} = await supabase
        .from(DbTables.KETO_LOGS)
        .update({
            name: log.name,
            calories: log.calories,
            protein: log.protein,
            carbs: log.carbs,
        })
        .eq('id', id);

    return data;
};

export async function getHourlyLogs(date) {
    const {data} = await supabase
        .from(DbTables.HOURLY_LOGS)
        .select("*")
        .eq("date", date);

    return data;
}

export async function InstantiateHours(date, hours) {
    const {data, error} = await supabase.from(DbTables.HOURLY_LOGS).insert(hours.map(hour => ({
        hour,
        date,
    })));

    return data;
}

export async function updateExpectation(date, hour, text) {
    const {data, error} = await supabase.from(DbTables.HOURLY_LOGS).update({expectation: text})
        .eq('hour', hour)
        .eq('date', date);

    return data;
}

export async function updateReality(date, hour, text) {
    const {data, error} = await supabase.from(DbTables.HOURLY_LOGS).update({reality: text})
        .eq('hour', hour)
        .eq('date', date);

    return data;
}