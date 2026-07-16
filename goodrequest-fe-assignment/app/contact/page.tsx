"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";
import Back from "../components/Back";
import { Footer } from "../components/Footer";
import { Column, HeadingOne, PageContent, PageWrapper } from "../components/styled";
import styled from "styled-components";
import { EmailIcon, MarkerIcon, PhoneIcon } from "../components/icons";
import ContactColumnItem from "../components/ContactColumnItem";

const CONTACT_ITEMS = [
  {
    icon: <EmailIcon />,
    heading: "contactEmailHeading",
    description: "contactEmailDescription",
    highlight: "hello@goodrequest.com",
  },
  {
    icon: <MarkerIcon />,
    heading: "contactOfficeHeading",
    description: "contactOfficeDescription",
    highlight: "Obchodná 3D, 010 08 Žilina, Slovakia",
  },
  {
    icon: <PhoneIcon />,
    heading: "contactPhoneHeading",
    description: "contactPhoneDescription",
    highlight: "+421 911 750 750",
  },
];

const ContactColumn = styled(Column)`
  padding: 20px 80px 0 80px;
`;

const ContactImageWrapper = styled.div`
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  width: 1120px;
  height: 376px;
  flex: none;
`;

const ContactContent = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 32px;
  padding: 0px 32px;
`;

export default function Contact() {
  const { t } = useTranslation();

  return (
    <PageWrapper>
      <PageContent>
        <Column>
          <Back />
          <HeadingOne>{t("contactTitle")}</HeadingOne>
          <ContactColumn>
            <ContactContent>
              {CONTACT_ITEMS.map((item, index) => (
                <ContactColumnItem
                  key={index}
                  icon={item.icon}
                  heading={t(item.heading)}
                  description={t(item.description)}
                  highlight={item.highlight}
                />
              ))}
            </ContactContent>
            <ContactImageWrapper>
              <Image alt={t("contactImageAlt")} src="/images/dog2.jpg" fill objectFit="cover" />
            </ContactImageWrapper>
          </ContactColumn>
          <Footer />
        </Column>
      </PageContent>
    </PageWrapper>
  );
}
