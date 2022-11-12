import React from "react";
import NavbarLayout from "@theme/Navbar/Layout";
import NavbarContent from "@theme/Navbar/Content";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Logo from "../../../images/polykey-logo-light.svg";

export default function Navbar() {
  const [dynamicClass, setDynamicClass] = React.useState(false);
  const [email, setEmail] = React.useState("");
  return (
    <NavbarLayout>
      <div className="container">
        <div className="header_main">
          <div className="header_logo">
            <img src="https://uploads-ssl.webflow.com/6098c4e3255a0a67635c1de5/6098c4e3255a0ac4e35c1e05_poly-key-logo.svg" />
          </div>
          <div className="header_menu">
            <ul>
              <li>
                <a href="https://polykey.io/blog">Blog</a>
              </li>
              <li>
                <a href="https://polykey.io/docs">Docs</a>
              </li>
              <li>
                <a href="https://polykey.io/download">Download</a>
              </li>
              <li>
                <a href="https://github.com/MatrixAI/PolyKey/discussions">
                  <img
                    src="https://uploads-ssl.webflow.com/6098c4e3255a0a67635c1de5/6098c4e3255a0a39ef5c1e04_git-hub-white.svg"
                    alt=""
                  />
                </a>
              </li>
              <li className="email_box">
                <input
                  type="email"
                  placeholder="Your Email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    console.log(email);
                  }}
                >
                  Get Started
                </button>
              </li>
            </ul>
          </div>
          <div className="header_mobile_menu">
            <div
              className="mobile_menu_icon"
              onClick={() => {
                setDynamicClass(true);
              }}
            >
              <img
                src="https://uploads-ssl.webflow.com/6098c4e3255a0a67635c1de5/6098c4e3255a0a26ee5c1e0c_burger-menu.svg"
                alt=""
              />
            </div>
            <div className="mobile_menu" id={dynamicClass ? "show" : "hide"}>
              <div
                className="mobile_menu_close"
                onClick={() => {
                  setDynamicClass(false);
                }}
              >
                <img
                  src="https://uploads-ssl.webflow.com/6098c4e3255a0a67635c1de5/6098c4e3255a0a2de55c1e0e_menu-exist.svg"
                  alt=""
                />
              </div>
              <ul>
                <li>
                  <img src="https://uploads-ssl.webflow.com/6098c4e3255a0a67635c1de5/6098c4e3255a0a4de85c1e10_polykey-logo-black.svg" />
                </li>
                <li>
                  <a href="https://polykey.io/blog">Blog</a>
                </li>
                <li>
                  <a href="https://polykey.io/docs">Docs</a>
                </li>
                <li>
                  <a href="https://github.com/MatrixAI/PolyKey/discussions">
                    <img
                      src="https://uploads-ssl.webflow.com/6098c4e3255a0a67635c1de5/6098c4e3255a0a15a65c1e03_github-logo-btn.svg"
                      alt=""
                    />
                    Join Discussion
                  </a>
                </li>
                <li>
                  <a href="https://polykey.io/download">Download Now</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </NavbarLayout>
  );
}
