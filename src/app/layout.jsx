'use client';

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import ReduxProvider from "@/store/Provider";
import { Container, Row } from "react-bootstrap";

export default function RootLayout({ children }) {
  const [language, setLanguage] = useState("en");
  const [direction, setDirection] = useState("ltr");

  const updateLanguageAndDirection = () => {
    const params = new URLSearchParams(window.location.search);
    const lang = params.get("lang") || "en";
    
    setLanguage(lang);
    setDirection(lang === "ar" ? "rtl" : "ltr");
  };

  useEffect(() => {
    updateLanguageAndDirection(); 

    const handlePopState = () => {
      updateLanguageAndDirection();
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  useEffect(() => {
    const handleUrlChange = () => {
      updateLanguageAndDirection();
    };

    const handleRouteChange = () => {
      handleUrlChange();
    };

    window.history.pushState = (f => function pushState(...args) {
      const ret = f.apply(this, args);
      handleRouteChange();
      return ret;
    })(window.history.pushState);

    window.history.replaceState = (f => function replaceState(...args) {
      const ret = f.apply(this, args);
      handleRouteChange();
      return ret;
    })(window.history.replaceState);

  }, []);

  return (
    <ReduxProvider>
      <html lang={language} style={{ direction }}>
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
