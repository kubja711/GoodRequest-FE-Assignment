"use client";

import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { Amount } from "../../components/Amount";
import { Selector } from "../../components/Selector";
import { Switch } from "../../components/Switch";
import {
  Column,
  HeadingOne,
  HeadingThree,
  HelperText,
  OptionalText,
} from "../../components/styled";
import { useStepsContext } from "../../lib/steps-context";

export default function StepOnePage() {
  const { t } = useTranslation();
  const { selectedShelterId, amount, switchOption, setStepOneState } = useStepsContext();
  const { data, isLoading } = useQuery({
    queryKey: ["shelters"],
    queryFn: async () => {
      const response = await fetch(
        "https://frontend-assignment-api.goodrequest.dev/api/v1/shelters/",
      );
      return response.json();
    },
  });

  const options = data?.shelters ?? [];

  return (
    <Column>
      <HeadingOne>{t("step1Title")}</HeadingOne>
      <Switch
        switchOption={switchOption}
        handleSwitchOption={(option) => {
          setStepOneState({ switchOption: option });
        }}
      />
      <Column $gap={0}>
        <HeadingThree>{t("projectInfo")}</HeadingThree>
        <HelperText>
          {t("shelter")} <OptionalText>{t("shelterOptional")}</OptionalText>
        </HelperText>
        <Selector
          options={options}
          valueId={selectedShelterId}
          onChange={(id, name) => {
            setStepOneState({
              selectedShelterId: id,
              selectedShelterName: name,
            });
          }}
          disabled={isLoading}
          isLoadingOptions={isLoading}
        />
      </Column>
      <Amount amount={amount} setAmount={(value) => setStepOneState({ amount: value })} />
    </Column>
  );
}
