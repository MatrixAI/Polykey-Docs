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
  /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
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
        alt: 'Polykey Logo',
        src: 'images/polykey-logotype-light-light.svg',
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
      style: "light",
      logo: {
        alt: "Polykey Logo",
        src: "/images/polykey-logotype-light-light.svg",
      },
      links: [
        {
          label: 'Matrix AI',
          href: 'https://www.matrix.ai',
        },
        {
          label: 'Terms',
          to: '/terms-of-service',
        },
        {
          label: 'Privacy',
          to: '/privacy',
        },
      ],
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
      additionalLanguages: ["shell-session"],
    },
  },
};

module.exports = config;
