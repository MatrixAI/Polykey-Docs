import React from "react";
import { useThemeConfig } from "@docusaurus/theme-common";
import FooterContent from "../../../docusaurus.config"
function Footer() {
 const [footerLink,setFooterLink] = React.useState()
 const [footerLinkMobile,setFooterLinkMobile] = React.useState()
  const [currentWidth, setCurrentWidth] = React.useState(window.innerWidth)
  const { footer } = useThemeConfig();
  if (!footer) {
    return null;
  }
  var year = new Date().getFullYear();
  React.useEffect(() =>
  {
    console.log("footer",FooterContent?.themeConfig.footer.links[0].forDesktop.data)
    setFooterLink(FooterContent?.themeConfig.footer.links[0].forDesktop.data)
    setFooterLinkMobile(FooterContent?.themeConfig.footer.links[0].forMobile.data)
  }, [])
  //  console.log(wind,"Footer")
  React.useEffect(() => {
    function handleResize()
    {
      
      setCurrentWidth(window.innerWidth)
    }

    window.addEventListener('resize',handleResize)
  })
  const { copyright, links, logo, style } = footer;
  return (
    <footer>
      <div className="container">
        {/* <div className="padding-both"> */}
        <div className="row justify-content-between">
          <div className="logo">
            <a href="https://polykey.io/">
              <img src="https://uploads-ssl.webflow.com/6098c4e3255a0a67635c1de5/6098c4e3255a0ac4e35c1e05_poly-key-logo.svg" />
            </a>
          </div>
          <div className="company-name">
            <p className="company-product">Polykey is a product of Matrix AI</p>
            <p className="copyright">copyright @{year} Matrix AI</p>
          </div>
          <div className="useful-links">
            <ul className="row">
              {currentWidth > 769 ? footerLink?.map((data, index) => {
                return (<li id={index}>
                  <a href={data.href}>{data.title}</a>
                </li>
                )
              }) : footerLinkMobile?.map((data, index) =>
              {
                return (
                  <div id={index}>
                    <h5 className="footerTitle">{data.title}</h5>
                    {data.items && (<ul>

                    { data.items.map((subData,index) =>
                    {
                      return (
                        <ol id={index} >
                          <a href={subData?.href}>{ subData.label}</a>
                        </ol>
                      )
                    })}
                    </ul>)}
                    </div>
                  ) 
              })
              }
              {/* <li>
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
              </li> */}
            </ul>
          </div>
        </div>
        {/* </div> */}
      </div>
    </footer>
  );
}
export default React.memo(Footer);