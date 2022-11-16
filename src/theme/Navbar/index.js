import React from "react";
import NavbarLayout from "@theme/Navbar/Layout";
import NavbarComponent from "../../../docusaurus.config";
import sidebars from "../../../sidebars";
import axios from "axios";

export default function Navbar() {
  const [dynamicClass, setDynamicClass] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [sideBars, setSideBars] = React.useState();
  console.log(sidebars, "Hey");
  React.useEffect(() => {
    setSideBars(sidebars.docs);
  }, []);
  const headers = {
    "Content-Type": "text/plain",
  };
  return (
    <NavbarLayout>
      <div className="container">
        <div className="header_main">
          <div className="header_logo">
            <img src="https://uploads-ssl.webflow.com/6098c4e3255a0a67635c1de5/6098c4e3255a0ac4e35c1e05_poly-key-logo.svg" />
          </div>
          <div className="header_menu">
            <ul>
              {NavbarComponent.themeConfig.navbar.items.map((data, index) => {
                return data.hasOwnProperty("src") ? (
                  <li className="github_main">
                    <a href="https://github.com/MatrixAI/PolyKey/discussions">
                      <img src={data.src} alt={data.alt} />
                    </a>
                  </li>
                ) : (
                  <li id="index">
                    <a href={data.href}>{data.label}</a>
                  </li>
                );
              })}
              <li className="email_box">
                <form id="email-form" name="email-form" data-name="Email Form" action="https://matrix.us9.list-manage.com/subscribe/post?u=c95e0a682d8937f12732b48d4&amp;id=863aebab0f" method="post" className="form nav" aria-label="Email Form">

                <input
                  type="email"
                  placeholder="Your Email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                  <input type="submit"  value="Get Started" data-wait="Please wait..." className="email_box_button" id="email_box_button"  />
                      </form>
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
            {sideBars &&  <ul>
                {
                  sideBars.map((mainData) =>
                  {
                    return (<li> <a><b>{mainData.label}</b></a> 
                      <ul>

                      
                      {mainData.items.map((subMenu) =>
                      {
                        return subMenu.hasOwnProperty("label") ? (<ul><a>{subMenu.label}</a>
                          <ul>
                          {
                            subMenu.items.map((child) =>
                            {
                              return (
                                <li><a>{child}</a></li>
                              )
                            })
                        }</ul>
                        </ul>) : (<li><a>{subMenu}</a></li>)
                        
                        })}
</ul>
                    </li>
                    
                    )
                    
                 })
                  }
              </ul>}
              {/* <ul> */}
                {/* <li>
                  <img src="https://uploads-ssl.webflow.com/6098c4e3255a0a67635c1de5/6098c4e3255a0a4de85c1e10_polykey-logo-black.svg" />
                </li>
                <li>
                  <a href="https://polykey.io/blog">Blog</a>
                </li>
                <li>
                  <a href="https://polykey.io/docs">Docs</a>
                </li>
                <li >
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
                </li> */}
              {/* </ul> */}
            </div>
          </div>
        </div>
      </div>
    </NavbarLayout>
  );
}