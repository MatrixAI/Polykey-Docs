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
 * This plugin rewrites the src attribute to `src="/docs/..."`
 * Markdown links `[]()`, images `![](/image)` and anchor `<a href="...">`
 * are already automatically processed.
 * Note that this is a hack, and it's ideal to instead prefer using `require`.
 * However those images would not be viewable in the GitHub markdown.
 */
const remarkImageSrcWithDocsPrefix = () => {
  return (tree) => {
    visit(tree, 'mdxJsxFlowElement', (node) => {
      if (node.name === 'img') {
        const srcAttribute = node.attributes.find(
          (attr) => attr.name === 'src',
        );
        if (
          srcAttribute != null &&
          typeof srcAttribute.value === 'string' &&
          srcAttribute.value.startsWith('/images/')
        ) {
          srcAttribute.value = `/docs${srcAttribute.value}`;
        }
      }
    });
  };
};

const pluginDocs: [string, PluginDocsOptions] = [
  '@docusaurus/plugin-content-docs',
  {
    path: 'docs',
    routeBasePath: '/',
    sidebarPath: './sidebars.ts',
    remarkPlugins: [remarkImageSrcWithDocsPrefix],
    include: ['**/*.md', '**/*.mdx'],
    exclude: ['**/_*.{js,jsx,ts,tsx,md,mdx}', '**/_*/**', '**/.**'],
  },
];

const pluginThemeClassic: [string, ThemeClassicOptions] = [
  '@docusaurus/theme-classic',
  {
    customCss: './src/css/custom.css',
  },
];

const pluginClientRedirects = ['@docusaurus/plugin-client-redirects', {}];

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
            to: '/docs/'
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
  url: 'https://polykey.com',
  baseUrl: '/docs/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  // The `baseUrl` always must end with a trailing slash.
  trailingSlash: false,
  favicon: 'images/polykey-favicon.png',
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  staticDirectories: ['static'],
  plugins: [pluginDocs, pluginThemeClassic, pluginClientRedirects],
  themeConfig,
};

export default config;
