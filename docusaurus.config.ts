import type { Config } from '@docusaurus/types';
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

const themeConfig: UserThemeConfig =  {
  colorMode: {
    disableSwitch: true,
  },
  navbar: {
    logo: {
      alt: 'Polykey Logo',
      src: 'images/polykey-logotype-light-light.svg',
      href: 'https://polykey.com',
      target: '_self',
    },
    items: [
      {
        label: "Home",
        href: "/",
        autoAddBaseUrl: false,
        position: "right",
      },
      {
        label: 'Download',
        href: '/download',
        autoAddBaseUrl: false,
        position: 'right',
      },
      {
        label: 'Blog',
        href: '/blog',
        autoAddBaseUrl: false,
        position: 'right',
      },
      {
        label: 'Docs',
        href: '/docs',
        autoAddBaseUrl: false,
        position: 'right'
      },
      {
        label: "GitHub",
        to: "https://github.com/MatrixAI/Polykey",
        position: "right",
      },
    ],
  },
  footer: {
    style: "dark",
    logo: {
      alt: "Polykey Logo",
      src: 'images/polykey-logotype-light-light.svg',
      href: 'https://polykey.com',
      target: '_self',
    },
    links: [
      {
        title: "Resources",
        items: [
          {
            label: 'Download',
            href: '/download',
            autoAddBaseUrl: false,
          },
          {
            label: 'Blog',
            href: '/blog',
            autoAddBaseUrl: false,
          },
          {
            label: "Docs",
            href: '/docs',
            autoAddBaseUrl: false,
          },
        ],
      },
      {
        title: "Community",
        items: [
          {
            label: 'Discord',
            href: 'https://discord.gg/vfXQZwwugc'
          },
          {
            label: "Twitter/X",
            href: "https://twitter.com/PolykeyIO",
          },
          {
            label: "Stack Overflow",
            href: "https://stackoverflow.com/questions/tagged/polykey",
          },
        ],
      },
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
        title: "Company",
        items: [
          {
            label: "Matrix AI",
            href: "https://matrix.ai",
          },
          {
            label: "About Us",
            href: "https://matrix.ai/about",
          },
          {
            label: 'Terms of Service',
            href: '/terms-of-service',
            autoAddBaseUrl: false,
          },
          {
            label: 'Privacy Policy',
            href: '/privacy-policy',
            autoAddBaseUrl: false,
          }
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
