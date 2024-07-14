import {createClient} from "@supabase/supabase-js";
import {TrackerNames} from "../constants";

const supabase = 
    process.env.REACT_APP_SUPABASE_URL &&
    createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_ANON_KEY);

export const DbTables = {
    [TrackerNames.KETO]: "keto_logs",
    [TrackerNames.HOURLY]: "hourly_logs",
    [TrackerNames.WEIGHT]: "weight_logs",
    [TrackerNames.SLEEP]: "sleep_logs",
    [TrackerNames.ANGER]: "anger_logs",
    [TrackerNames.DINNER]: "dinner_logs",
    [TrackerNames.DATES]: "dates_logs",
    [TrackerNames.SNORE]: "snore_logs",
    [TrackerNames.ESX]: "sex_logs",
    [TrackerNames.PRON]: "porn_logs",
    [TrackerNames.SNORE]: "snore_logs",
    [TrackerNames.SMALL_THINGS]: "small_things_logs",
    [TrackerNames.LYING]: "lying_logs",
};

export async function getKetoLogs(date) {
    if (!supabase) {
        return [];
    }
    
    const {data, error} = await supabase
        .from(DbTables[TrackerNames.KETO])
        .select("*")
        .eq("date", date)
        .order("id", {ascending: false});

    if (error) {
        console.error(error);
        throw new Error("Get keto logs failed");
    }

    return data;
}

export async function addKetoLog(date, log) {
    if (!supabase) {
        return;
    }
    
    const {data, error} = await supabase
        .from(DbTables[TrackerNames.KETO])
        .insert({
            date,
            name: log.name,
            calories: log.calories,
            protein: log.protein,
            carbs: log.carbs,
        });

    if (error) {
        console.error(error);
        throw new Error("Add keto log failed");
    }
    return data;
}

export async function deleteKetoLog(id) {
    if (!supabase) {
        return;
    }
    
    const {data, error} = await supabase
        .from(DbTables[TrackerNames.KETO])
        .delete()
        .eq('id', id);

    if (error) {
        console.error(error);
        throw new Error("Delete keto log failed");
    }

    return data;
}

export async function editKetoLog(id, log) {
    if (!supabase) {
        return;
    }
    
    const {data, error} = await supabase
        .from(DbTables[TrackerNames.KETO])
        .update({
            name: log.name,
            calories: log.calories,
            protein: log.protein,
            carbs: log.carbs,
        })
        .eq('id', id);

    if (error) {
        console.error(error);
        throw new Error("Edit keto log failed");
    }
    return data;
}

export async function getHourlyLogs(date) {
    if (!supabase) {
        return [];
    }
    
    const {data, error} = await supabase
        .from(DbTables[TrackerNames.HOURLY])
        .select("*")
        .eq("date", date);

    if (error) {
        console.error(error);
        throw new Error("Get hourly logs failed");
    }
    return data;
}

export async function updateHourlyIsApproved(id, isApproved) {
    if (!supabase) {
        return;
    }
    
    const {data, error} = await supabase
        .from(DbTables[TrackerNames.HOURLY])
        .update({isApproved})
        .eq('id', id);

    if (error) {
        console.error(error);
        throw new Error("Update hourly isApproved failed");
    }
    return data;
}

export async function InstantiateHours(date, hours) {
    if (!supabase) {
        return;
    }
    
    const {data, error} = await supabase
        .from(DbTables[TrackerNames.HOURLY])
        .insert(hours.map(hour => ({
            hour,
            date,
        })));

    if (error) {
        console.error(error);
        throw new Error("Instantiate hours failed");
    }
    return data;
}

export async function updateExpectation(date, hour, text) {
    if (!supabase) {
        return;
    }
    
    const {data, error} = await supabase
        .from(DbTables[TrackerNames.HOURLY])
        .update({expectation: text})
        .eq('hour', hour)
        .eq('date', date);

    if (error) {
        console.error(error);
        throw new Error("Update expectation failed");
    }
    return data;
}

export async function updateReality(date, hour, text) {
    if (!supabase) {
        return;
    }
    
    const {data, error} = await supabase
        .from(DbTables[TrackerNames.HOURLY])
        .update({reality: text})
        .eq('hour', hour)
        .eq('date', date);

    if (error) {
        console.error(error);
        throw new Error("Update reality failed");
    }
    return data;
}

export async function getWeightLogs(date) {
    if (!supabase) {
        return [];
    }
    
    const {data, error} = await supabase
        .from(DbTables[TrackerNames.WEIGHT])
        .select("*")
        .eq("date", date)
        .order("id", {ascending: false});

    if (error) {
        console.error(error);
        throw new Error("Get weight logs failed");
    }

    return data;
}

export async function addWeightLog(date, log) {
    if (!supabase) {
        return;
    }
    
    const {data, error} = await supabase
        .from(DbTables[TrackerNames.WEIGHT])
        .insert({
            date,
            weight: log.weight,
            fat: log.fat,
        });

    if (error) {
        console.error(error);
        throw new Error("Add weight log failed");
    }
    return data;
}

export async function editWeightLog(id, log) {
    if (!supabase) {
        return;
    }
    
    const {data, error} = await supabase
        .from(DbTables[TrackerNames.WEIGHT])
        .update({
            weight: log.weight,
            fat: log.fat,
        })
        .eq('id', id);

    if (error) {
        console.error(error);
        throw new Error("edit weight log failed");
    }
    return data;
}

export async function getLogs(dbName, date) {
    if (!supabase) {
        return [];
    }
    
    const {data, error} = await supabase
        .from(dbName)
        .select("*")
        .eq("date", date)
        .order("id", {ascending: false});

    if (error) {
        console.error(error);
        throw new Error("Get logs failed");
    }

    return data;
}

export async function setLog(dbName, date, isTargetMet, id) {
   if (!supabase) {
        return;
    }
    
    if (id) {
        const {data, error} = await supabase
            .from(dbName)
            .update({isMet: isTargetMet})
            .eq('id', id);

        if (error) {
            console.error(error);
            throw new Error("Set log failed");
        }

        return data;
    }

    const {data, error} = await supabase.from(dbName).insert({
        date,
        isMet: isTargetMet,
    });

    if (error) {
        console.error(error);
        throw new Error("Set log failed");
    }

    return data;
}

export async function getSleepLogs() {
    if (!supabase) {
        return [];
    }
    
    const {data, error} = await supabase
        .from(DbTables[TrackerNames.SLEEP])
        .select("*")
        .order("id", {ascending: false});

    if (error) {
        console.error(error);
        throw new Error("Get sleep logs failed");
    }

    return data;
}

export async function setSleepLog(date, isTargetMet, id) {
    if (!supabase) {
        return;
    }
    
    if (id) {
        const {data, error} = await supabase
            .from(DbTables[TrackerNames.SLEEP])
            .update({isMet: isTargetMet})
            .eq('id', id);

        if (error) {
            console.error(error);
            throw new Error("Set sleep log failed");
        }

        return data;
    }

    const {data, error} = await supabase
        .from(DbTables[TrackerNames.SLEEP])
        .insert({
            date,
            isMet: isTargetMet,
        });

    if (error) {
        console.error(error);
        throw new Error("Set sleep log failed");
    }

    return data;
}