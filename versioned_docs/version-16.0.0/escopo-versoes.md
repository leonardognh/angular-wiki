---
sidebar_position: 3
sidebar_label: "Escopo e versionamento"
title: "Escopo do wiki e versionamento (Angular 15 × 16)"
description: "Como o Angular Wiki usa o versionamento do Docusaurus: snapshot Angular 15, documentação viva Angular 16 e próximos passos."
keywords: [angular, versões, docusaurus, v15, v16, lts]
tags: [v15, v16]
---

# Escopo do wiki e versionamento (Angular 15 × 16)

Esta página explica **como alternar entre versões** no site, o que significa cada snapshot e como escrever artigos novos sem conflitar com o histórico.

---

## O que é?

O **Angular Wiki** usa o [versionamento de documentação do Docusaurus](https://docusaurus.io/docs/versioning):

| Rótulo no menu      | Origem no repositório              | Significado                          |
| ------------------- | ----------------------------------- | ------------------------------------ |
| **Angular 16**      | Pasta `docs/` na raiz do projeto   | Documentação **viva** (padrão atual) |
| **Angular 15**      | `versioned_docs/version-15.0.0/` | **Snapshot congelado** na data do corte (`npm run docusaurus docs:version 15.0.0`) |

Ou seja: **duas árvores** de Markdown — uma evolui com PRs; a outra só muda se alguém **editar explicitamente** o snapshot (correções pontuais, avisos legais, etc.).

---

## Para que serve?

- Permitir que times ainda em **Angular 15** leiam o material **como estava** no momento do arquivamento.
- Direcionar novos leitores para **Angular 16** como linha principal de exemplos e menções de API.
- Definir regra para **contribuidores**: PRs novos entram em `docs/` (v16), salvo exceção acordada para patch no snapshot 15.

---

## Quando usar?

- **Leitor em projeto legado 15:** escolha **Angular 15** no seletor do topo; espere banner de documentação não mantida ativamente.
- **Leitor em projeto 16+:** mantenha **Angular 16** (default).
- **Autor de PR:** edite sempre `docs/`; abra issue se precisar alterar o snapshot 15.

---

## URLs e seletor de versão

Com `lastVersion: "current"` no preset, a documentação **Angular 16** costuma ser servida nos caminhos **sem** prefixo numérico extra (por exemplo `/docs/intro/` no deploy). A árvore **Angular 15** fica sob o prefixo configurado (`/docs/15/...`).

O item **Escopo de versões** na barra aponta sempre para a página atual deste arquivo na **versão que você está vendo** — leia o texto com atenção ao banner da página.

---

## O que mudou do 15 para o 16 (resumo técnico)

> **Objetivo:** orientar upgrade; detalhes normativos estão no [changelog](https://github.com/angular/angular/blob/main/CHANGELOG.md) e no [guia de atualização](https://angular.dev/update-guide).

| Área              | Angular 15 (referência)     | Angular 16 (destaque)                                      |
| ----------------- | --------------------------- | ---------------------------------------------------------- |
| Signals           | Não era o centro da narrativa | **Signals** em *developer preview* (`signal`, `computed`) |
| SSR               | Evolução contínua           | **Hydration** e melhorias de servidor                      |
| Required inputs   | —                           | `@Input({ required: true })`                               |
| Esbuild / Vite    | Caminhos em transição       | Alinhamento contínuo do pipeline de build da CLI         |

Para um guia dedicado em pt-BR neste wiki, veja [Guia Angular 16](./guia-angular-16.md).

---

## Sintaxe / API (política de escrita)

| Situação                              | O que fazer                                                |
| ------------------------------------- | ---------------------------------------------------------- |
| Feature estável só a partir da v17+   | Callout + link para doc oficial; exemplo opcional em v16  |
| Feature preview na v16               | Marcar **developer preview** e citar versão de estabilização quando existir |
| Texto duplicado entre 15 e 16        | Evitar: ajuste só em `docs/`; snapshot 15 só por correção |

---

## Exemplos práticos (callouts)

```md
> **Angular 16 — developer preview**

> `signal()` e `computed()`; API pode evoluir até estabilização.
```

```md
> **Disponível a partir do Angular 17**

> Control flow embutido (`@if`, `@for`) no template.
```

---

## Evolução por versão (wiki, não só framework)

| Marco do repositório | Descrição                                              |
| -------------------- | ------------------------------------------------------ |
| Corte `15.0.0`       | Snapshot Docusaurus do estado anterior à linha v16   |
| `docs/` como v16     | Padrão atual de escrita, revisão e exemplos            |
| Futuro `17.0.0`      | Opcional — rodar `docs:version 16.0.0` quando decidir |

---

## Comparação com alternativas

| Abordagem                         | Prós                        | Contras                                |
| --------------------------------- | --------------------------- | -------------------------------------- |
| Snapshot 15 + `docs/` v16 (atual)| Histórico + linha viva      | Dois lugares para patches raros em 15 |
| Só uma árvore sem versionamento   | Menos arquivos              | Perde leitura “como era em 15”        |
| Snapshot por cada patch do Angular | Granularidade extrema      | Insustentável para wiki comunitário  |

---

## Boas práticas

- Prefira links **relativos entre `.md`** dentro da mesma versão; o Docusaurus reescreve para a URL correta.
- Para apontar da v15 congelada para a **v16 atual**, use caminho absoluto do site: `/docs/intro` (o deploy aplica `baseUrl`).
- Mantenha o snapshot 15 **pequeno em mudanças**: só correções factuais ou avisos.

---

## Erros comuns

- Achar que o seletor **Angular 16** instala pacotes npm — ele só troca a **árvore de documentação**.
- Copiar texto da v16 para a v15 sem querer — são pastas diferentes; confira o banner no topo da página.
- Rodar `docs:version` sem alinhar o time — cada corte duplica arquivos e aumenta manutenção.

---

## Veja também

- [Guia Angular 16](./guia-angular-16.md)
- [Introdução](./intro.md)
- [Primeiros passos](./primeiros-passos.md)

---

## Referências

- [Angular — Update guide](https://angular.dev/update-guide)
- [Angular — Releases](https://angular.dev/reference/releases)
- [Docusaurus — Versioning](https://docusaurus.io/docs/versioning)

---

## Comandos úteis (mantenedores)

```bash showLineNumbers title="cortar-nova-versao-docs.sh"
npm run docusaurus docs:version 16.0.0
```

Use apenas quando a equipe decidir **congelar** a linha v16 inteira antes de abrir a v17 em `docs/`. Cada corte duplica arquivos — planeje antes.
