'use client';

import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import Navbar from "@/components/Navbar/Navbar";
import ReduxProvider from "@/store/Provider";
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css';
import "react-step-progress-bar/styles.css";
import "./globals.css";
import { Bounce, ToastContainer } from "react-toastify";

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

          <ToastContainer
            position="top-center"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            transition={Bounce}
          />
        </body>
      </html>
    </ReduxProvider>
  );
}
