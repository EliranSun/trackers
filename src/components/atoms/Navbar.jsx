import { TrackerIcons, TrackerNames } from "../../constants";
import classNames from "classnames";
import { ArrowClockwise } from "@phosphor-icons/react";

const NavButton = ({ children, isSelected, onClick }) => {
  return (
    <button
      className={classNames({
        "text-white": isSelected,
        "text-white/50": !isSelected,
        "p-4": true,
      })}
      onClick={onClick}>
      {children}
    </button>
  )
}
export const Navbar = ({ selectedView, setSelectedView }) => {
  return (
    <div className="flex w-screen left-0 fixed bottom-0 h-24 bg-gray-700 justify-evenly pb-4 font-mono">
      {Object.values(TrackerNames).map((name, index) => {
        const Icon = TrackerIcons[name];
        
        return (
          <NavButton
            key={name}
            isSelected={selectedView === name}
            onClick={() => setSelectedView(name)}>
            <Icon size={32}/>
          </NavButton>
        );
      })}
      <NavButton onClick={() => window.location.reload()}>
        <ArrowClockwise size={32}/>
      </NavButton>
    </div>
  );
};