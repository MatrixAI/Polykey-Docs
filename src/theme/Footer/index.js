import React from "react";
import { useThemeConfig } from "@docusaurus/theme-common";
import FooterLinks from "@theme/Footer/Links";
import FooterLogo from "@theme/Footer/Logo";
import FooterCopyright from "@theme/Footer/Copyright";
import FooterLayout from "@theme/Footer/Layout";
function Footer() {
  const { footer } = useThemeConfig();
  if (!footer) {
    return null;
  }
  const { copyright, links, logo, style } = footer;
  return (
    <footer>
      <div className="FooterContainer">
        {/* <div className="padding-both"> */}
        <div className="row justify-content-between">
          <div className="logo">
            <a href="https://polykey.io/">
              <img src="https://uploads-ssl.webflow.com/6098c4e3255a0a67635c1de5/6098c4e3255a0ac4e35c1e05_poly-key-logo.svg" />
            </a>
          </div>
          <div className="company-name">
            <p className="company-product">Polykey is a product of Matrix AI</p>
            <p className="copyright">copyright @2022 All Rights Reserved</p>
          </div>
          <div className="useful-links">
            <ul className="row">
              <li>
                <a href="https://matrix.ai/">Matrix AI</a>
              </li>
              <li>
                <a href="https://polykey.io/about">About Us</a>
              </li>
              <li>
                <a href="https://polykey.io/contact">Contect Us</a>
              </li>
              <li>
                <a href="https://polykey.io/terms-of-service">Terms</a>
              </li>
              <li>
                <a href="https://polykey.io/privacy">Privacy</a>
              </li>
            </ul>
          </div>
        </div>
        {/* </div> */}
      </div>
    </footer>
  );
}
export default React.memo(Footer);
