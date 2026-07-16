"use client";

import { useTranslation } from "react-i18next";
import { ChevronRightIcon, LoadingIcon } from "./icons";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { Row } from "./styled";

export type Option = { id: number; name: string; icon?: React.ReactNode };

type SelectorOwnProps = {
  options: Option[];
  valueId?: number;
  onChange?: (id: number, name?: string) => void;
  disabled?: boolean;
  isLoadingOptions?: boolean;
  placeholder?: string;
};

type SelectorProps = SelectorOwnProps &
  Omit<React.ComponentPropsWithoutRef<"button">, keyof SelectorOwnProps>;

const SelectorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const PlaceholderText = styled.span`
  color: var(--base-content-tertiary);
`;

const Control = styled.button<{ $disabled?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 12px;
  background: var(--base-surface-tertiary);
  color: var(--base-content-primary);
  font-size: 16px;
  padding: 16px;
  border: none;
  gap: 8px;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  opacity: ${({ $disabled }) => ($disabled ? 0.6 : 1)};
`;

const OptionsList = styled.ul<{ $open: boolean }>`
  position: absolute;
  left: 0;
  right: 0;
  top: 58px;
  background: var(--base-action-secondary-default);
  border-radius: 12px;
  list-style: none;
  padding: 8px 0;
  max-height: 192px; /* 4 items * 48px */
  overflow-y: auto;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
  display: ${({ $open }) => ($open ? "block" : "none")};
  z-index: 10;
`;

const OptionItem = styled.li<{ $selected?: boolean }>`
  padding: 12px 16px;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: var(--base-content-primary);
  background: transparent;
  gap: 16px;

  &:hover {
    background: var(--base-action-secondary-hover);
  }

  ${({ $selected }) =>
    $selected
      ? `background: var(--base-action-secondary-default); font-weight: 600; color: var(--base-content-primary);`
      : ""}
`;

export function Selector({
  options,
  valueId,
  onChange,
  disabled,
  isLoadingOptions,
  placeholder,
  ...rest
}: SelectorProps) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const placeholderText = placeholder ?? t("selectShelter");
  const selected = options.find((o) => o.id === valueId);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const handleSelect = (id: number, name?: string) => {
    onChange?.(id, name);
    setOpen(false);
  };

  return (
    <SelectorWrapper ref={ref}>
      <Control
        $disabled={disabled}
        onClick={() => !disabled && setOpen((s) => !s)}
        aria-expanded={open}
        type="button"
        {...rest}
      >
        {selected !== undefined ? (
          <Row>
            {selected?.icon ? selected.icon : null}
            <span>{selected?.name}</span>
          </Row>
        ) : (
          <PlaceholderText>{placeholderText}</PlaceholderText>
        )}
        {isLoadingOptions ? (
          <LoadingIcon width={12} height={12} />
        ) : (
          <ChevronRightIcon
            width={12}
            height={12}
            style={{
              transform: open ? "rotate(270deg)" : "rotate(90deg)",
              transition: "transform 0.2s ease",
            }}
          />
        )}
      </Control>
      <OptionsList $open={open} role="listbox">
        {options &&
          options.map((o) => (
            <OptionItem
              key={o.id}
              $selected={o.id === valueId}
              onClick={() => !disabled && handleSelect(o.id, o.name)}
              role="option"
              aria-selected={o.id === valueId}
            >
              {o.icon ? o.icon : null}
              <span>{o.name}</span>
            </OptionItem>
          ))}
      </OptionsList>
    </SelectorWrapper>
  );
}
