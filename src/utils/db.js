import { createClient } from "@supabase/supabase-js";
import { addDays, format } from "date-fns";

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_ANON_KEY);

const DbTables = {
  KETO_LOGS: "keto_logs",
  HOURLY_LOGS: "hourly_logs",
};

export async function getKetoLogs(date) {
  console.log("fetching...");
  const { data } = await supabase
    .from(DbTables.KETO_LOGS)
    .select("*")
    // 2024-06-26 12:07:25.275906+00
    .gte("created_at", format(date, "yyyy-MM-dd 00:00:00"))
    .lt("created_at", format(addDays(date, 1), "yyyy-MM-dd 00:00:00"))
  
  return data;
}

export async function addKetoLog(log) {
  const { data, error } = await supabase.from(DbTables.KETO_LOGS).insert({
    name: log.name,
    calories: log.calories,
    protein: log.protein,
    carbs: log.carbs,
  });
  
  console.log({ data, error });
  return data;
}

export async function editKetoLog(id, log) {
  const { data, error } = await supabase.from(DbTables.KETO_LOGS).update({
    name: log.name,
    calories: log.calories,
    protein: log.protein,
    carbs: log.carbs,
  }).eq('id', id);
  
  return data;
};

export async function getHourlyLogs(date) {
  const { data } = await supabase
    .from(DbTables.HOURLY_LOGS)
    .select("*")
    .gte("created_at", format(date, "yyyy-MM-dd 00:00:00"))
    .lt("created_at", format(addDays(date, 1), "yyyy-MM-dd 00:00:00"))
  
  return data;
}

export async function InstantiateHours(date, hours) {
  const { data, error } = await supabase.from(DbTables.HOURLY_LOGS).insert(hours.map(hour => ({ hour })));
  return data;
}

export async function updateExpectation(date, hour, text) {
  const { data, error } = await supabase.from(DbTables.HOURLY_LOGS).update({ expectation: text })
    .eq('hour', hour)
    .gte("created_at", format(date, "yyyy-MM-dd 00:00:00"))
    .lt("created_at", format(addDays(date, 1), "yyyy-MM-dd 00:00:00"));
  
  return data;
}