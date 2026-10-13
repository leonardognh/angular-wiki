---
sidebar_position: 1
sidebar_label: "Templates"
title: "Templates no Angular"
description: "O que são templates Angular, binding, diretivas embutidas e relação com o control flow moderno (v17+)."
keywords: [angular, template, html, binding, control flow]
tags: [v16, v17, v18, v19, v20, v21]
---

# Templates

No Angular, o **template** é o trecho de **HTML estendido** que declara a **view** de um componente: estrutura visual, bindings, pipes, diretivas e, a partir do Angular 17, o **control flow** embutido (`@if`, `@for`, `@switch`, `@defer`).

---

## O que é?

Um template não é apenas HTML estático. Ele é interpretado pelo compilador do Angular em conjunto com a **classe TypeScript** do componente, produzindo instruções de renderização e detecção de mudanças.

Cada componente referencia um template via:

- `templateUrl: './meu.component.html'`, ou
- `template: \`...\`` (inline).

---

## Para que serve?

- **Declarar a UI** de forma declarativa, próxima ao DOM que o usuário vê.
- **Ligar dados** da classe ao DOM (interpolation, property binding, event binding, two-way).
- **Compor** a interface com diretivas estruturais ou control flow, pipes e componentes filhos.

---

## Quando usar?

Use templates sempre que a interface puder ser expressa como **marcação + bindings**. Evite manipular o DOM manualmente quando o template consegue expressar a mesma regra — isso facilita testes, acessibilidade e SSR.

---

## Sintaxe / API (panorama)

| Recurso            | Onde aprofundar neste wiki                                      |
| ------------------ | --------------------------------------------------------------- |
| Interpolation      | [Data binding](./data-binding/data-binding.md)                 |
| Pipes              | [Pipes](./pipes/pipes.md)                                      |
| DOM / referências  | [Manipulação de elementos](./manipulacao-elementos/manipulacao-elementos.md) |
| Conteúdo dinâmico  | [Estruturação dinâmica](./estruturacao-dinamica/estruturacao-dinamica.md)   |

---

## Control flow clássico vs embutido

Até o Angular 16, o padrão comum combinava HTML com diretivas estruturais (`*ngIf`, `*ngFor`). A partir do **Angular 17**, o framework passou a recomendar o **built-in control flow** com blocos `@if`, `@for`, `@switch` e carregamento adiado com `@defer`.

> **Disponível a partir do Angular 17** — sintaxe `@if` / `@for` nos templates.

Em bases legadas, você ainda verá `*ngIf`; em bases novas, prefira o control flow embutido e documente a **major mínima** quando publicar bibliotecas reutilizáveis.

---

## Exemplos práticos

### Exemplo básico — interpolation e property binding

```html showLineNumbers title="hello.component.html"
<section>
  <h1>Olá, {{ userName }}</h1>
  <img [src]="avatarUrl" [alt]="'Avatar de ' + userName" />
</section>
```

- `{{ userName }}` — **interpolation** (texto).
- `[src]` e `[alt]` — **property bindings** para atributos do DOM.

### Exemplo com control flow (Angular 17+)

```html showLineNumbers title="lista.component.html"
@if (items.length === 0) {
  <p>Nenhum item.</p>
} @else {
  <ul>
    @for (item of items; track item.id) {
      <li>{{ item.label }}</li>
    }
  </ul>
}
```

Use sempre `track` em `@for` para performance e identidade estável dos nós.

---

## Evolução por versão

| Versão | Mudança relevante para templates                          |
| ------ | --------------------------------------------------------- |
| v16    | Base estável antes do control flow embutido              |
| v17    | Introdução do control flow `@if`, `@for`, `@switch`, `@defer` |
| v18+   | Aperfeiçoamentos e integração com demais features do core |

---

## Comparação com alternativas

| Abordagem              | Quando faz sentido                                       |
| ---------------------- | -------------------------------------------------------- |
| Template declarativo   | Quase sempre — padrão Angular                            |
| Renderer2 / DOM manual | Integrações pontuais com libs JS, medição, foco, canvas |
| Web Components puros   | Fora do escopo do template Angular; use encapsulamento   |

---

## Boas práticas

- Mantenha templates **legíveis**: extraia blocos grandes para **subcomponentes**.
- Evite lógica pesada **dentro** de expressões `{{ }}`; prefira métodos baratos ou `computed()` quando usar signals.
- Em listas grandes, combine `track` com estratégias de virtualização quando necessário (CDK Virtual Scroll, etc.).

---

## Erros comuns

- Esquecer o **`track`** em `@for` — risco de re-render desnecessário e bugs de estado.
- Misturar **sintaxe antiga e nova** sem critério no mesmo arquivo — dificulta code review.
- Usar `*ngFor` sem `trackBy` em Angular clássico — mesmo problema de identidade, em outra sintaxe.
- Colocar **efeitos colaterais** (chamadas HTTP, mutação global) dentro de expressões de template — difícil de testar e imprevisível na detecção de mudanças.

---

## SSR e templates

Em aplicações com **SSR** (Server-Side Rendering), o mesmo template pode ser avaliado no servidor e no browser. Evite APIs exclusivas do `window`/`document` diretamente no template; quando precisar, isole em serviços com checagem de plataforma (`afterNextRender`, `DOCUMENT`, etc.). Detalhes em [SSR](../avancado/ssr/ssr.md).

---

## Acessibilidade (lembrete)

Use headings na ordem correta, textos alternativos em imagens e estados de carregamento/erro compreensíveis por leitores de tela. O template é o lugar onde **rótulos** (`aria-*`, `label`, `button`) costumam nascer — alinhe com [a11y](../avancado/acessibilidade/a12y/a12y.md) quando publicar formulários ou diálogos.

Pequenos detalhes de template (como `type="button"` em botões dentro de `form`) evitam bugs silenciosos de usabilidade.

---

## Veja também

- [Data binding](./data-binding/data-binding.md)
- [Diretivas](../diretivas/diretivas.md)
- [Componentes](../componentes/componentes.md)
- [Escopo por versão do Angular](../escopo-versoes.md)
