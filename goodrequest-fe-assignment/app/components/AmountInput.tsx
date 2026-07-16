"use client";

import { useLayoutEffect, useRef } from "react";
import styled from "styled-components";

type AmountInputProps = {
  placeholder?: string;
  value?: number;
  onChange?: (value: number) => void;
  onFocus?: () => void;
  onBlur?: () => void;
};

const StyledInput = styled.input`
  min-width: 1ch;
  max-width: 100%;
  flex-shrink: 0;
  flex-grow: 0;
  border: none;
  background: transparent;
  padding: 0;
  text-align: right;
  font-size: 60px;
  line-height: 1;
  outline: none;
  color: var(--base-content-tertiary);
`;

export function AmountInput({ placeholder, value, onChange, onFocus, onBlur }: AmountInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const resize = () => {
    const input = inputRef.current;
    if (!input) return;

    const length = Math.max(1, input.value.length || (input.placeholder ? 1 : 0));
    input.style.width = `${length}ch`;
  };

  useLayoutEffect(() => {
    resize();
  }, [value]);

  return (
    <StyledInput
      value={value}
      onChange={(e) => onChange?.(Number(e.target.value))}
      ref={inputRef}
      placeholder={placeholder}
      onInput={resize}
      onFocus={onFocus}
      onBlur={onBlur}
      inputMode="numeric"
      pattern="[0-9]*"
      type="number"
    />
  );
}
