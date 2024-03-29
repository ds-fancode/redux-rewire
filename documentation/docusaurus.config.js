// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github')
const darkCodeTheme = require('prism-react-renderer/themes/dracula')

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Redux-Rewire',
  tagline: 'Super scale your React application with ease',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://ds-fancode.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/redux-rewire/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'ds-fancode', // Usually your GitHub org/user name.
  projectName: 'redux-rewire', // Usually your repo name.
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/ds-fancode/redux-rewire/blob/main/documentation',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/ds-fancode/redux-rewire/blob/main/documentation',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/rewire-logo.png',
      navbar: {
        title: 'Redux Rewire',
        logo: {
          alt: 'Redux Rewire',
          src: 'img/rewire-logo.png',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Tutorial',
          },
          {
            type: 'docSidebar',
            sidebarId: 'sidebarAPI',
            position: 'left',
            label: 'API',
          },
          {
            to: 'https://engineering.fancode.com/enhancing-react-app-scalability-a-deep-dive-into-redux-rewire-ebf62ec93e31',
            label: 'Blog',
            position: 'left',
          },
          {
            href: 'https://github.com/ds-fancode/redux-rewire',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Tutorial',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/redux-rewire',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: 'https://engineering.fancode.com/enhancing-react-app-scalability-a-deep-dive-into-redux-rewire-ebf62ec93e31',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/ds-fancode/redux-rewire',
              },
            ],
          },
        ],
        copyright: `Copyright © 2022-${new Date().getFullYear()} Kamlesh & Bishal and all the Fancode authors`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
}

module.exports = config
