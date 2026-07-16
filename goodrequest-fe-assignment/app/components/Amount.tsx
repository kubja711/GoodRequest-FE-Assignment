"use client";

import { AmountInput } from "./AmountInput";
import Button from "./Button";
import { EuroIcon } from "./icons";
import styled from "styled-components";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const PRESET_AMOUNTS = [5, 10, 20, 30, 50, 100];

const Wrapper = styled.div``;

const Title = styled.h3`
  color: var(--base-content-primary);
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  margin-bottom: 16px;
`;

const AmountCenter = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
`;

const AmountRow = styled.div<{ $isActive: boolean }>`
  display: inline-flex;
  max-width: 100%;
  flex-wrap: nowrap;
  align-items: baseline;
  gap: 8px;
  padding: 10px 32px;
  border-bottom: ${({ $isActive }) =>
    $isActive ? "2px solid var(--base-action-primary-default)" : "2px solid transparent"};
`;

const EuroWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  color: var(--base-content-tertiary);
`;

const PresetButtons = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;
`;

export function Amount({
  amount,
  setAmount,
}: {
  amount: number;
  setAmount: (amount: number) => void;
}) {
  const { t } = useTranslation();
  const [inputFocused, setInputFocused] = useState(false);

  return (
    <Wrapper>
      <Title>{t("amountTitle")}</Title>
      <AmountCenter>
        <AmountRow $isActive={inputFocused}>
          <AmountInput
            placeholder="0"
            value={amount}
            onChange={(amount) => {
              if (amount > 10000000000000) {
                setAmount(10000000000000);
              } else {
                setAmount(amount);
              }
            }}
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
          />
          <EuroWrapper>
            <EuroIcon width={16} height={16} />
          </EuroWrapper>
        </AmountRow>
      </AmountCenter>
      <PresetButtons>
        {PRESET_AMOUNTS.map((item) => (
          <Button
            key={item}
            onClick={() => setAmount(item)}
            variant={amount === item ? "primary" : "secondary"}
            noHorizontalPadding={true}
          >
            <span>{item}&nbsp;€</span>
          </Button>
        ))}
      </PresetButtons>
    </Wrapper>
  );
}
