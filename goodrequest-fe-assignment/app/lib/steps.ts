export type StepSelectionState = {
  selectedShelterId?: number;
  selectedShelterName?: string;
  amount: number;
  switchOption: "shelter" | "foundation";
};

export type PersonalInfo = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
};

export type ContributionData = {
  contributors: PersonalInfo[];
  shelterID?: number;
  value: number;
};

export const STEPS = [
  { id: 1, label: "step1Label", route: "/steps/one" },
  { id: 2, label: "step2Label", route: "/steps/two" },
  { id: 3, label: "step3Label", route: "/steps/three" },
] as const;
