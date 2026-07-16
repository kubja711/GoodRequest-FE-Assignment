"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  HeadingOne,
  Column,
  HeadingThree,
  RowSpaceBetween,
  Field,
  Spacer,
  Value,
  Row,
  CheckboxIcon,
  CheckboxText,
  CheckboxButton,
} from "../../components/styled";
import { useStepsContext } from "../../lib/steps-context";

const SWITCH_MAP = {
  shelter: "shelterHelpType",
  foundation: "foundationHelpType",
};

export default function StepThreePage() {
  const { t } = useTranslation();
  const router = useRouter();
  const {
    selectedShelterId,
    selectedShelterName,
    amount,
    switchOption,
    personalInfo,
    personalInfoAgree,
    setPersonalInfoAgree,
  } = useStepsContext();

  useEffect(() => {
    if (amount === 0 || (switchOption === "shelter" && !selectedShelterId) || !personalInfo) {
      router.push("/steps/one");
    }
  }, [amount, personalInfo, router, switchOption, selectedShelterId]);

  if (amount === 0 || (switchOption === "shelter" && !selectedShelterId) || !personalInfo) {
    return null;
  }

  return (
    <Column>
      <HeadingOne>{t("step3Title")}</HeadingOne>
      <Column $gap={16}>
        <HeadingThree $marginBottom={0}>{t("projectInfo")}</HeadingThree>
        <RowSpaceBetween>
          <Field>{t("helpType")}</Field>
          <Value>{t(SWITCH_MAP[switchOption])}</Value>
        </RowSpaceBetween>
        {selectedShelterId ? (
          <RowSpaceBetween>
            <Field>{t("shelter")}</Field>
            <Value>{selectedShelterName}</Value>
          </RowSpaceBetween>
        ) : null}
        <RowSpaceBetween>
          <Field>{t("donationAmount")}</Field>
          <Value>{amount} €</Value>
        </RowSpaceBetween>
        <Spacer />
        <RowSpaceBetween>
          <Field>{t("nameAndSurname")}</Field>
          <Value>
            {personalInfo.firstName} {personalInfo.lastName}
          </Value>
        </RowSpaceBetween>
        <RowSpaceBetween>
          <Field>{t("email")}</Field>
          <Value>{personalInfo.email}</Value>
        </RowSpaceBetween>
        {personalInfo.phone ? (
          <RowSpaceBetween>
            <Field>{t("phoneNumber")}</Field>
            <Value>{personalInfo.phone}</Value>
          </RowSpaceBetween>
        ) : null}
        <Spacer />
        <Row $gap={8}>
          <CheckboxButton
            $checked={personalInfoAgree}
            onClick={() => setPersonalInfoAgree(!personalInfoAgree)}
          >
            {personalInfoAgree ? (
              <CheckboxIcon viewBox="0 0 24 24">
                <polyline points="20 6 9 17 4 12" />
              </CheckboxIcon>
            ) : null}
          </CheckboxButton>
          <CheckboxText>{t("personalInfoAgree")}</CheckboxText>
        </Row>
      </Column>
    </Column>
  );
}
