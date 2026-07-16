"use client";

"use client";

import { ArrowLongRightIcon } from "./icons";
import { IconWrapper } from "./styled";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

const BackButton = styled.button<{ variant?: string }>`
  display: flex;
  align-items: center;
  gap: 4px;
  color: var(--base-action-primary-default);
  font-size: 16px;
  text-decoration: none;
  width: fit-content;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
    color: var(--base-action-primary-hover);
  }

  &:active {
    color: var(--base-action-primary-active);
  }
`;

export default function Back() {
  const router = useRouter();
  const { t } = useTranslation();
  return (
    <BackButton onClick={() => router.back()}>
      <IconWrapper $size={20}>
        <ArrowLongRightIcon style={{ transform: "rotate(180deg)" }} />
      </IconWrapper>
      {t("back")}
    </BackButton>
  );
}
