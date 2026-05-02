import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const organizationName = "leonardognh";
const projectName = "angular-wiki";

const config: Config = {
  title: "Angular Wiki",
  tagline: "Angular Wiki — do clássico ao moderno, sem enrolação.",
  favicon: "img/favicon.ico",

  future: {
    v4: true,
  },

  url: `https://${organizationName}.github.io`,
  baseUrl: `/${projectName}/`,
  trailingSlash: false,

  organizationName,
  projectName,
  deploymentBranch: "gh-pages",

  onBrokenLinks: "throw",

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: "warn",
    },
  },

  i18n: {
    defaultLocale: "pt-BR",
    locales: ["pt-BR"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          editUrl: `https://github.com/${organizationName}/${projectName}/tree/main/`,
          showLastUpdateTime: true,
          showLastUpdateAuthor: true,
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: "img/angular-wiki-social-card.png",
    colorMode: {
      defaultMode: "dark",
      respectPrefersColorScheme: true,
    },
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: false,
      },
    },
    navbar: {
      title: "Angular Wiki",
      logo: {
        alt: "Angular Wiki Logo",
        src: "img/logo.svg",
      },
      items: [
        {
          type: "doc",
          docId: "documentacao",
          label: "Documentação",
          position: "left",
          sidebarId: "documentacaoSidebar",
        },
        { to: "/agradecimentos", label: "Agradecimentos", position: "left" },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Documentação",
          items: [
            { label: "Era Clássica", to: "/docs/era-classica/modules" },
            {
              label: "Era Transição",
              to: "/docs/era-transicao/standalone-components",
            },
            { label: "Era Moderna", to: "/docs/era-moderna/signals" },
          ],
        },
        {
          title: "Recursos",
          items: [
            { label: "Angular.dev", href: "https://angular.dev" },
            { label: "Angular Blog", href: "https://blog.angular.dev" },
            {
              label: "Angular GitHub",
              href: "https://github.com/angular/angular",
            },
          ],
        },
        {
          title: "Comunidade",
          items: [
            {
              label: "GitHub",
              href: `https://github.com/${organizationName}/${projectName}`,
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Angular Wiki.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ["bash", "json", "typescript"],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
