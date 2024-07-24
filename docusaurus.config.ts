import type { Config } from '@docusaurus/types';
import type { Options as PluginDocsOptions } from '@docusaurus/plugin-content-docs';
import type { Options as PluginGTagOptions } from '@docusaurus/plugin-google-gtag';
import type { Options as ThemeOptions } from '@docusaurus/theme-classic';
import type { UserThemeConfig } from '@docusaurus/theme-common';
import { visit } from 'unist-util-visit';

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

const pluginGTag: [string, PluginGTagOptions] = [
  '@docusaurus/plugin-google-gtag',
  {
    trackingID: 'G-GSMHXNB32E',
    anonymizeIP: false,
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
    defaultMode: 'dark',
    // DisableSwitch: false,
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
    additionalLanguages: ['shell-session', 'bash'],
    theme: require('./src/css/custom-prism-theme.ts'),
    darkTheme: require('./src/css/dark-custom-prism-theme.ts'),
  },
};

const config: Config = {
  title: 'Polykey Documentation',
  tagline: 'Tutorials, How-To Guides, Theory and Reference',
  url: 'https://polykey.com',
  // The `baseUrl` always must end with a trailing slash.
  baseUrl: '/docs/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  // This ensures that `/x.md` is generated as `/x/index.html` and not `/x.html`.
  // Which is the expected directory layout for most web servers.
  trailingSlash: undefined,
  favicon: 'images/polykey-favicon.png',
  organizationName: 'MatrixAI',
  projectName: 'PolyKey-Docs',
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  staticDirectories: ['static'],
  plugins: [pluginDocs, pluginTheme, pluginGTag],
  themeConfig,
};

export default config;
