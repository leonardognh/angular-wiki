import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "Angular Wiki",
  tagline: "Documentação Angular",
  favicon: "img/angular.png",
  trailingSlash: true,

  url: "https://leonardognh.github.io",
  baseUrl: "/angular-wiki/",

  organizationName: "leonardognh",
  projectName: "angular-wiki",

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  i18n: {
    defaultLocale: "pt-BR",
    locales: ["pt-BR"],
  },
  themes: ["@docusaurus/theme-live-codeblock"],

  presets: [
    [
      "classic",
      {
        docs: {
          routeBasePath: "docs",
          sidebarPath: require.resolve("./sidebars.ts"),
          lastVersion: "current",
          versions: {
            current: { label: "v14" },
          },
        },

        blog: {
          path: "blog",
          routeBasePath: "blog",
          blogTitle: "Angular Wiki — Blog",
          blogDescription: "Notas, guias e novidades",
          postsPerPage: 10,
          sortPosts: "descending",
          include: ["**/*.{md,mdx}"],
          exclude: [
            "**/_*.{js,jsx,ts,tsx,md,mdx}",
            "**/_*/**",
            "**/*.test.{js,jsx,ts,tsx}",
            "**/__tests__/**",
          ],
          showReadingTime: true,
          readingTime: ({ content, defaultReadingTime }) =>
            defaultReadingTime({ content, options: { wordsPerMinute: 220 } }),

          authorsMapPath: "authors.yml",
          tags: "tags.yml",
          onInlineTags: "throw",

          feedOptions: {
            type: ["rss", "atom", "json"],
            title: "Angular Wiki — Feed",
            description: "Updates do Angular Wiki",
            limit: 20,
            xslt: true,
          },
          truncateMarker: /{\/\*\s*truncate\s*\*\/}/,

          processBlogPosts: async ({ blogPosts }) =>
            blogPosts.filter((p) => !p.metadata.frontMatter.draft),

          tagsBasePath: "tags",
          pageBasePath: "page",
          archiveBasePath: "archive",
        },

        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    liveCodeBlock: { playgroundPosition: "bottom" },
    image: "img/angular.png",
    navbar: {
      title: "Angular Wiki",
      logo: { alt: "Angular Logo", src: "img/logo.svg" },
      items: [
        {
          type: "docSidebar",
          sidebarId: "tutorialSidebar",
          position: "left",
          label: "Documentação",
        },

        { to: "/blog", label: "Blog", position: "left" },
        {
          type: "docsVersionDropdown",
          position: "right",
          dropdownActiveClassDisabled: true,
        },
        { to: "agradecimentos", label: "Agradecimentos", position: "left" },
      ],
    },
    footer: {
      style: "dark",
      copyright: `Copyright © ${new Date().getFullYear()} Angular Wiki.`,
    },
    prism: { theme: prismThemes.github, darkTheme: prismThemes.dracula },
  } satisfies Preset.ThemeConfig,
};

export default config;
