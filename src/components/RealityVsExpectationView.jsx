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
        <section className="flex flex-col w-screen gap-1">
            {hours.map(hour => (
            <div className="flex gap-1 w-full">
            <div className="p-2 bg-white/10">
                <div key={hour}>{hour}</div>
            </div>
            <div className="flex flex-col gap-px">
            <div className="">
                    <div key={`${hour}-expectation`} className="bg-white/10">
                        <input type="text" className="w-full h-full bg-transparent"/>
                    </div>
            </div>
            <div className="">
                    <div key={`${hour}-reality`} className="bg-white/10">
                        <input type="text" className="w-full h-full bg-transparent"/>
                    </div>
            </div>
            </div>
            <div className="p-2 bg-white/10">
                <div key={`${hour}-match}`}>
                    {HourlyTypes.UNKNOWN}
                </div>
            </div>
            </div>
            ))}
        </section>
    )
};