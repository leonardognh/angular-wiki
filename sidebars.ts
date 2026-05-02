import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

/**
 * Sidebar única: item “Documentação” no header abre esta árvore; as eras expandem
 * aqui dentro (não há troca de sidebar por tema).
 */
const sidebars: SidebarsConfig = {
  documentacaoSidebar: [
    {
      type: "category",
      label: "Documentação",
      collapsed: false,
      link: { type: "doc", id: "documentacao" },
      items: [
        "intro",
        {
          type: "category",
          label: "Era clássica (v2–14)",
          collapsed: true,
          link: { type: "doc", id: "era-classica/index" },
          items: [
            "era-classica/modules",
            "era-classica/components",
            "era-classica/templates",
            "era-classica/data-binding",
            "era-classica/directives",
            "era-classica/pipes",
            "era-classica/services-di",
            "era-classica/lifecycle",
            "era-classica/component-communication",
            "era-classica/routing",
            "era-classica/forms",
            "era-classica/http",
            "era-classica/rxjs",
            "era-classica/testing",
          ],
        },
        {
          type: "category",
          label: "Era transição (v14–16)",
          collapsed: true,
          link: { type: "doc", id: "era-transicao/index" },
          items: [
            "era-transicao/standalone-components",
            "era-transicao/inject-function",
            "era-transicao/functional-guards-resolvers",
            "era-transicao/required-inputs",
            "era-transicao/router-standalone",
            "era-transicao/httpclient-standalone",
            "era-transicao/destroy-ref",
          ],
        },
        {
          type: "category",
          label: "Era moderna (v17+)",
          collapsed: true,
          link: { type: "doc", id: "era-moderna/index" },
          items: [
            "era-moderna/signals",
            "era-moderna/signal-inputs-outputs",
            "era-moderna/control-flow",
            "era-moderna/defer",
            "era-moderna/signal-queries",
            "era-moderna/zoneless",
            "era-moderna/ssr-hydration",
            "era-moderna/resource-api",
            "era-moderna/linked-signal",
          ],
        },
        {
          type: "category",
          label: "Trilhas",
          collapsed: true,
          link: { type: "doc", id: "trilhas/index" },
          items: [
            "trilhas/iniciante",
            "trilhas/intermediario",
            "trilhas/migracao-standalone",
            "trilhas/migracao-signals",
          ],
        },
        {
          type: "category",
          label: "Fundamentos internos",
          collapsed: true,
          link: { type: "doc", id: "fundamento-internos/index" },
          items: [
            {
              type: "category",
              label: "CommonModule e templates legados",
              link: {
                type: "doc",
                id: "fundamento-internos/common-module/index",
              },
              items: [
                "fundamento-internos/common-module/async-pipe",
                "fundamento-internos/common-module/date-currency-pipes",
                "fundamento-internos/common-module/ngclass-ngstyle",
                "fundamento-internos/common-module/ngcomponentoutlet",
                "fundamento-internos/common-module/ngtemplateoutlet",
                "fundamento-internos/common-module/legacy-structural-directives",
              ],
            },
            {
              type: "category",
              label: "Reatividade",
              link: {
                type: "doc",
                id: "fundamento-internos/reatividade/index",
              },
              items: [
                "fundamento-internos/reatividade/signals-core",
                "fundamento-internos/reatividade/linked-signal",
                "fundamento-internos/reatividade/resource-api",
                "fundamento-internos/reatividade/rxjs-interoperability",
                "fundamento-internos/reatividade/state-patterns-v20",
              ],
            },
            {
              type: "category",
              label: "Runtime de Template",
              link: {
                type: "doc",
                id: "fundamento-internos/template-runtime/index",
              },
              items: [
                "fundamento-internos/template-runtime/control-flow-v20",
                "fundamento-internos/template-runtime/defer-runtime",
                "fundamento-internos/template-runtime/template-compilation-mental-model",
                "fundamento-internos/template-runtime/content-projection-modern",
                "fundamento-internos/template-runtime/dynamic-rendering-patterns",
              ],
            },
            {
              type: "category",
              label: "Injeção de Dependência",
              link: {
                type: "doc",
                id: "fundamento-internos/dependency-injection/index",
              },
              items: [
                "fundamento-internos/dependency-injection/inject-function",
                "fundamento-internos/dependency-injection/environment-injector",
                "fundamento-internos/dependency-injection/injectiontoken-patterns",
                "fundamento-internos/dependency-injection/provider-composition",
                "fundamento-internos/dependency-injection/run-in-injection-context",
              ],
            },
            {
              type: "category",
              label: "Detecção de Mudanças",
              link: {
                type: "doc",
                id: "fundamento-internos/change-detection/index",
              },
              items: [
                "fundamento-internos/change-detection/zoneless-v20",
                "fundamento-internos/change-detection/render-hooks",
                "fundamento-internos/change-detection/change-detection-costs",
                "fundamento-internos/change-detection/debugging-render-issues",
              ],
            },
            {
              type: "category",
              label: "Internos do Router",
              link: {
                type: "doc",
                id: "fundamento-internos/router-internals/index",
              },
              items: [
                "fundamento-internos/router-internals/provide-router-features",
                "fundamento-internos/router-internals/guards-resolvers-functional",
                "fundamento-internos/router-internals/component-input-binding-router",
                "fundamento-internos/router-internals/navigation-lifecycle",
                "fundamento-internos/router-internals/routing-performance",
              ],
            },
            {
              type: "category",
              label: "Internos de HTTP",
              link: {
                type: "doc",
                id: "fundamento-internos/http-internals/index",
              },
              items: [
                "fundamento-internos/http-internals/provide-http-client",
                "fundamento-internos/http-internals/functional-interceptors",
                "fundamento-internos/http-internals/http-context-token",
                "fundamento-internos/http-internals/fetch-backend-v20",
                "fundamento-internos/http-internals/error-retry-strategies",
              ],
            },
            {
              type: "category",
              label: "SSR e Hydration",
              link: {
                type: "doc",
                id: "fundamento-internos/ssr-hydration/index",
              },
              items: [
                "fundamento-internos/ssr-hydration/ssr-pipeline",
                "fundamento-internos/ssr-hydration/hydration-boundaries",
                "fundamento-internos/ssr-hydration/transfer-state-modern",
                "fundamento-internos/ssr-hydration/defer-plus-hydration",
                "fundamento-internos/ssr-hydration/seo-and-runtime-tradeoffs",
              ],
            },
            {
              type: "category",
              label: "Forms v20",
              link: { type: "doc", id: "fundamento-internos/forms-v20/index" },
              items: [
                "fundamento-internos/forms-v20/reactive-forms-modern",
                "fundamento-internos/forms-v20/custom-control-value-accessor",
                "fundamento-internos/forms-v20/form-performance",
                "fundamento-internos/forms-v20/validation-architecture",
              ],
            },
            {
              type: "category",
              label: "Testing moderno",
              link: {
                type: "doc",
                id: "fundamento-internos/testing-modern/index",
              },
              items: [
                "fundamento-internos/testing-modern/testbed-modern-usage",
                "fundamento-internos/testing-modern/component-harness-patterns",
                "fundamento-internos/testing-modern/signals-testing",
                "fundamento-internos/testing-modern/router-http-testing-modern",
              ],
            },
          ],
        },
      ],
    },
  ],
};

export default sidebars;
