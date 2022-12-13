import {
  Chat,
  ForgetPasswordRoute,
  Login,
  ResetPasswordRoute,
  SignUp,
} from "../../routes/routes";
import React, { useEffect, useState } from "react";

import Footer from "../../layouts/Footer";
import { Layout } from "antd";
import NavbarTop from "../../layouts/Navbar";
import { useLocation } from "react-router-dom";

export const AppLayout = React.memo(function AppLayoutImpl(props: any) {
  const [navbarHidden, setNavbarHidden] = useState<boolean>(false);
  const [footerHidden, setFooterHidden] = useState<boolean>(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setNavbarHidden(
      [Login, SignUp, ForgetPasswordRoute, ResetPasswordRoute].includes(
        pathname
      )
    );
    setFooterHidden(
      [Login, SignUp, Chat, ForgetPasswordRoute, ResetPasswordRoute].includes(
        pathname
      )
    );
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <main className="main">
      <Layout id={"main-layout"}>
        <span id={"main-bg"}></span>
        <span id={"bg-gradient"}></span>
        <span id={"static-header-gradient"}></span>
        <span id={"static-end-gradient"}></span>
        {!navbarHidden ? <NavbarTop /> : null}
        {props.children}
        {!footerHidden ? <Footer /> : null}
      </Layout>
    </main>
  );
});
