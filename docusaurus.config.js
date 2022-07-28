// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Polykey Documentation',
  tagline: 'Documentation for Polykey - Tutorials, How-To Guides, Theory and Reference',
  url: 'https://polykey.io',
  baseUrl: '/docs/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  trailingSlash: false,
  favicon: 'images/polykey-favicon.png',
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  staticDirectories: ['static'],
  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        path: 'docs',
        routeBasePath: '/',
        sidebarPath: require.resolve('./sidebars.js'),
        include: ['**/*.md', '**/*.mdx'],
        exclude: [
          '**/_*.{js,jsx,ts,tsx,md,mdx}',
          '**/_*/**',
          '**/.**'
        ],
      }
    ],
    [
      '@docusaurus/theme-classic',
      {}
    ],
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          {
            from: '/Home',
            to: '/'
          }
        ]
      }
    ]
  ],
  /** @type {import('@docusaurus/types').ThemeConfig | import('@docusaurus/theme-common').UserThemeConfig} */
  themeConfig: {
    navbar: {
      title: 'Polykey Documentation',
      logo: {
        alt: 'Polykey Logo',
        src: 'images/Polykey Logo.svg',
      },
      items: [
        {
          type: 'doc',
          docId: 'Home',
          position: 'left',
          label: 'Home',
        },
        {
          href: 'https://github.com/MatrixAI/Polykey-Docs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      logo: {
        alt: 'Polykey Logo',
        src: 'images/Polykey Logo Light.svg',
      },
      links: [
        {
          title: 'Open Source',
          items: [
            {
              label: 'Polykey Core',
              href: 'https://github.com/MatrixAI/Polykey',
            },
            {
              label: 'Polykey CLI',
              href: 'https://github.com/MatrixAI/Polykey-CLI',
            },
            {
              label: 'Polykey Desktop',
              href: 'https://github.com/MatrixAI/Polykey-Desktop',
            },
            {
              label: 'Polykey Mobile',
              href: 'https://github.com/MatrixAI/Polykey-Mobile',
            },
          ],
        },
        {
          title: 'Resources',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'Documentation',
              to: '/docs',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Discussions',
              href: 'https://github.com/MatrixAI/Polykey/discussions'
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/PolykeyIO',
            },
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/polykey',
            },
          ],
        },
        {
          title: 'Company',
          items: [
            {
              label: 'About Us',
              href: '/about'
            },
            {
              label: 'Contact Us',
              href: '/contact'
            },
            {
              label: 'Matrix AI',
              href: 'https://matrix.ai'
            },
          ]
        }
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Matrix AI`,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
  },
};

module.exports = config;
