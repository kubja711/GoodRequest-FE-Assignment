"use client";

import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { LoadingIcon } from "./icons";

const AboutHighlightsContainer = styled.div`
  padding: 0 32px;
`;

const AboutHighlightsWrapper = styled.div`
  display: flex;
  gap: 16px;
  padding: 64px 0;
  width: 100%;
`;

const AboutHighlightItem = styled.div`
  width: 100%;
`;

const AboutHighlightHeading = styled.h2`
  margin: 0;
  font-size: 60px;
  line-height: 72px;
  font-weight: 600;
  color: var(--base-action-primary-default);
  text-align: center;
  margin-bottom: 12px;
  display: flex;
  justify-content: center;
`;

const AboutHighlightDescription = styled.p`
  margin: 0;
  font-size: 18px;
  line-height: 24px;
  font-weight: 500;
  color: var(--base-content-primary);
  text-align: center;
`;

export default function AboutHighlights({
  contribution,
  contributors,
  isLoading = true,
}: {
  contribution: number;
  contributors: number;
  isLoading: boolean;
}) {
  const { t } = useTranslation();

  const handleNumber = (num: number | undefined, isCurrency: boolean = false) => {
    if (num === undefined) return t("noData");
    return isCurrency ? `${num.toLocaleString("sk-SK")} €` : `${num}`;
  };
  return (
    <AboutHighlightsContainer>
      <AboutHighlightsWrapper>
        <AboutHighlightItem>
          <AboutHighlightHeading>
            {isLoading ? <LoadingIcon height={72} /> : handleNumber(contribution, true)}
          </AboutHighlightHeading>
          <AboutHighlightDescription>{t("totalRaisedValue")}</AboutHighlightDescription>
        </AboutHighlightItem>
        <AboutHighlightItem>
          <AboutHighlightHeading>
            {isLoading ? <LoadingIcon height={72} /> : handleNumber(contributors)}
          </AboutHighlightHeading>
          <AboutHighlightDescription>{t("donorCount")}</AboutHighlightDescription>
        </AboutHighlightItem>
      </AboutHighlightsWrapper>
    </AboutHighlightsContainer>
  );
}
