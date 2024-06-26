// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from "prism-react-renderer";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Pipecat",
  tagline:
    "An open source framework for real-time, multi-modal, conversational AI applications.",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://pipecat-ai.github.io",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "pipecat-ai", // Usually your GitHub org/user name.
  projectName: "pipecat-ai.github.io", // Usually your repo name.
  trailingSlash: false,

  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",
  deploymentBranch: "gh-pages",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: "./sidebars.js",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: "img/docusaurus-social-card.jpg",
      navbar: {
        title: "Pipecat",
        logo: {
          alt: "Pipecat",
          src: "img/logo.svg",
          srcDark: "img/logo-dark.svg",
          href: "/",
          target: "_self",
          width: 42,
          height: 42,
        },
        items: [
          {
            type: "docSidebar",
            sidebarId: "tutorialSidebar",
            position: "left",
            label: "Docs",
          },
          {
            href: "https://discord.gg/pipecat",
            label: "Discord",
            position: "right",
          },
          {
            href: "https://github.com/pipecat-ai/pipecat",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Community",
            items: [
              {
                label: "GitHub",
                href: "https://github.com/pipecat-ai/pipecat",
              },
              {
                label: "Discord",
                href: "https://discord.gg/pipecat",
              },
              {
                label: "Twitter",
                href: "https://twitter.com/trydaily",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Pipecat.ai. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
