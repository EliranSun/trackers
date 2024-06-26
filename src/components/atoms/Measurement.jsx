import classNames from "classnames";

export const Measurement = ({name, value, range = []}) => {
    return (
        <div className={classNames({
            "flex flex-col items-center": true,
            "text-red-500": value < range[0] || value > range[1],
            "text-green-500": value >= range[0] && value <= range[1],
        })}>
            <h2 className="text-3xl">{Math.round(value)}</h2>
            <label className="text-sm">{name}</label>
        </div>
    )
};