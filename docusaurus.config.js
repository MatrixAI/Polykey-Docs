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
      const matches = node.value.match(
        /^(.*)(<img\s.*?src=)"(\s*\/.*?)"(.*)$/s
      );
      if (matches != null) {
        node.value = `${matches[1]}${matches[2]}{require("${matches[3]}").default}${matches[4]}`;
      }
    });
  };
};

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Polykey Documentation",
  tagline:
    "Documentation for Polykey - Tutorials, How-To Guides, Theory and Reference",
  url: "https://polykey.com",
  // ...
  themes: ['@docusaurus/theme-search-algolia'],
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
      title: '',
      logo: {
        alt: 'Polykey',
        src: "images/polykey.svg",
      },
      items: [
        { to: 'https://polykey.com/blog', label: 'Blog', position: 'right' },
        { to: 'pathname:///docs', label: 'Docs', position: 'right' },
        { to: 'https://polykey.com/download', label: 'Download', position: 'right' },
        {
          href: "https://github.com/MatrixAI/Polykey-Docs",
          label: "GitHub", // Keep this as a placeholder or accessibility
          position: "right",
          className: "navbar-github-link", // Custom class name
        },
      ],
    },
    footer: {
      style: "dark",
      logo: {
        alt: "Polykey Logo",
        src: "images/polykey.svg",
      },
      links: [
        {
          title: "Open Source",
          items: [
            {
              label: "Polykey Core",
              href: "https://github.com/MatrixAI/Polykey",
            },
            {
              label: "Polykey CLI",
              href: "https://github.com/MatrixAI/Polykey-CLI",
            },
            {
              label: "Polykey Desktop",
              href: "https://github.com/MatrixAI/Polykey-Desktop",
            },
            {
              label: "Polykey Mobile",
              href: "https://github.com/MatrixAI/Polykey-Mobile",
            },
          ],
        },
        {
          title: "Resources",
          items: [
            {
              label: "Blog",
              href: "pathname:///../blog",
              target: "_parent",
            },
            {
              label: "Documentation",
              to: "/",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "Discussions",
              href: "https://github.com/MatrixAI/Polykey/discussions",
            },
            {
              label: "Twitter",
              href: "https://twitter.com/PolykeyIO",
            },
            {
              label: "Stack Overflow",
              href: "https://stackoverflow.com/questions/tagged/polykey",
            },
          ],
        },
        {
          title: "Company",
          items: [
            {
              label: "About Us",
              href: "https://matrix.ai/about",
              target: "_parent",
            },
            {
              label: "Contact Us",
              href: "https://matrix.ai/contact",
              target: "_parent",
            },
            {
              label: "Matrix AI",
              href: "https://matrix.ai",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Matrix AI`,
    },
    algolia: {
      // The application ID provided by Algolia
      appId: '6MOCW50NJK',

      // Public API key: it is safe to commit it
      apiKey: 'abfd2c5cbdf3894b0fd5a5d1e3d3fe6e',

      indexName: 'polykey',

      placeholder: 'CAN YOU SEE THIS????????',

    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
      additionalLanguages: ["shell-session"],
    },
  },
};

module.exports = config;
