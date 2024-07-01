import { TrackerIcons, TrackerNames } from "../../constants";
import classNames from "classnames";
import {
  ArrowClockwise,
  DotsThreeOutlineVertical,
  SmileyXEyes,
  SmileyAngry,
  Megaphone,
  ChartBar
} from "@phosphor-icons/react";
import { useState } from "react";

const NavButton = ({ children, isSelected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={classNames({
        "text-white": isSelected,
        "text-white/50": !isSelected,
        "p-4 relative z-20": true,
      })}>
      {children}
    </button>
  )
}
export const Navbar = ({ selectedView, setSelectedView }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <>
      <div className={classNames({
        "text-gray-700": true,
        "flex w-screen left-0 fixed bottom-0 z-20 h-24 justify-between pb-4 px-4 font-mono": true,
        "bg-gray-700": !isMenuOpen,
        "bg-transparent": isMenuOpen,
      })}>
        {Object.values(TrackerNames)
          .filter(name => name !== TrackerNames.NO_PRON)
          .map((name, index) => {
            const Icon = TrackerIcons[name];
            
            return (
              <NavButton
                key={name}
                isSelected={selectedView === name}
                onClick={() => {
                  setSelectedView(name);
                  setIsMenuOpen(false);
                }}>
                <Icon size={30}/>
              </NavButton>
            );
          })}
        <NavButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <DotsThreeOutlineVertical size={30}/>
        </NavButton>
      </div>
      {isMenuOpen ?
        <div
          onClick={() => setIsMenuOpen(false)}
          className={classNames({
            "text-black": true,
            "flex flex-col gap-20 items-end justify-center backdrop-blur-lg": true,
            "w-screen h-screen bg-white/20 fixed inset-0 z-20 ": true,
          })}>
          <NavButton
            isSelected={selectedView === TrackerNames.NO_PRON}
            onClick={(event) => {
              event.stopPropagation();
              setSelectedView(TrackerNames.NO_PRON);
              setIsMenuOpen(false);
            }}>
            <SmileyXEyes size={50}/>
          </NavButton>
          <NavButton>
            <SmileyAngry size={50}/>
          </NavButton>
          <NavButton>
            <Megaphone size={50}/>
          </NavButton>
          <NavButton>
            <ChartBar size={50}/>
          </NavButton>
          <NavButton onClick={(event) => {
            event.stopPropagation();
            window.location.reload();
          }}>
            <ArrowClockwise size={50}/>
          </NavButton>
        </div> : null}
    </>
  );
};