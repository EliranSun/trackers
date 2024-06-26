import { TrackerNames } from "../constants";
import { getData } from "../utils/storage";


export const Settings = () => {
  return (
    <section className="flex flex-col items-center justify-center gap-4">
      <button onClick={() => {
        const dataToExport = {};
        
        Object.values(TrackerNames).forEach((name) => {
          const key = name.toLowerCase();
          dataToExport[key] = getData(key);
        });
        
        console.log({ dataToExport });
        
        const data = JSON.stringify(dataToExport);
        const blob = new Blob([data], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "log-data.json";
        a.click();
        URL.revokeObjectURL(url);
      }}>
        EXPORT
      </button>
      <button>IMPORT</button>
    </section>
  )
};