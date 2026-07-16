import type { Metadata } from "next";
import { Inter } from "next/font/google";
import styled from "styled-components";
import StyledComponentsRegistry from "./lib/StyledComponentsRegistry";
import QueryProvider from "./lib/QueryProvider";
import I18nProvider from "./lib/I18nProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Good boy",
  description: "Nadácia Good Boy",
};

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sk" className={inter.variable}>
      <body>
        <QueryProvider>
          <I18nProvider>
            <StyledComponentsRegistry>
              <AppContainer>{children}</AppContainer>
            </StyledComponentsRegistry>
          </I18nProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
