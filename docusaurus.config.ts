import type { Config, ThemeConfig } from '@docusaurus/types';
import type { UserThemeConfig } from '@docusaurus/theme-common';
import type { Options as PluginDocsOptions } from '@docusaurus/plugin-content-docs';
import type { Options as ThemeClassicOptions } from '@docusaurus/theme-classic';
import { visit } from 'unist-util-visit';
import { themes as prismThemes } from 'prism-react-renderer';

const lightCodeTheme = prismThemes.github;
const darkCodeTheme = prismThemes.dracula;

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


const pluginDocs: [string, PluginDocsOptions] = [
  "@docusaurus/plugin-content-docs",
  {
    path: "docs",
    routeBasePath: "/",
    sidebarPath: "./sidebars.ts",
    remarkPlugins: [remarkImageSrcWithRequire],
    include: ["**/*.md", "**/*.mdx"],
    exclude: ["**/_*.{js,jsx,ts,tsx,md,mdx}", "**/_*/**", "**/.**"],
  }
];

const pluginThemeClassic: [string, ThemeClassicOptions] = [
  "@docusaurus/theme-classic",
  {
    customCss: "./src/css/custom.css",
  }
];

const pluginClientRedirects = ["@docusaurus/plugin-client-redirects", {}];

const themeConfig: ThemeConfig & UserThemeConfig =  {
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
      href: 'https://polykey.com',
      target: '_self',
    },
    items: [
      {
        href: "/",
        autoAddBaseUrl: false,
        label: "Home",
        position: "right",
      },
      {
        href: '/download',
        autoAddBaseUrl: false,
        label: 'Download',
        position: 'right',
      },
      {
        href: '/blog',
        autoAddBaseUrl: false,
        label: 'Blog',
        position: 'right',
      },
      {
        href: '/docs',
        autoAddBaseUrl: false,
        label: 'Docs',
        position: 'right'
      },
      {
        href: "https://github.com/MatrixAI/Polykey",
        label: "GitHub",
        position: "right",
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
  prism: {
    theme: lightCodeTheme,
    darkTheme: darkCodeTheme,
    additionalLanguages: ["shell-session"],
  },
};

const config: Config = {
  title: "Polykey Documentation",
  tagline:
    "Tutorials, How-To Guides, Theory and Reference",
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
  staticDirectories: [ "static" ],
  plugins: [
    pluginDocs,
    pluginThemeClassic,
    pluginClientRedirects,
  ],
  themeConfig
};

export default config;
