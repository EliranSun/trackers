import classNames from "classnames";

export const NavButton = ({ children, isSelected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={classNames({
        "text-white": isSelected,
        "text-white/50": !isSelected,
        "hover:bg-black user-select-none": true,
        "p-4 relative z-20": true,
      })}>
      {children}
    </button>
  )
}