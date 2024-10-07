"use client";

import Navbar from "@/components/Navbar/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import ReduxProvider from "@/store/Provider";
import {
  AR_PAGE_DIRECTION,
  EN_PAGE_DIRECTION,
} from "@/constants/Configrations";
import { useSearchParams } from "next/navigation";
import { Container, Row } from "react-bootstrap";

export default function RootLayout({ children }) {
  const searchParams = useSearchParams();
  const LANGAUGE = searchParams.get("lang");

  return (
    <ReduxProvider>
      <html
        lang={LANGAUGE}
        style={{
          direction: `${
            LANGAUGE === "ar" ? AR_PAGE_DIRECTION : EN_PAGE_DIRECTION
          }`,
        }}
      >
        <body>
          <Navbar />
          <main>
            <Container>
              <Row>{children}</Row>
            </Container>
          </main>
        </body>
      </html>
    </ReduxProvider>
  );
}
