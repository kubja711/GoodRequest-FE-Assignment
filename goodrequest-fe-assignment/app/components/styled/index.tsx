import styled from "styled-components";

export const PageWrapper = styled.div`
  width: 100%;
  max-width: 1440px;
`;

export const HomePageContent = styled.div`
  width: 1280px;
  height: 1024px;
  padding: 0 20px 0 80px;
  display: flex;
  gap: 80px;
`;

export const PageContent = styled.div`
  width: 1440px;
  height: 1024px;
  padding: 60px 80px;
`;

export const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 60px 0;
  max-width: 658px;
  width: 100%;
  flex: none;
  gap: 40px;
`;

export const BottomGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

export const ImageWrapper = styled.div`
  position: relative;
  border-radius: 20px;
  margin: 20px 0;
  overflow: hidden;
  width: 602px;
  height: 984px;
  flex: none;
`;

export const HeadingOne = styled.h1`
  font-size: 48px;
  line-height: 56px;
  font-weight: 700;
  color: var(--base-content-primary);
  margin: 0;
`;

export const Column = styled.div<{ $gap?: number }>`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: ${({ $gap }) => $gap ?? 40}px;
`;

export const ColumnSpaceBetween = styled(Column)`
  justify-content: space-between;
`;

export const Row = styled.div<{ $gap?: number }>`
  display: flex;
  width: 100%;
  align-items: center;
  gap: ${({ $gap }) => $gap ?? 16}px;
`;

export const RowSpaceBetween = styled(Row)`
  justify-content: space-between;
`;

export const StepHeader = styled.div`
  width: 100%;
  display: flex;
  gap: 16px;
  align-items: center;
`;

export const StepItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const StepCircle = styled.div<{ $isActive: boolean; $isCompleted: boolean }>`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  font-size: 16px;
  line-height: 1.5;
  background: ${({ $isActive }) =>
    $isActive ? "var(--base-action-primary-default)" : "var(--bg)"};
  color: ${({ $isActive, $isCompleted }) =>
    $isActive
      ? "var(--inverse-content-primary)"
      : $isCompleted
        ? "var(--base-action-primary-default)"
        : "var(--base-content-quintarny)"};
  border: ${({ $isActive, $isCompleted }) =>
    $isActive
      ? "none"
      : $isCompleted
        ? "1px solid var(--base-action-primary-default)"
        : "1px solid var(--base-surface-tertiary)"};
`;

export const StepLabel = styled.span<{ $isActive: boolean; $isCompleted: boolean }>`
  font-size: 16px;
  line-height: 1.5;
  color: ${({ $isActive, $isCompleted }) =>
    $isActive || $isCompleted ? "var(--base-content-primary)" : "var(--base-content-quintarny)"};
`;

export const StepDivider = styled.div`
  width: 95px;
  height: 1px;
  background: var(--base-content-quintarny);
  margin-left: 8px;
`;

export const Field = styled.span`
  color: var(--base-content-secondary);
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
`;

export const Value = styled.span`
  color: var(--base-content-primary);
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
`;

export const Spacer = styled.div`
  height: 1px;
  width: 100%;
  background: var(--base-content-quintarny);
  margin: 16px 0;
`;

export const IconWrapper = styled.div<{ $size?: number }>`
  width: ${({ $size }) => $size ?? 24}px;
  height: ${({ $size }) => $size ?? 24}px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Paragraph = styled.p`
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: var(--base-content-primary);
  margin: 0;
  width: 100%;
`;

export const HeadingThree = styled.h3<{ $marginBottom?: number }>`
  color: var(--base-content-primary);
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  margin: 0 0 ${({ $marginBottom }) => $marginBottom ?? 16}px 0;
`;

export const HelperText = styled.div`
  color: var(--base-content-primary);
  font-weight: 500;
  font-size: 14px;
  margin-bottom: 4px;
`;

export const OptionalText = styled.span`
  color: var(--base-content-quaternary);
`;

export const CheckboxIcon = styled.svg`
  fill: none;
  stroke: var(--base-action-primary-default);
  stroke-width: 2px;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition:
    opacity 120ms ease,
    transform 120ms ease;
  transform: scale(0.9);

  &:hover {
    stroke: var(--base-action-primary-hover);
  }
`;

export const CheckboxButton = styled.button<{ $checked: boolean }>`
  width: 16px;
  height: 16px;
  border: ${({ $checked }) =>
    $checked
      ? "1px solid var(--base-action-primary-default)"
      : "1px solid var(--base-content-quaternary)"};
  border-radius: 4px;
  background: ${({ $checked }) =>
    $checked ? "var(--base-action-primary-bg)" : "var(--base-surface-primary)"};
  cursor: pointer;

  &:hover {
    border: 1px solid var(--base-action-primary-hover);
  }

  &:focus {
    border: 1px solid var(--base-action-primary-active);
    box-shadow: 0px 0px 0px 2px var(--ring-primary);
  }
`;

export const CheckboxText = styled.p`
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  color: var(--base-content-secondary);
`;
