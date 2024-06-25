const hours = new Array(24).fill(0).map((_, i) => {
    const adjustedIndex = i + 7;

    if (adjustedIndex > 23) {
        return `0${adjustedIndex - 24}:00`;
    }

    if (adjustedIndex > 9) {
        return `${adjustedIndex}:00`;
    }

    return `0${adjustedIndex}:00`;
});

const HourlyTypes = {
    UNKNOWN: "Unknown",
    MISMATCH: "Mismatch",
    FULFILLED: "Fulfilled"
};

export const RealityVsExpectationView = (props) => {
    return (
        <section className="grid grid-cols-4 items-start">
            <div className="p-2 w-1/4">
                {hours.map(hour => <div key={hour}>{hour}</div>)}
            </div>
            <div className="border-r border-white w-1/4">
                {hours.map(hour =>
                    <div key={`${hour}-expectation`} className="w-full border border-gray-400">
                        <input type="text"/>
                    </div>)}
            </div>
            <div className="p-2 w-1/4">
                {hours.map(hour =>
                    <div key={`${hour}-reality`} className="border border-gray-400">
                        <input type="text"/>
                    </div>)}
            </div>
            <div className="p-2 w-1/4">
                {hours.map(hour => <div key={`${hour}-match}`}>
                    {HourlyTypes.UNKNOWN}
                </div>)}
            </div>
        </section>
    )
};