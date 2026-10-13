---
sidebar_position: 3
---

# Manipulação de Elementos

## O que é?

Os decoradores @ViewChild, @ViewChildren, @ContentChild, e @ContentChildren são usados para acessar e manipular elementos do DOM ou instâncias de componentes/diretivas em um componente. Esses decoradores permitem trabalhar com elementos declarados diretamente no template ou projetados de outro componente.

## Quando usar?

- @ViewChild e @ViewChildren

  - Para acessar elementos e componentes dentro do próprio template do componente.

- @ContentChild e @ContentChildren

  - Para acessar elementos e componentes projetados no template do componente filho (usando ng-content).

### `@ViewChild`

Acessa elementos DOM ou filhos do mesmo componente.

Útil para manipular elementos ou instâncias de componentes.

```tsx showLineNumbers title="example.component.ts"
import { Component, ViewChild, ElementRef } from "@angular/core";

@Component({
  selector: "app-example",
  template: `<input #campoTexto type="text" /><button (click)="focar()">
      Focar
    </button>`,
})
export class ExampleComponent {
  @ViewChild("campoTexto") campoTexto!: ElementRef;

  focar() {
    this.campoTexto.nativeElement.focus();
  }
}
```

### `@ViewChildren`

Obtém um **QueryList** de vários elementos ou componentes filhos.

```tsx showLineNumbers title="example.component.ts"
import { Component, QueryList, ViewChildren, ElementRef } from "@angular/core";

@Component({
  selector: "app-example",
  template: `
    <input #campo type="text" *ngFor="let item of [1, 2, 3]" />
    <button (click)="focarTodos()">Focar Todos</button>
  `,
})
export class ExampleComponent {
  @ViewChildren("campo") campos!: QueryList<ElementRef>;

  focarTodos() {
    this.campos.forEach((campo) => campo.nativeElement.focus());
  }
}
```

### `@ContentChild`

Acessa um único elemento ou componente filho **projetado no slot de conteúdo**.

```tsx showLineNumbers title="filho.component.ts"
import { Component, ContentChild, ElementRef } from "@angular/core";

@Component({
  selector: "app-filho",
  template: `<ng-content></ng-content>`,
})
export class FilhoComponent {
  @ContentChild("projetado") conteudo!: ElementRef;

  ngAfterContentInit() {
    console.log(this.conteudo.nativeElement.textContent);
  }
}
```

```html showLineNumbers title="pai.component.html"
<app-filho>
  <p #projetado>Conteúdo Projetado</p>
</app-filho>
```

### `@ContentChildren`

Obtém um **QueryList** de vários elementos projetados no conteúdo.

```tsx showLineNumbers title="filho.component.ts"
import {
  Component,
  ContentChildren,
  QueryList,
  ElementRef,
} from "@angular/core";

@Component({
  selector: "app-filho",
  template: `<ng-content></ng-content>`,
})
export class FilhoComponent {
  @ContentChildren("projetado") conteudos!: QueryList<ElementRef>;

  ngAfterContentInit() {
    this.conteudos.forEach((conteudo) =>
      console.log(conteudo.nativeElement.textContent)
    );
  }
}
```

```html showLineNumbers title="pai.component.html"
<app-filho>
  <p #projetado>Item 1</p>
  <p #projetado>Item 2</p>
</app-filho>
```

## Resumo

| Recurso                | Uso Principal                                                                 |
| ---------------------- | ----------------------------------------------------------------------------- |
| **`@ViewChild`**       | Acessar elementos DOM ou componentes filhos no template do mesmo componente.  |
| **`@ViewChildren`**    | Acessar uma lista de elementos ou componentes filhos.                         |
| **`@ContentChild`**    | Acessar um elemento ou componente projetado no slot de conteúdo.              |
| **`@ContentChildren`** | Acessar uma lista de elementos ou componentes projetados no slot de conteúdo. |

## Boas Práticas

- Evite manipular diretamente o DOM

  Sempre que possível, prefira vinculação de dados ou diretivas.
  Use ElementRef apenas quando necessário, e evite acesso direto ao DOM para garantir compatibilidade com renderizadores não-DOM, como o Angular Universal.

- Gerencie Ciclos de Vida Corretamente

  Use os métodos ngAfterViewInit e ngAfterContentInit para garantir que os elementos ou conteúdos já foram carregados.

- Simplifique a Comunicação

  Utilize decoradores apenas quando realmente necessário. Para comunicação entre componentes, prefira inputs/outputs ou serviços.
