import { JSX } from "react/jsx-runtime";
import styled from "styled-components";
import { IconWrapper } from "./styled";

type ButtonOwnProps = {
  iconLeft?: JSX.Element;
  children: React.ReactNode;
  iconRight?: JSX.Element;
  onClick: () => void;
  variant?: string;
  noHorizontalPadding?: boolean;
};

type ButtonProps = ButtonOwnProps &
  Omit<React.ComponentPropsWithoutRef<"button">, keyof ButtonOwnProps>;

const StyledButton = styled.button<{
  variant?: string;
  $noHorizontalPadding?: boolean;
}>`
  width: ${({ $noHorizontalPadding }) => ($noHorizontalPadding ? "100%" : "auto")};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 8px;
  padding: ${({ $noHorizontalPadding }) => ($noHorizontalPadding ? "16px 0" : "16px 32px")};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  background-color: ${({ variant = "primary" }) => `var(--base-action-${variant}-default)`};
  color: ${({ variant = "primary" }) =>
    variant === "primary" ? "var(--inverse-content-primary)" : "var(--base-content-primary)"};
  border: ${({ variant = "primary" }) =>
    variant === "primary"
      ? "1px solid transparent"
      : `1px solid var(--base-action-${variant}-default)`};

  &:hover {
    background-color: ${({ variant = "primary" }) => `var(--base-action-${variant}-hover)`};
  }

  &:active {
    background-color: ${({ variant = "primary" }) => `var(--base-action-${variant}-active)`};
    box-shadow: 0 0 0 2px ${({ variant = "primary" }) => `var(--ring-${variant})`};
  }

  &:disabled {
    opacity: 0.32;
    cursor: not-allowed;
    background-color: ${({ variant = "primary" }) => `var(--base-action-${variant}-disable)`};
    color: ${({ variant = "primary" }) =>
      variant === "primary" ? "var(--inverse-content-primary)" : "var(--base-content-secondary)"};
  }
`;

export default function Button({
  iconLeft,
  children,
  iconRight,
  onClick,
  variant = "primary",
  noHorizontalPadding = false,
  ...rest
}: ButtonProps) {
  return (
    <StyledButton
      type="button"
      onClick={onClick}
      variant={variant}
      $noHorizontalPadding={noHorizontalPadding}
      {...rest}
    >
      {iconLeft && <IconWrapper $size={20}>{iconLeft}</IconWrapper>}
      {children}
      {iconRight && <IconWrapper $size={20}>{iconRight}</IconWrapper>}
    </StyledButton>
  );
}
