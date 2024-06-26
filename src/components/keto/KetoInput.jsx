import { KETO_KEY, KetoKeys } from "../../constants";
import classNames from "classnames";

export const KetoInput = ({ className, placeholder, type, value, name, onChange, onBlur }) => {
  return (
    <div className={classNames(className, {
      "flex items-center flex-col": name !== KetoKeys.NAME,
      "flex items-center flex-row-reverse": name === KetoKeys.NAME,
    })}>
      <input
        type={type}
        defaultValue={value}
        placeholder={placeholder}
        key={`${KETO_KEY}-${name}`}
        onChange={event => onChange(event.target.value)}
        onBlur={event => onBlur(event.target.value)}
        className={classNames({
          "text-center bg-white/10": true,
          "p-4 text-base bg-transparent text-white w-full": true,
        })}
      />
      {name === KetoKeys.NAME ? null : <span className="text-sm">{name}</span>}
    </div>
  )
}