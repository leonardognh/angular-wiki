---
sidebar_position: 1
title: "Introdução ao Angular Wiki"
description: "Visão geral do Angular Wiki (snapshot documentação Angular 15.0.0)."
keywords: [angular, wiki, documentação, pt-BR]
---

# Introdução ao Angular Wiki

:::warning Documentação Angular 15 (snapshot)

Você está na árvore **versionada 15.0.0**, congelada no repositório. Para a **documentação viva** alinhada a **Angular 16**, use o menu de versões (**Angular 16**) no topo do site.

:::

Bem-vindo. Este site reúne **guias e referências** sobre o **Angular** (framework TypeScript do Google) em **português brasileiro**, com foco em quem precisa **aprender**, **revisar** ou **comparar** abordagens na prática do dia a dia.

---

## O que é?

O **Angular Wiki** é uma documentação comunitária construída com [Docusaurus 3.7](https://docusaurus.io/), com suporte a exemplos e organização em seções (componentes, rotas, formulários, SSR, testes, arquitetura, etc.).

O conteúdo não substitui a [documentação oficial](https://angular.dev); ela complementa com **explicações em pt-BR**, tabelas de evolução por versão e links internos entre tópicos do próprio wiki.

**Escopo de versão do framework:** Angular **16, 17, 18, 19, 20 e 21** (releases estáveis). Detalhes da política de versão e do menu do site estão em [Escopo por versão do Angular](./escopo-versoes.md).

---

## Para que serve?

- **Onboarding:** entender conceitos centrais (componentes, DI, rotas, formulários) em uma narrativa única.
- **Upgrade e manutenção:** localizar o que mudou entre majors e onde isso aparece no código (signals, control flow, SSR, etc.).
- **Arquitetura:** ver padrões como monorepo, micro front-end, CI/CD e performance ao lado dos fundamentos do framework.

Se você busca apenas a API oficial palavra por palavra, use o **angular.dev**; se busca **contexto em português** e encadeamento de tópicos, use este wiki.

---

## Quando usar?

Use este wiki quando:

- Estiver **começando** e quiser um mapa das áreas do framework antes de mergulhar nos detalhes.
- Já for **intermediário** e quiser comparar abordagens (por exemplo, reactive forms vs template-driven, ou Observables vs signals em um trecho específico).
- For **avançado** e precisar de uma página âncora (SSR, NgRx, testes) para alinhar o time antes de ir ao código-fonte ou RFCs.

---

## Como navegar

1. **Barra lateral:** gerada automaticamente a partir da pasta `docs/`; cada seção principal tem uma página de entrada com `sidebar_position: 1`.
2. **Menu “Versões Angular”:** atalhos para **resumos por major** (v16–v21) na página de escopo — não confunda com a versão do `@angular/core` do seu projeto.
3. **Links “Veja também”:** no fim de muitos artigos, apontam para páginas relacionadas dentro do wiki.

---

## O que esperar dos artigos

Os textos seguem uma convenção comum:

- Seções como **O que é?**, **Para que serve?**, **Quando usar?**, **Sintaxe / API**, **Exemplos**, **Boas práticas** e **Erros comuns** (quando fizer sentido).
- **Menção explícita da major** do Angular quando uma feature foi introduzida, depreciada ou está em preview.
- Exemplos **standalone-first** (padrão recomendado desde a era dos standalone applications); uso de `NgModule` aparece como **legado** quando necessário.

---

## Stack e ferramentas do próprio site

| Item            | Detalhe                                      |
| --------------- | -------------------------------------------- |
| Gerador         | Docusaurus 3.7 (preset classic)              |
| Idioma do site  | pt-BR (`defaultLocale`)                      |
| Live code       | `@docusaurus/theme-live-codeblock`         |
| Hospedagem      | GitHub Pages (veja o repositório do projeto) |

---

## Contribuindo (visão geral)

Melhorias são bem-vindas: correções de typos, exemplos que compilam, tabelas de evolução por versão e links para a documentação oficial. Ao escrever:

- Mantenha **pt-BR**; termos consagrados em inglês (component, pipe, signal) são aceitos.
- Indique a **versão mínima** do Angular quando o exemplo não for universal.
- Evite conteúdo que misture **AngularJS 1.x** com Angular 2+ sem deixar isso explícito.

---

## Evolução por versão (panorama)

| Major | Foco típico de leitura neste wiki                          |
| ----- | ---------------------------------------------------------- |
| v16   | Signals em preview, hydration, modernização de apps        |
| v17   | Control flow `@if` / `@for`, angular.dev                 |
| v18   | Zoneless (experimental), maturidade de SSR               |
| v19   | Signal inputs/outputs/queries estáveis, Resource (preview) |
| v20–21 | Ajustes contínuos; alinhar sempre ao changelog oficial     |

Para texto completo sobre política de documentação, abra [Escopo por versão do Angular](./escopo-versoes.md).

---

## Boas práticas para leitores

- Alinhe a **versão do Node** e do **Angular CLI** com o que o time usa; o artigo [Primeiros passos](./primeiros-passos.md) resume instalação.
- Ao copiar exemplo, verifique **imports** e a **major mínima** indicada no artigo.
- Em dúvida sobre suporte LTS, consulte a página oficial de releases (link na página de escopo).

---

## Erros comuns

- Tratar o wiki como **fonte normativa** de breaking changes — a palavra final é o changelog e o guia de update oficiais.
- Assumir que todo exemplo roda na **mesma major** que a sua sem ler o parágrafo de versão.
- Ignorar avisos de **preview** ou **experimental** em features novas.

---

## Perguntas frequentes

**Por que o escopo começa na v16?**  
A partir da v16 a linha moderna do Angular (CLI, documentação em angular.dev a partir da v17, signals, evolução de SSR) concentra as mudanças que este wiki descreve de forma unificada. Versões anteriores podem ter material esporádico, mas **não** fazem parte do compromisso de revisão deste repositório.

**O wiki duplica a documentação oficial?**  
Não. O objetivo é **curadoria em pt-BR**, encadeamento entre tópicos e exemplos alinhados ao que equipes brasileiras costumam precisar em code review e migração.

**Posso sugerir um tópico só da minha major?**  
Sim, desde que o texto deixe claro o **mínimo de versão** e não exija um snapshot inteiro do site só para isso — na maioria dos casos, uma seção “Evolução por versão” dentro do artigo existente resolve melhor.

**Onde está o código-fonte deste site?**  
No repositório público do projeto **angular-wiki** no GitHub da organização indicada no rodapé / URL do deploy; use issues e pull requests por lá.

---

## Comparação rápida: wiki vs documentação oficial

| Critério              | Angular Wiki (este site)     | angular.dev (oficial)     |
| --------------------- | ---------------------------- | ------------------------- |
| Idioma                | pt-BR                        | Principalmente inglês     |
| Norma de breaking     | Referência, não canônica     | Canônica                  |
| Organização           | Árvore fixa do repositório   | IA e busca oficiais       |
| Exemplos              | Curados pelo repositório     | Exemplos oficiais         |

---

## Glossário mínimo

- **Major:** primeira parte do semver do Angular (ex.: `21.0.0` → major 21).
- **Standalone:** componente ou rota que não declara `NgModule` como peça obrigatória do arranjo.
- **Control flow:** sintaxe `@if`, `@for`, `@switch` em templates (a partir da v17).
- **Signal:** primitivo reativo (`signal()`, `computed()`, `effect()`) — evolução forte a partir da v16.

---

## Veja também

- [Escopo por versão do Angular (v16–v21)](./escopo-versoes.md)
- [Primeiros passos](./primeiros-passos.md)
- [Estrutura do projeto](./estrutura-projeto/estrutura-projeto.md)
