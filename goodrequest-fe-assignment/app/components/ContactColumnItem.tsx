import styled from "styled-components";
import { IconWrapper } from "./styled";

const ContactContentItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 100%;
`;

const ContactContentItemIcon = styled.div`
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  color: var(--base-action-primary-default);
  background: var(--base-action-primary-bg10);
`;

const ContactContentItemHeading = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: var(--base-content-primary);
  line-height: 32px;
  text-align: center;
  margin-bottom: 8px;
`;

const ContactContentItemDescription = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: var(--base-content-tertiary);
  line-height: 24px;
  text-align: center;
`;

const ContactContentItemHighlight = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: var(--base-action-primary-default);
  line-height: 24px;
  text-align: center;
  padding: 4px;
`;

export default function ContactColumnItem({
  icon,
  heading,
  description,
  highlight,
}: {
  icon: React.ReactNode;
  heading: string;
  description: string;
  highlight: string;
}) {
  return (
    <ContactContentItem>
      <ContactContentItemIcon>
        <IconWrapper>{icon}</IconWrapper>
      </ContactContentItemIcon>
      <div>
        <ContactContentItemHeading>{heading}</ContactContentItemHeading>
        <ContactContentItemDescription>{description}</ContactContentItemDescription>
      </div>
      <ContactContentItemHighlight>{highlight}</ContactContentItemHighlight>
    </ContactContentItem>
  );
}
