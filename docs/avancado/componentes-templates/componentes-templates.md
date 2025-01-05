---
sidebar_position: 3
---

# Componentes e Templates

## Comunicação entre Componentes

### `@Input`

Permite passar dados do componente pai para o componente filho.

Usa **Property Binding** no template.

```tsx showLineNumbers title="filho.component.ts"
import { Component, Input } from "@angular/core";

@Component({
  selector: "app-filho",
  template: `<p>Mensagem do pai: {{ mensagem }}</p>`,
})
export class FilhoComponent {
  @Input() mensagem: string = "";
}
```

```html showLineNumbers title="pai.component.html"
<app-filho [mensagem]="'Olá, filho!'"></app-filho>
```

### `@Output`

Permite que o componente filho envie eventos ou dados para o componente pai.

Usa **Event Binding**.

```tsx showLineNumbers title="filho.component.ts"
import { Component, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-filho",
  template: `<button (click)="enviarMensagem()">Enviar</button>`,
})
export class FilhoComponent {
  @Output() mensagemEnviada = new EventEmitter<string>();

  enviarMensagem() {
    this.mensagemEnviada.emit("Olá, pai!");
  }
}
```

```html showLineNumbers title="pai.component.html"
<app-filho (mensagemEnviada)="receberMensagem($event)"></app-filho>
```

```tsx showLineNumbers title="pai.component.ts"
receberMensagem(mensagem: string) {
  console.log(mensagem);
}
```

## Manipulação de Elementos e Templates

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

## Ciclo de Detecção de Mudanças (Change Detection)

### Modos de Change Detection

- **Default**

  Verifica todas as mudanças em todos os componentes.

- **OnPush**

  Verifica mudanças apenas quando os inputs ou eventos do componente são alterados.

```tsx showLineNumbers title="filho.component.ts"
import { Component, ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: "app-filho",
  template: `{{ dado }}`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilhoComponent {
  @Input() dado!: string;
}
```

## Encapsulamento de Estilos (Encapsulation)

### Tipos de Encapsulamento

- **Emulated (padrão):**

  Aplica estilos somente ao componente, simulando Shadow DOM.

- **Shadow DOM (Native):**

  Usa nativamente o Shadow DOM.

- **None:**

  Aplica estilos globalmente.

```tsx showLineNumbers title="example.component.ts"
import { Component, ViewEncapsulation } from "@angular/core";

@Component({
  selector: "app-example",
  template: `<p>Estilo Aplicado</p>`,
  styles: [
    `
      p {
        color: red;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class ExampleComponent {}
```

## Resumo

| Recurso                | Uso Principal                                                                          |
| ---------------------- | -------------------------------------------------------------------------------------- |
| **`@Input`**           | Passar dados do componente pai para o filho.                                           |
| **`@Output`**          | Emitir eventos ou dados do componente filho para o pai.                                |
| **`@ViewChild`**       | Acessar elementos DOM ou componentes filhos no template do mesmo componente.           |
| **`@ViewChildren`**    | Acessar uma lista de elementos ou componentes filhos.                                  |
| **`@ContentChild`**    | Acessar um elemento ou componente projetado no slot de conteúdo.                       |
| **`@ContentChildren`** | Acessar uma lista de elementos ou componentes projetados no slot de conteúdo.          |
| Change Detection       | Gerenciar quando e como as mudanças no componente devem ser detectadas e renderizadas. |
| Encapsulation          | Controlar o escopo dos estilos CSS aplicados ao componente.                            |

## Tags `<ng-...>` no HTML

### `<ng-container>`

O `<ng-container>` é um elemento auxiliar que não gera um nó DOM no resultado final. Ele é usado para agrupar elementos ou aplicar diretivas estruturais sem adicionar novos nós ao DOM, mantendo a estrutura limpa.

```html showLineNumbers
<!-- Uso com *ngIf -->
<ng-container *ngIf="isLoggedIn">
  <p>Bem-vindo, usuário!</p>
  <p>Você tem acesso ao conteúdo restrito.</p>
</ng-container>
```

No exemplo acima, o conteúdo dentro do `<ng-container>` será exibido somente se `isLoggedIn` for verdadeiro, mas o `<ng-container>` em si não aparecerá no DOM final.

```html showLineNumbers
<ng-container *ngIf="isLoggedIn">
  <div *ngFor="let user of users">{{ user.name }}</div>
</ng-container>
```

Aqui, o `<ng-container>` agrupa o `*ngIf` e o `*ngFor`, evitando conflitos, já que não é permitido usar duas diretivas estruturais no mesmo elemento.

### `<ng-content>`

O `<ng-content>` é usado em componentes para projetar conteúdo dinâmico. Ele permite que desenvolvedores insiram elementos personalizados nos templates.

```html showLineNumbers title="pai.component.html"
<app-card>
  <h3>Título Personalizado</h3>
  <p>Este conteúdo é projetado.</p>
</app-card>
```

```html showLineNumbers title="app-card.component.html"
<div class="card">
  <ng-content></ng-content>
</div>
```

### `<ng-template>`

O `<ng-template>` é usado para definir blocos de templates que podem ser renderizados dinamicamente ou reutilizados.

```html showLineNumbers
<ng-template #templateRef>
  <p>Este é um conteúdo dinâmico!</p>
</ng-template>

<button (click)="mostrarTemplate(templateRef)">Mostrar</button>
```

## Resumo

| Elemento         | Função                                                               | Gera nó DOM? |
| ---------------- | -------------------------------------------------------------------- | ------------ |
| `<ng-container>` | Agrupar elementos ou diretivas estruturais sem adicionar nós extras. | Não          |
| `<ng-content>`   | Projeção de conteúdo para componentes personalizados.                | Sim          |
| `<ng-template>`  | Definir templates reutilizáveis ou renderizáveis dinamicamente.      | Não          |
