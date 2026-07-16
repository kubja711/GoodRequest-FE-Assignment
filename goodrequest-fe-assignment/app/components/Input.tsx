import styled from "styled-components";
import { Row } from "./styled";
import { Selector, Option } from "./Selector";

const InputWrapper = styled.div`
  width: 100%;
`;

const StyledInput = styled.input<{ $error?: boolean }>`
  width: 100%;
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
  border: none;
  background: var(--base-surface-tertiary);
  border-radius: 8px;
  padding: 16px;
  border: ${({ $error }) =>
    $error ? "1px solid var(--base-state-error-fg)" : "1px solid transparent"};

  transition: all 0.2s ease;

  &:placeholder {
    color: var(--base-content-quarternary);
  }
  &:hover {
    background: var(--base-surface-quarternary);
  }
  &:focus {
    background: var(--base-surface-primary);
    border: ${({ $error }) =>
      $error
        ? "1px solid var(--base-state-error-fg)"
        : "1px solid var(--base-action-primary-active)"};
    outline: ${({ $error }) =>
      $error ? "2px solid var(--ring-destructive)" : "2px solid var(--ring-primary)"};
  }
`;

const Label = styled.label`
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  margin-bottom: 4px;
  color: var(--base-content-primary);
`;

const Hint = styled.p`
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  color: var(--base-state-error-fg);
  margin-top: 4px;
`;

export default function Input({
  placeholder,
  label,
  hintText,
  showHint,
  selectedOption,
  selectorOptions,
  onSelect,
  ...props
}: {
  placeholder?: string;
  label?: string;
  hintText?: string;
  showHint?: boolean;
  selectedOption?: Option;
  selectorOptions?: Option[];
  onSelect?: (item: number) => void;
  [key: string]: unknown;
}) {
  return (
    <InputWrapper>
      {label && <Label>{label}</Label>}
      <Row>
        {selectorOptions && (
          <Selector
            options={selectorOptions}
            valueId={selectedOption?.id ?? selectorOptions[0].id}
            onChange={(id) => onSelect?.(id)}
            style={{ width: "130px" }}
          />
        )}
        <StyledInput placeholder={placeholder} $error={showHint} {...props} />
      </Row>

      {showHint && hintText && <Hint>{hintText}</Hint>}
    </InputWrapper>
  );
}
