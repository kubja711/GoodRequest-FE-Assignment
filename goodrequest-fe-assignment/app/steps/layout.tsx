"use client";

import { ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { Cta } from "../components/Cta";
import { Footer } from "../components/Footer";
import { StepsProvider, useStepsContext } from "../lib/steps-context";
import { useTranslation } from "react-i18next";
import { ContributionData, STEPS } from "../lib/steps";
import {
  BottomGroup,
  HomePageContent,
  ImageWrapper,
  PageWrapper,
  Sidebar,
} from "../components/styled";
import { StepHeader, StepItem, StepCircle, StepLabel, StepDivider } from "../components/styled";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Check from "../components/icons/Check";

function StepsLayoutInner({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const activeSegment = pathname?.split("/").pop() ?? "one";
  const currentStep = activeSegment === "two" ? 2 : activeSegment === "three" ? 3 : 1;
  const isStepOne = currentStep === 1;
  const isStepTwo = currentStep === 2;
  const isFinal = currentStep === 3;
  const { t } = useTranslation();
  const { selectedShelterId, switchOption, amount, personalInfo, personalInfoAgree, reset } =
    useStepsContext();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: ContributionData) => {
      return axios.post(
        "https://frontend-assignment-api.goodrequest.dev/api/v1/shelters/contribute",
        data,
      );
    },
  });

  const isShelterDonation = switchOption === "shelter";
  const hasSelectedShelter = !!selectedShelterId;
  const hasValidAmount = amount > 0;

  const isStepOneInvalid =
    isStepOne && ((!hasSelectedShelter && isShelterDonation) || !hasValidAmount);

  const isNextDisabled = isStepOneInvalid || !personalInfoAgree;

  let nextDisabledText = t("enterAmount");

  if (isFinal && !personalInfoAgree) {
    nextDisabledText = t("personalInfoAgreeNeeded");
  } else if (isShelterDonation && !hasSelectedShelter) {
    nextDisabledText = t("chooseShelterAndAmount");
  }

  const handleClickBack = () => {
    if (isStepOne) {
      return router.push("/steps/one");
    }

    if (isStepTwo) {
      return router.push("/steps/one");
    }

    return router.push("/steps/two");
  };

  const handleClickNext = async () => {
    if (isStepOne) {
      return router.push("/steps/two");
    }

    if (isStepTwo) {
      return;
    }

    if (!personalInfo) return;

    try {
      await mutateAsync({
        contributors: [
          {
            firstName: personalInfo.firstName,
            lastName: personalInfo.lastName,
            email: personalInfo.email,
            phone: personalInfo.phone,
          },
        ],
        shelterID: selectedShelterId,
        value: amount,
      });

      toast.success(t("formSubmitted"));

      router.push("/steps/one");
      reset();
    } catch (error: unknown) {
      const message =
        typeof error === "object" && error !== null && "message" in error
          ? String((error as { message?: unknown }).message)
          : t("unknownError");
      toast.error(`${t("errorOccurred")}: ${message}`);
    }
  };

  return (
    <PageWrapper>
      <ToastContainer />
      <HomePageContent>
        <Sidebar>
          <StepHeader>
            {STEPS.map((step, index) => {
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              const isLast = index === STEPS.length - 1;

              return (
                <StepItem key={step.id}>
                  <StepCircle $isActive={isActive} $isCompleted={isCompleted}>
                    {isCompleted ? <Check /> : step.id}
                  </StepCircle>
                  <StepLabel $isActive={isActive} $isCompleted={isCompleted}>
                    {t(step.label)}
                  </StepLabel>
                  {!isLast && <StepDivider />}
                </StepItem>
              );
            })}
          </StepHeader>
          {children}
          <BottomGroup>
            <Cta
              onClickBack={handleClickBack}
              onClickNext={handleClickNext}
              isSubmit={isStepTwo}
              isFinal={isFinal}
              formId={isStepTwo ? "step2-form" : undefined}
              nextDisabled={isNextDisabled}
              nextDisabledText={nextDisabledText}
              hideBackButton={isStepOne}
              isPending={isPending}
            />
            <Footer />
          </BottomGroup>
        </Sidebar>
        <ImageWrapper>
          <Image src="/images/dog1.jpg" alt="Dog image" fill objectFit="cover" />
        </ImageWrapper>
      </HomePageContent>
    </PageWrapper>
  );
}

export default function StepsLayout({ children }: { children: ReactNode }) {
  return (
    <StepsProvider>
      <StepsLayoutInner>{children}</StepsLayoutInner>
    </StepsProvider>
  );
}
