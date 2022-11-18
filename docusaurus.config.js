const visit = require("unist-util-visit");
const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/**
 * Docusaurus does not process JSX `<img src ="...">` URLs
 * This plugin rewrites the src attribute to `src={require("...").default}`
 * Markdown links `[]()`, images `![](/image)` and anchor `<a href="...">`
 * are already automatically processed
 */
const remarkImageSrcWithRequire = (options) => {
  return (ast) => {
    visit(ast, "jsx", (node) => {
      const matches = node.value.match(/^(<img\s.*?src=)"(\s*\/.*?)"(.*)$/);
      if (matches != null) {
        node.value = `${matches[1]}{require("${matches[2]}").default}${matches[3]}`;
      }
    });
  };
};

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Polykey Documentation",
  tagline:
    "Documentation for Polykey - Tutorials, How-To Guides, Theory and Reference",
  url: "https://polykey.io",
  baseUrl: "/docs/",
  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",
  // Generate `index.html` for each markdown file for pretty URLs
  trailingSlash: undefined,
  favicon: "images/polykey-favicon.png",
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },
  staticDirectories: ["static"],
  plugins: [
    [
      "@docusaurus/plugin-content-docs",
      /** @type {import('@docusaurus/plugin-content-docs').Options} */
      ({
        path: "docs",
        routeBasePath: "/",
        sidebarPath: require.resolve("./sidebars.js"),
        remarkPlugins: [remarkImageSrcWithRequire],
        include: ["**/*.md", "**/*.mdx"],
        exclude: ["**/_*.{js,jsx,ts,tsx,md,mdx}", "**/_*/**", "**/.**"],
      }),
    ],
    [
      "@docusaurus/theme-classic",
      {
        customCss: require.resolve("./src/css/custom.css"),
      },
    ],
    ["@docusaurus/plugin-client-redirects", {}],
  ],
  /** @type {import('@docusaurus/types').ThemeConfig | import('@docusaurus/theme-common').UserThemeConfig} */
  themeConfig: {
    colorMode: {
      disableSwitch: true,
    },
    docs: {
      sidebar: {},
    },
    navbar: {
      title: "Polykey Documentation",
      logo: {
        alt: "Polykey Logo",
        src: "images/polykey-logo-dark.svg",
      },
      items: [
        {
          href: "https://polykey.io/blog",
          label: "Blog",
          position: "left",
        },
        {
          type: "doc",
          docId: "README",
          position: "left",
          label: "Docs",
          href: "/",
        },
        {
          position: "right",
          label: "Download",
          href: "https://polykey.io/download",
        },

        {
          href: "https://github.com/MatrixAI/Polykey-Docs",
          src: "images/github-logo.svg",
          position: "right",
          alt: "Github Logo",
        },
      ],
    },
    footer: {
      style: "dark",
      logo: {
        alt: "Polykey Logo",
        src: "images/polykey-logo-light.svg",
      },
      
      links: [
      //   {
      //     forMobile: {
      //       data:[{
      //     title: "Open Source",
      //     items: [
      //       {
      //         label: "Polykey Core",
      //         href: "https://github.com/MatrixAI/Polykey",
      //       },
      //       {
      //         label: "Polykey CLI",
      //         href: "https://github.com/MatrixAI/Polykey-CLI",
      //       },
      //       {
      //         label: "Polykey Desktop",
      //         href: "https://github.com/MatrixAI/Polykey-Desktop",
      //       },
      //       {
      //         label: "Polykey Mobile",
      //         href: "https://github.com/MatrixAI/Polykey-Mobile",
      //       },
      //     ],
      //   },
      //   {
      //     title: "Resources",
      //     items: [
      //       {
      //         label: "Blog",
      //         href: "../blog",
      //         target: "_parent",
      //       },
      //       {
      //         label: "Documentation",
      //         to: "/",
      //       },
      //     ],
      //   },
      //   {
      //     title: "Community",
      //     items: [
      //       {
      //         label: "Discussions",
      //         href: "https://github.com/MatrixAI/Polykey/discussions",
      //       },
      //       {
      //         label: "Twitter",
      //         href: "https://twitter.com/PolykeyIO",
      //       },
      //       {
      //         label: "Stack Overflow",
      //         href: "https://stackoverflow.com/questions/tagged/polykey",
      //       },
      //     ],
      //   },
      //   {
      //     title: "Company",
      //     items: [
      //       {
      //         label: "About Us",
      //         href: "../about",
      //         target: "_parent",
      //       },
      //       {
      //         label: "Contact Us",
      //         href: "../contact",
      //         target: "_parent",
      //       },
      //       {
      //         label: "Matrix AI",
      //         href: "https://matrix.ai",
      //       },
      //     ],
      //   }]
      //     },
      //     forDesktop: {
      //       data :[{
      //     title: "Matrix AI",
      //     href :"https://matrix.ai/"
      //   },
      //   {
      //     title: "About Us",
      //     href :"https://polykey.io/about"
      //   },
      //   {
      //     title: "Contact Us",
      //     href :"https://matrix.ai/contact"
      //   },
      //   {
      //     title: "Terms",
      //     href :"https://matrix.ai/terms-of-service"
      //   },
      //   {
      //     title: "Privacy",
      //     href :"https://matrix.ai/privacy"
      //   }]
      //     }
      // }
      ],
      
      copyright: `Copyright © ${new Date().getFullYear()} Matrix AI`,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
      additionalLanguages: ["shell-session"],
    },
  },
};

module.exports = config;

