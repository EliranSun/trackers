import { KetoTable } from "../components/KetoTable";
import { Bed, Egg, GearSix, Ruler, SmileyXEyes, Timer } from "@phosphor-icons/react";

export const FOOD_API = "https://walak.vercel.app/nutrition";
export const KETO_KEY = "keto";
export const ONE_DAY = 1000 * 60 * 60 * 24;

export const TrackerNames = {
  KETO: "Keto",
  HOURLY: "Hourly",
  WEIGHT: "Weight",
  NO_PRON: "NoPron",
  SLEEP: "Sleep",
  // SETTINGS: "Settings",
};

export const TrackerIcons = {
  [TrackerNames.KETO]: Egg,
  [TrackerNames.NO_PRON]: SmileyXEyes,
  [TrackerNames.SLEEP]: Bed,
  [TrackerNames.WEIGHT]: Ruler,
  [TrackerNames.HOURLY]: Timer,
  [TrackerNames.SETTINGS]: GearSix,
};

export const KetoKeys = {
  NAME: "name",
  CALORIES: "calories",
  PROTEIN: "protein",
  CARBS: "carbs",
};