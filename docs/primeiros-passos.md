---
sidebar_position: 2
title: "Primeiros passos com Angular"
description: "Instalação do Node.js, Angular CLI e primeiro projeto alinhados à documentação Angular 17 deste wiki."
keywords: [angular, cli, instalação, node, ng new, v17]
tags: [v17]
---

# Primeiros passos

Este guia cobre **instalação do ambiente**, criação do **primeiro projeto** com Angular CLI e o **alinhamento à major 16**, que é a **documentação viva** deste wiki (menu **Angular 16**). Para o contexto da major e signals em preview, veja o [Guia Angular 16](./guia-angular-16.md); para versionamento 15 × 16, veja [Escopo e versionamento](./escopo-versoes.md).

Se você mantém **Angular 15**, use o seletor de versão **Angular 15** no topo — o material está **congelado** no snapshot `15.0.0`.

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

| Angular (app) | Onde ler neste wiki                                                                 |
| ------------- | ----------------------------------------------------------------------------------- |
| **16.x**      | Esta árvore (**Angular 16** no menu) — padrão deste artigo                          |
| **15.x**      | Snapshot **Angular 15** no menu; não recebe o mesmo ritmo de atualização que a v16 |

Este artigo assume **Angular 16**: você instalará a **CLI compatível com v16** (via `npm install -g @angular/cli@^16` se precisar fixar a major) e o `ng new` gravará `@angular/*` em `^16.x` no `package.json`.

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

## Alinhando com a major 16 (e voltando ao material da 15)

Para **fixar v16** ao criar projeto, alinhe a CLI antes do `ng new`:

```bash showLineNumbers title="cli-v16-global.sh"
npm install -g @angular/cli@^16
ng new meu-app-v16 --routing --style=scss
```

Para **subir** de 15 → 16 em código existente, use o [**Angular Update Guide**](https://angular.dev/update-guide) e depois compare com o snapshot **Angular 15** no menu se precisar do texto antigo do wiki lado a lado.

Para **consultar só documentação histórica 15**, selecione **Angular 15** no seletor — URLs ficam sob o prefixo `/docs/15/` no deploy.

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
| v16    | Piso deste wiki: signals em **developer preview**, hydration, CLI da época |
| v17+   | Siga changelog ao sair da v16; control flow embutido é **v17**             |

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

- [Guia Angular 16](./guia-angular-16.md)
- [Escopo e versionamento](./escopo-versoes.md)
- [Introdução](./intro.md)
- [Estrutura do projeto](./estrutura-projeto/estrutura-projeto.md)
