import { TrackerIcons, TrackerNames } from "../../constants";
import classNames from "classnames";
import { DotsThreeOutlineVertical, } from "@phosphor-icons/react";
import { useState } from "react";
import { NavButton } from "./NavButton";
import { NavMenu } from "./NavMenu";

const PagesList = Object.values(TrackerNames);

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
        {PagesList
          .slice(0, 4)
          .map((name) => {
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
        <NavMenu
          items={PagesList.slice(4)}
          onClose={() => setIsMenuOpen(false)}
          selectedMenuItem={selectedView}
          onSelect={setSelectedView}/> : null}
    </>
  );
};