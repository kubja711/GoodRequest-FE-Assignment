"use client";

import { useTranslation } from "react-i18next";
import Button from "./Button";
import { ArrowRightIcon, LoadingIcon } from "./icons";
import styled from "styled-components";

const CtaWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 8px;
`;

export function Cta({
  onClickBack,
  onClickNext,
  isSubmit,
  isFinal,
  formId,
  nextDisabled,
  nextDisabledText,
  hideBackButton = false,
  isPending,
}: {
  onClickBack: () => void;
  onClickNext: () => void;
  isSubmit?: boolean;
  isFinal?: boolean;
  formId?: string;
  nextDisabled?: boolean;
  nextDisabledText?: string;
  hideBackButton?: boolean;
  isPending?: boolean;
}) {
  const { t } = useTranslation();

  return (
    <CtaWrapper>
      <Button
        type="button"
        onClick={onClickBack}
        variant="secondary"
        iconLeft={
          <ArrowRightIcon style={{ transform: "rotate(180deg)" }} width={11.67} height={11.67} />
        }
        style={{ opacity: hideBackButton ? "0%" : "100%" }}
      >
        {t("back")}
      </Button>
      {isSubmit ? (
        <Button
          onClick={() => {}}
          variant="primary"
          iconRight={isFinal ? undefined : <ArrowRightIcon width={11.67} height={11.67} />}
          type="submit"
          form={formId}
          disabled={nextDisabled || isPending}
          title={nextDisabled ? nextDisabledText : undefined}
        >
          {isFinal ? isPending ? <LoadingIcon /> : t("submitForm") : t("continue")}
        </Button>
      ) : (
        <Button
          type="button"
          onClick={onClickNext}
          variant="primary"
          iconRight={isFinal ? undefined : <ArrowRightIcon width={11.67} height={11.67} />}
          disabled={nextDisabled || (isFinal ? isPending : false)}
          title={nextDisabled ? nextDisabledText : undefined}
        >
          {isFinal ? isPending ? <LoadingIcon /> : t("submitForm") : t("continue")}
        </Button>
      )}
    </CtaWrapper>
  );
}
