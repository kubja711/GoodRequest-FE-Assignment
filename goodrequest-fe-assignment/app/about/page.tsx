"use client";

import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import AboutHighlights from "../components/AboutHighlights";
import Back from "../components/Back";
import { Footer } from "../components/Footer";
import {
  Column,
  ColumnSpaceBetween,
  HeadingOne,
  PageContent,
  PageWrapper,
  Paragraph,
} from "../components/styled";

export default function About() {
  const { isLoading, data } = useQuery({
    queryKey: ["contributionData"],
    queryFn: async () => {
      const response = await fetch(
        "https://frontend-assignment-api.goodrequest.dev/api/v1/shelters/results",
      );
      return await response.json();
    },
  });
  const { t } = useTranslation();

  return (
    <PageWrapper>
      <PageContent>
        <ColumnSpaceBetween>
          <Column>
            <Back />
            <HeadingOne>{t("aboutTitle")}</HeadingOne>
            <Paragraph>{t("aboutParagraph1")}</Paragraph>
            <AboutHighlights
              contribution={data?.contribution}
              contributors={data?.contributors}
              isLoading={isLoading}
            />
            <Paragraph>{t("aboutParagraph2")}</Paragraph>
          </Column>

          <Footer />
        </ColumnSpaceBetween>
      </PageContent>
    </PageWrapper>
  );
}
