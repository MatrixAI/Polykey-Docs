// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

// const lightCodeTheme = require('prism-react-renderer/themes/github');
// const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Polykey Documentation',
  tagline: 'Documentation for Polykey - Tutorials, How-To Guides, Theory and Reference',
  url: 'https://polykey.io',
  baseUrl: '/docs/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  trailingSlash: false,
  favicon: 'img/favicon.ico',
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        path: '.',
        routeBasePath: '/',
        include: ['**/*.md', '**/*.mdx'],
        exclude: [
          'tmp',
          'node_modules',
          'build',
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

  // themeConfig:
  //   ({
  //     navbar: {
  //       title: 'My Site',
  //       logo: {
  //         alt: 'My Site Logo',
  //         src: 'img/logo.svg',
  //       },
  //       items: [
  //         {
  //           type: 'doc',
  //           docId: 'index',
  //           position: 'left',
  //           label: 'Index',
  //         },
  //         {
  //           href: 'https://github.com/facebook/docusaurus',
  //           label: 'GitHub',
  //           position: 'right',
  //         },
  //       ],
  //     },
  //     footer: {
  //       style: 'dark',
  //       links: [
  //         {
  //           title: 'Docs',
  //           items: [
  //             {
  //               label: 'Index',
  //               to: '/index',
  //             },
  //           ],
  //         },
  //         {
  //           title: 'Community',
  //           items: [
  //             {
  //               label: 'Stack Overflow',
  //               href: 'https://stackoverflow.com/questions/tagged/docusaurus',
  //             },
  //             {
  //               label: 'Discord',
  //               href: 'https://discordapp.com/invite/docusaurus',
  //             },
  //             {
  //               label: 'Twitter',
  //               href: 'https://twitter.com/docusaurus',
  //             },
  //           ],
  //         },
  //         {
  //           title: 'More',
  //           items: [
  //             {
  //               label: 'Blog',
  //               to: '/blog',
  //             },
  //             {
  //               label: 'GitHub',
  //               href: 'https://github.com/facebook/docusaurus',
  //             },
  //           ],
  //         },
  //       ],
  //       copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
  //     },
  //     prism: {
  //       theme: lightCodeTheme,
  //       darkTheme: darkCodeTheme,
  //     },
  //   }),
};

module.exports = config;
