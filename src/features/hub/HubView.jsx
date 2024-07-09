import { useCallback, useEffect, useState } from "react";
import { getKetoLogs } from "../../utils/db";
import { KetoEntry } from "../keto/KetoEntry";

export const HubView = ({ date, time }) => {
  const [ketoEntry, setKetoEntry] = useState({});
  
  const fetch = useCallback(() => {
    getKetoLogs(date).then(data => {
      setKetoEntry(data[0]);
    });
  }, [date]);
  
  useEffect(() => {
    fetch();
  }, []);
  
  return (
    <section>
      <KetoEntry
        date={date}
        id={ketoEntry.id}
        name={ketoEntry.name}
        isSelected={true}
        calories={ketoEntry.calories}
        protein={ketoEntry.protein}
        carbs={ketoEntry.carbs}
        isNew={ketoEntry.isNew}
        refetch={fetch}/>
    </section>
  )
}