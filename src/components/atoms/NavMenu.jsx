import classNames from "classnames";
import { TrackerIcons } from "../../constants";
import { ArrowClockwise } from "@phosphor-icons/react";
import { NavButton } from "./NavButton";
import { noop } from "lodash";

export const NavMenu = ({ items, onClose, selectedMenuItem, onSelect = noop }) => {
  return (
    <div
      onClick={onClose}
      className={classNames({
        "text-black px-4": true,
        "grid grid-cols-3 grid-rows-3": true,
        "backdrop-blur-lg": true,
        "w-screen h-screen bg-white/20 fixed inset-0 z-20": true,
      })}>
      {items
        .slice(4)
        .map((name) => {
          const Icon = TrackerIcons[name];
          
          return (
            <NavButton
              key={name}
              isSelected={selectedMenuItem === name}
              onClick={() => {
                onSelect(name);
                onClose();
              }}>
              <Icon size={30}/>
            </NavButton>
          );
        })}
      <NavButton onClick={(event) => {
        event.stopPropagation();
        window.location.reload();
      }}>
        <ArrowClockwise size={50}/>
        Refresh
      </NavButton>
    </div>
  );
};