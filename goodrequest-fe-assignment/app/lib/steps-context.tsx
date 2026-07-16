"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { PersonalInfo, StepSelectionState } from "./steps";

type StepsContextValue = StepSelectionState & {
  personalInfo?: PersonalInfo;
  setStepOneState: (value: Partial<StepSelectionState>) => void;
  setPersonalInfo: (info: PersonalInfo) => void;
  reset: () => void;
  personalInfoAgree: boolean;
  setPersonalInfoAgree: (agree: boolean) => void;
};

const StepsContext = createContext<StepsContextValue | undefined>(undefined);

export function StepsProvider({ children }: { children: React.ReactNode }) {
  const [selectedShelterId, setSelectedShelterId] = useState<number | undefined>(undefined);
  const [selectedShelterName, setSelectedShelterName] = useState<string | undefined>(undefined);
  const [amount, setAmount] = useState<number>(0);
  const [switchOption, setSwitchOption] = useState<"shelter" | "foundation">("shelter");
  const [personalInfo, setPersonalInfoState] = useState<PersonalInfo | undefined>(undefined);
  const [personalInfoAgree, setPersonalInfoAgreeState] = useState(true);

  const value = useMemo(
    () => ({
      selectedShelterId,
      selectedShelterName,
      amount,
      switchOption,
      personalInfo,
      personalInfoAgree,
      setStepOneState: (state: Partial<StepSelectionState>) => {
        if ("selectedShelterId" in state) {
          setSelectedShelterId(state.selectedShelterId);
        }
        if ("selectedShelterName" in state) {
          setSelectedShelterName(state.selectedShelterName);
        }
        if ("amount" in state && state.amount !== undefined) {
          setAmount(state.amount);
        }
        if ("switchOption" in state && state.switchOption !== undefined) {
          setSwitchOption(state.switchOption);
        }
      },
      setPersonalInfo: (info: PersonalInfo) => {
        setPersonalInfoState(info);
      },
      setPersonalInfoAgree: (agree: boolean) => {
        setPersonalInfoAgreeState(agree);
      },
      reset: () => {
        setSelectedShelterId(undefined);
        setSelectedShelterName(undefined);
        setAmount(0);
        setSwitchOption("shelter");
        setPersonalInfoState(undefined);
        setPersonalInfoAgreeState(true);
      },
    }),
    [selectedShelterId, selectedShelterName, amount, switchOption, personalInfo, personalInfoAgree],
  );

  return <StepsContext.Provider value={value}>{children}</StepsContext.Provider>;
}

export function useStepsContext() {
  const context = useContext(StepsContext);
  if (!context) {
    throw new Error("useStepsContext must be used within a StepsProvider");
  }

  return context;
}
