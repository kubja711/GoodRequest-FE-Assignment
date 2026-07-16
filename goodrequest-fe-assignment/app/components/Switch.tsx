"use client";

import { useTranslation } from "react-i18next";
import styled from "styled-components";
import Button from "./Button";

const SwitchWrapper = styled.div`
  display: flex;
  gap: 8px;
  border: 1px solid var(--base-content-quintarny);
  border-radius: 8px;
  padding: 4px;
`;

export function Switch({
  switchOption,
  handleSwitchOption,
}: {
  switchOption: "shelter" | "foundation";
  handleSwitchOption: (option: "shelter" | "foundation") => void;
}) {
  const { t } = useTranslation();

  return (
    <SwitchWrapper>
      <Button
        variant={switchOption === "shelter" ? "primary" : "transparent"}
        onClick={() => handleSwitchOption("shelter")}
        noHorizontalPadding
      >
        {t("contributeShelter")}
      </Button>
      <Button
        variant={switchOption === "foundation" ? "primary" : "transparent"}
        onClick={() => handleSwitchOption("foundation")}
        noHorizontalPadding
      >
        {t("contributeFoundation")}
      </Button>
    </SwitchWrapper>
  );
}
