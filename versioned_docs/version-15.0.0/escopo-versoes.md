---
sidebar_position: 3
sidebar_label: "Escopo (snapshot 15)"
title: "Snapshot Angular 15 — leia isto primeiro"
description: "Aviso sobre a documentação congelada Angular 15.0.0 no Angular Wiki."
keywords: [angular, v15, snapshot, docusaurus]
tags: [v15]
---

# Snapshot Angular 15 — leia isto primeiro

Esta página faz parte da árvore **Angular 15.0.0** gerada pelo Docusaurus. Ela **não** recebe o mesmo fluxo de PRs que a linha **Angular 16** em `docs/`.

---

## O que é?

Um **arquivo histórico** do conteúdo do wiki no momento do comando:

```bash
npm run docusaurus docs:version 15.0.0
```

Serve para consultas legadas e comparação textual; **não** é o lugar para ancorar exemplos novos de produto.

---

## Para que serve?

- Manter **URL estável** para o material antigo (`/docs/15/...` no deploy com `baseUrl` atual).
- Deixar claro que o **padrão do site** mudou para a documentação **Angular 16**.

---

## Onde está a documentação atual?

Abra a versão **Angular 16** no seletor do topo e, em seguida:

- [Introdução na linha atual](/docs/intro)
- [Escopo e versionamento na linha atual](/docs/escopo-versoes)
- [Guia Angular 16 na linha atual](/docs/guia-angular-16)

(Se o deploy usar `baseUrl` `/angular-wiki/`, o caminho absoluto ainda começa com `/angular-wiki/docs/...` automaticamente no build estático — use o menu do site se o link acima não resolver no seu ambiente.)

---

## Boas práticas

- Não copie trechos deste snapshot para novos PRs sem revisar na **v16**.
- Para migração 15 → 16, prefira o [Angular Update Guide](https://angular.dev/update-guide) e a árvore **Angular 16** deste wiki.

---

## Veja também

- [Introdução](./intro.md)
- [Primeiros passos](./primeiros-passos.md)
