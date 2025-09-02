import type { Config } from '@docusaurus/types';
import type { Options as PluginSVGROptions } from '@docusaurus/plugin-svgr';
import type { Options as PluginDocsOptions } from '@docusaurus/plugin-content-docs';
import type { Options as PluginGTagOptions } from '@docusaurus/plugin-google-gtag';
import type { Options as ThemeOptions } from '@docusaurus/theme-classic';
import type { UserThemeConfig } from '@docusaurus/theme-common';
import { themes as prismThemes } from 'prism-react-renderer';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';

const lightCodeTheme = prismThemes.github;
const darkCodeTheme = prismThemes.dracula;

const pluginSVGR: [string, PluginSVGROptions] = [
  '@docusaurus/plugin-svgr',
  {
    svgrConfig: {},
  },
];

const pluginTailwind = () => {
  return {
    name: 'docusaurus-plugin-tailwindcss',
    injectHtmlTags() {
      return {
        headTags: [
          {
            tagName: 'link',
            attributes: {
              rel: 'stylesheet',
              href: 'https://cdn.jsdelivr.net/npm/tailwindcss/dist/preflight.min.css',
            },
          },
        ],
      };
    },
    configurePostCss(postcssOptions) {
      // Appends TailwindCSS and AutoPrefixer.
      postcssOptions.plugins.push(tailwindcss);
      postcssOptions.plugins.push(autoprefixer);
      return postcssOptions;
    },
  };
};

const pluginGTag: [string, PluginGTagOptions] = [
  '@docusaurus/plugin-google-gtag',
  {
    trackingID: 'G-GSMHXNB32E',
    anonymizeIP: false,
  },
];

const pluginDocs: [string, PluginDocsOptions] = [
  '@docusaurus/plugin-content-docs',
  {
    path: 'docs',
    routeBasePath: '/',
    sidebarPath: './sidebars.ts',
    include: ['**/*.md', '**/*.mdx'],
    exclude: ['**/_*.{js,jsx,ts,tsx,md,mdx}', '**/_*/**', '**/.**'],
  },
];

const pluginTheme: [string, ThemeOptions] = [
  '@docusaurus/theme-classic',
  {
    customCss: require.resolve('./src/css/custom.css'),
  },
];

const themeConfig: UserThemeConfig = {
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
        label: 'Home',
        to: 'pathname:///',
        autoAddBaseUrl: false,
        target: '_self',
        position: 'right',
      },
      {
        label: 'Download',
        to: 'pathname:///download',
        autoAddBaseUrl: false,
        target: '_self',
        position: 'right',
      },
      {
        label: 'Blog',
        to: 'pathname:///blog',
        autoAddBaseUrl: false,
        target: '_self',
        position: 'right',
      },
      {
        label: 'Docs',
        to: '/docs/',
        position: 'right',
      },
      {
        label: 'GitHub',
        to: 'https://github.com/MatrixAI/Polykey',
        position: 'right',
      },
    ],
  },
  footer: {
    style: 'dark',
    logo: {
      alt: 'Polykey Logo',
      src: 'images/polykey-logotype-light-light.svg',
      href: 'https://polykey.com',
      target: '_self',
    },
    links: [
      {
        title: 'Resources',
        items: [
          {
            label: 'Download',
            to: 'pathname:///download',
            autoAddBaseUrl: false,
            target: '_self',
          },
          {
            label: 'Blog',
            to: 'pathname:///blog',
            autoAddBaseUrl: false,
            target: '_self',
          },
          {
            label: 'Docs',
            to: '/docs/',
          },
          {
            label: 'Mainnet Network',
            to: 'https://mainnet.polykey.com',
          },
          {
            label: 'Testnet Network',
            to: 'https://testnet.polykey.com',
          },
        ],
      },
      {
        title: 'Community',
        items: [
          {
            label: 'Discord',
            to: 'https://discord.gg/vfXQZwwugc',
          },
          {
            label: 'Twitter/X',
            to: 'https://twitter.com/PolykeyIO',
          },
          {
            label: 'Stack Overflow',
            to: 'https://stackoverflow.com/questions/tagged/polykey',
          },
        ],
      },
      {
        title: 'Open Source',
        items: [
          {
            label: 'Polykey Core',
            to: 'https://github.com/MatrixAI/Polykey',
          },
          {
            label: 'Polykey CLI',
            to: 'https://github.com/MatrixAI/Polykey-CLI',
          },
          {
            label: 'Polykey Desktop',
            to: 'https://github.com/MatrixAI/Polykey-Desktop',
          },
          {
            label: 'Polykey Mobile',
            to: 'https://github.com/MatrixAI/Polykey-Mobile',
          },
        ],
      },
      {
        title: 'Company',
        items: [
          {
            label: 'Matrix AI',
            to: 'https://matrix.ai',
          },
          {
            label: 'About Us',
            to: 'https://matrix.ai/about',
          },
          {
            label: 'Terms of Service',
            to: 'pathname:///terms-of-service',
            autoAddBaseUrl: false,
            target: '_self',
          },
          {
            label: 'Privacy Policy',
            to: 'pathname:///privacy-policy',
            autoAddBaseUrl: false,
            target: '_self',
          },
        ],
      },
    ],
    copyright: `Copyright © ${new Date().getFullYear()} Matrix AI`,
  },
  prism: {
    theme: lightCodeTheme,
    darkTheme: darkCodeTheme,
    additionalLanguages: ['shell-session'],
  },
};

const config: Config = {
  title: 'Polykey Documentation',
  tagline: 'Tutorials, How-To Guides, Theory and Reference',
  favicon: 'images/polykey-favicon.png',
  url: 'https://polykey.com',
  // The `baseUrl` always must end with a trailing slash.
  baseUrl: '/docs/',
  organizationName: 'MatrixAI',
  projectName: 'PolyKey-Docs',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  markdown: {
    mermaid: true
  },
  // This ensures that `/x.md` is generated as `/x/index.html` and not `/x.html`.
  // Which is the expected directory layout for most web servers.
  trailingSlash: undefined,
  staticDirectories: ['static'],
  plugins: [pluginSVGR, pluginDocs, pluginTheme, pluginGTag, pluginTailwind],
  themes: ['@docusaurus/theme-mermaid'],
  themeConfig,
};

export default config;
