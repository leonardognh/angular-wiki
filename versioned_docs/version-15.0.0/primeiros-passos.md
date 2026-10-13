---
sidebar_position: 2
title: "Primeiros passos com Angular"
description: "Instalação do Node.js, Angular CLI, criação do primeiro projeto e alinhamento de versões (Angular v16–v21)."
keywords: [angular, cli, instalação, node, ng new]
tags: [v16, v17, v18, v19, v20, v21]
---

# Primeiros passos

Este guia cobre **instalação do ambiente**, criação do **primeiro projeto** com Angular CLI e o **alinhamento de versões** com o escopo deste wiki (**Angular v16 a v21**). Para a política completa de como o site trata majors, veja [Escopo por versão do Angular](./escopo-versoes.md).

---

## O que é?

**Angular** é um framework front-end em **TypeScript** mantido pelo Google para SPAs e aplicações corporativas. O **Angular CLI** (`ng`) é a ferramenta oficial para criar projetos, gerar código, servir em desenvolvimento e build de produção.

---

## Para que serve?

- Padronizar o **setup** em máquinas novas (Windows, macOS, Linux).
- Garantir que você use uma **versão do Node** compatível com a major do Angular escolhida.
- Ter um **projeto mínimo** rodando em `localhost` antes de mergulhar em componentes e rotas.

---

## Quando usar?

Sempre que for:

- Entrar em um **time novo** e precisar reproduzir o ambiente.
- Atualizar o **Node LTS** e revalidar a CLI global.
- Criar um **repositório de estudo** alinhado às versões que este wiki documenta.

---

## Requisitos de versão (Node e Angular)

A compatibilidade **Node ↔ Angular** muda a cada major. Consulte sempre a matriz oficial em [angular.dev](https://angular.dev/reference/versions) antes de fixar versão em CI.

Regra prática ao seguir este wiki:

| Angular (app) | Ação recomendada                                      |
| ------------- | ------------------------------------------------------- |
| v16–v21       | Dentro do escopo documentado aqui                    |
| ≤ v15         | Fora do escopo deste wiki; use docs/changelog antigos |

Este artigo assume que você instalará a **última estável** da CLI compatível com o Node que você escolheu; em seguida o `ng new` fixará as versões dos pacotes `@angular/*` no `package.json` do projeto.

---

## Instalando o Node.js

1. Baixe o instalador em [nodejs.org](https://nodejs.org/) (prefira **LTS** para desenvolvimento geral).
2. Confirme no terminal:

```bash showLineNumbers title="verificar-node.sh"
node -v
npm -v
```

No Windows PowerShell ou CMD os mesmos comandos funcionam após a instalação padrão.

---

## Instalando o Angular CLI

Instalação **global** (um binário `ng` no seu usuário):

```bash showLineNumbers title="instalar-cli-global.sh"
npm install -g @angular/cli
ng version
```

:::info Informação
Se a política da empresa proíbe `-g`, use `npx @angular/cli new ...` ou adicione a CLI como **devDependency** em um meta-repositório — o fluxo `ng new` continua o mesmo após o primeiro uso de `npx`.
:::

---

## Criando o primeiro projeto

```bash showLineNumbers title="criar-projeto.sh"
ng new meu-projeto --routing --style=scss
cd meu-projeto
ng serve
```

Abra o navegador em `http://localhost:4200/`. O servidor de desenvolvimento recompila ao salvar arquivos.

Flags comuns:

- `--routing`: gera módulo de rotas (útil mesmo em apps que migrarão para rotas standalone).
- `--style=scss`: folhas em SCSS; troque para `css` se preferir.

---

## Alinhando com uma major específica (v16–v21)

Para **criar** um app já alinhado a uma major, use a **mesma versão global da CLI** que deseja (instale `@angular/cli@^18`, por exemplo, antes de `ng new`) ou aceite o default da CLI recém-instalada e depois siga o [**Angular Update Guide**](https://angular.dev/update-guide) ao **subir ou descer** major em projeto existente.

Em projetos já versionados, prefira `ng update @angular/core @angular/cli` (com as majors desejadas) em vez de editar `package.json` à mão sem o guia.

---

## Estrutura gerada (visão rápida)

Após `ng new`, você verá pastas como:

- `src/app/` — raiz da aplicação (componente raiz, rotas, estilos globais em `src/styles.scss`).
- `angular.json` — configuração de build, serve e assets.
- `tsconfig*.json` — opções de compilação TypeScript.

Detalhes em [Estrutura do projeto](./estrutura-projeto/estrutura-projeto.md).

---

## Evolução por versão (CLI e defaults)

| Versão | Notas relevantes para “primeiros passos”                    |
| ------ | ------------------------------------------------------------- |
| v16    | Ecossistema estável com signals em preview; hydration em SSR |
| v17    | `ng new` alinhado à era do **application builder** / esbuild |
| v18+   | Verificar requisitos de Node no site oficial por release     |
| v21    | Sempre conferir changelog ao criar tutorial novo             |

---

## Boas práticas

- Fixe a versão do Node no time com **`.nvmrc`**, **Volta** ou documentação interna.
- Commit o `package-lock.json` (ou `pnpm-lock.yaml`) para builds reproduzíveis.
- Evite misturar **globais** desatualizadas: se `ng version` na pasta do projeto divergir muito da CLI global, prefira `npx ng ...`.

---

## Erros comuns

- **Erro de peer dependency** ao instalar pacotes: Node ou npm incompatíveis com a major do Angular — suba/desça Node conforme a tabela oficial.
- **`ng` não é reconhecido** no Windows: reabra o terminal após instalar Node; confira se o PATH contém a pasta npm global.
- **Porta 4200 ocupada:** `ng serve --port 4300` (ou encerre o processo antigo).

---

## Veja também

- [Escopo por versão do Angular](./escopo-versoes.md)
- [Introdução](./intro.md)
- [Estrutura do projeto](./estrutura-projeto/estrutura-projeto.md)
