---
sidebar_position: 4
sidebar_label: "Guia Angular 16"
title: "Guia da documentação Angular 16"
description: "O que trata de específico na linha Angular 16: signals em preview, hydration, required inputs e como ler o restante do wiki nesta major."
keywords: [angular, v16, signals, hydration, required input]
tags: [v16]
---

# Guia da documentação Angular 16

Esta página é o **âncora** da árvore **Angular 16** do wiki: resume o que a major trouz de relevante, como isso aparece nos outros artigos e onde ir na documentação oficial.

---

## O que é?

O **Angular 16** (maio de 2023) consolidou a linha moderna do framework antes do grande salto de sintaxe de template da **v17** (control flow `@if` / `@for`). Na prática, a v16 é o ponto em que:

- **Signals** entram como **developer preview** na plataforma.
- **SSR** recebe **hydration** e melhorias de desempenho no servidor.
- A CLI e o pipeline de build continuam a transição para ferramentas mais rápidas (esbuild / Vite no ecossistema).

O restante do wiki em `docs/` assume **esta major como piso** para exemplos, salvo menção explícita a v17+.

---

## Para que serve?

- **Onboarding:** saber o que é “normal” em v16 antes de pular para v17.
- **Migração:** alinhar expectativas ao subir de **Angular 15** (snapshot no seletor de versão) para a **linha v16** documentada aqui.
- **Leitura cruzada:** decidir quando abrir artigos como [Signals](./avancado/signals/signals.md) ou [SSR](./avancado/ssr/ssr.md).

---

## Quando usar?

Use este guia quando:

- O `package.json` do seu app estiver em **^16.x** e você quiser saber **o que priorizar** na leitura do wiki.
- Estiver **comparando** trechos do snapshot **Angular 15** com a linha atual.
- For **escrever** um novo artigo e precisar de uma frase de contexto “estamos na v16”.

---

## Sintaxe / API — destaques da v16

### Signals (developer preview)

APIs centrais: `signal()`, `computed()`, `effect()` (com restrições documentadas na época). Nos artigos deste wiki, exemplos com signals trazem callout de **preview** quando ainda não havia estabilização plena.

### Required inputs

Inputs obrigatórios via metadado do decorator, reduzindo `undefined` implícito em componentes mal configurados.

### Hydration (SSR)

Melhora da experiência ao hidratar o DOM gerado no servidor, com APIs e guias evoluindo nas majors seguintes — leia [SSR](./avancado/ssr/ssr.md) com atenção às notas de versão.

### Ferramentas

A CLI 16 acompanhou flags e defaults da época; sempre cruze com a matriz **Angular ↔ Node** em [angular.dev/reference/versions](https://angular.dev/reference/versions).

---

## Exemplos práticos

### Exemplo — `signal` mínimo (v16)

```tsx showLineNumbers title="contador.feature.ts"
import { signal, computed } from "@angular/core";

export const count = signal(0);
export const double = computed(() => count() * 2);
```

> **Angular 16 — developer preview** — confira a major em que `signal`/`computed` passaram a fazer parte do seu contrato de API em produção no seu time.

### Exemplo — input obrigatório

```tsx showLineNumbers title="user-badge.component.ts"
import { Component, Input } from "@angular/core";

@Component({
  selector: "app-user-badge",
  standalone: true,
  template: `<span>{{ label }}</span>`,
})
export class UserBadgeComponent {
  @Input({ required: true }) label!: string;
}
```

---

## Evolução por versão

| Versão | Relação com este guia |
| ------ | ---------------------- |
| v15    | Snapshot no menu **Angular 15**; base de comparação para upgrade |
| v16    | **Este guia** — piso da árvore `docs/`                        |
| v17+   | Control flow embutido, `angular.dev` como hub; ver artigos com callout de v17 |

---

## Comparação com a leitura “só changelog”

| Critério    | Este guia + wiki               | Changelog oficial            |
| ---------- | ------------------------------ | ---------------------------- |
| Idioma     | pt-BR                          | en, lista técnica densa      |
| Narrativa  | Por que importa na v16        | Cada PR / breaking isolado   |
| Norma      | Referência didática           | Fonte normativa de mudança   |

---

## Boas práticas

- Ao fixar **v16** no trabalho, trave **patch** (`16.x.y`) com política interna de segurança.
- Antes de adotar `effect()` em massa, leia as **restrições** da época e o que mudou nas v17–19.
- Para migrar de 15 → 16, use o [Update guide](https://angular.dev/update-guide) e depois volte aos artigos temáticos do wiki.

---

## Erros comuns

- Tratar **preview** de signals como API irrevogável — acompanhe o changelog nas upgrades.
- Esperar **`@if` / `@for`** embutidos — isso é **v17+**; em v16 continue com `*ngIf` / `*ngFor` ou prepare migração.
- Comparar CLI **de hoje** com tutorial escrito para CLI 16 sem adaptar flags.

---

## Veja também

- [Escopo e versionamento](./escopo-versoes.md)
- [Primeiros passos](./primeiros-passos.md)
- [Signals](./avancado/signals/signals.md)
- [SSR](./avancado/ssr/ssr.md)

---

## Referências

- [Angular v16 announcement (blog)](https://blog.angular.dev)
- [Changelog Angular](https://github.com/angular/angular/blob/main/CHANGELOG.md)

---

## Mapa rápido do restante do wiki

| Se você quer…              | Comece por…                                      |
| -------------------------- | ------------------------------------------------ |
| Entender pastas do projeto | [Estrutura do projeto](./estrutura-projeto/estrutura-projeto.md) |
| Rotas e lazy loading       | [Rotas](./rotas/rotas.md)                        |
| Formulários                | [Formulários](./formularios/formularios.md)      |
| Testes                     | [Teste unitário](./avancado/teste-unitario/teste-unitario.md) |
