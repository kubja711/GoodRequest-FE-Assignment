"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { FbIcon, IgIcon } from "./icons";
import styled from "styled-components";

const FooterWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 24px;
  border-top: 1px solid var(--base-content-quintarny);
`;

const IconGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding-bottom: 4px;
  color: var(--base-content-quaternary);
`;

const FooterLink = styled(Link)`
  color: var(--base-content-tertiary);
  font-size: 16px;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export function Footer() {
  const { t } = useTranslation();

  return (
    <FooterWrapper>
      <Link href={"/steps/one"}>
        <Image src="/logo.svg" alt={t("goodboyLogoAlt")} unoptimized width={124} height={32} />
      </Link>
      <IconGroup>
        <Link href={"https://www.facebook.com"}>
          <FbIcon width={16} height={16} />
        </Link>
        <Link href={"https://www.instagram.com"}>
          <IgIcon width={16} height={16} />
        </Link>
        <FooterLink href={"/contact"}>{t("contactLink")}</FooterLink>
        <FooterLink href={"/about"}>{t("aboutLink")}</FooterLink>
      </IconGroup>
    </FooterWrapper>
  );
}
