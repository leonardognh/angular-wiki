---
sidebar_position: 7
---

# Diretivas

## O que é?

Diretivas são elementos fundamentais no Angular que permitem modificar o comportamento ou a aparência de elementos no DOM.

- **Diretivas de Atributo**: Modificam a aparência ou comportamento de elementos DOM (como alterar estilos ou classes).
- **Diretivas Estruturais**: Alteram a estrutura do DOM (como *ngIf ou *ngFor).
- **Diretivas de Componente**: Utilizam a lógica de componentes como diretivas.

## Diretivas de Atributo

As diretivas de atributo são usadas para modificar a aparência ou o comportamento de elementos DOM sem alterar sua estrutura.

- **`ngClass`**

  Define classes CSS dinamicamente.

  ```html
  <div [ngClass]="{ 'ativo': isAtivo, 'inativo': !isAtivo }"></div>
  ```

- **`ngStyle`**

  Define estilos CSS dinamicamente.

  ```html
  <div [ngStyle]="{ color: isAtivo ? 'green' : 'red' }"></div>
  ```

### Diretiva Personalizada

```tsx
// text-color.directive.ts
import { Directive, ElementRef, Input, Renderer2, OnInit } from "@angular/core";

@Directive({
  selector: "[appTextColor]",
})
export class TextColorDirective implements OnInit {
  @Input("appTextColor") color: string = "black"; // Valor da cor

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.renderer.setStyle(this.el.nativeElement, "color", this.color);
  }
}
```

```html
<p appTextColor="blue">Este texto ficará azul.</p>
<p appTextColor="red">Este texto ficará vermelho.</p>
```

## Diretivas Estruturais

As diretivas estruturais alteram a estrutura do DOM, adicionando, removendo ou reordenando elementos no DOM.

- **`ngIf`:**

  Condicionalmente renderiza um elemento.

  ```html
  <p *ngIf="isAtivo">Este texto é exibido se isAtivo for verdadeiro.</p>
  ```

- **`ngFor`:**

  Itera sobre uma lista e renderiza elementos.

  ```html
  <ul>
    <li *ngFor="let item of itens">{{ item }}</li>
  </ul>
  ```

### Diretiva Personalizada

```tsx
// show-if.directive.ts
import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";

@Directive({
  selector: "[appShowIf]",
})
export class ShowIfDirective {
  @Input("appShowIf") set show(condition: boolean) {
    if (condition) {
      this.vcRef.createEmbeddedView(this.templateRef);
    } else {
      this.vcRef.clear();
    }
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private vcRef: ViewContainerRef
  ) {}
}
```

```html
<div *appShowIf="true">Este conteúdo será exibido.</div>
<div *appShowIf="false">Este conteúdo será ocultado.</div>
```

## Diretivas de Componente

As diretivas de componente são componentes Angular que possuem um selector e podem ser usados como elementos ou atributos no DOM. Elas contêm tanto lógica quanto uma interface de usuário associada.

```tsx
// alert-box.component.ts
import { Component, Input } from "@angular/core";

@Component({
  selector: "app-alert-box",
  template: `
    <div class="alert" [ngClass]="type">
      <strong>{{ title }}</strong
      >: <ng-content></ng-content>
    </div>
  `,
  styles: [
    `
      .alert {
        padding: 10px;
        border-radius: 5px;
        margin: 10px 0;
      }
      .success {
        background-color: #d4edda;
        color: #155724;
      }
      .error {
        background-color: #f8d7da;
        color: #721c24;
      }
    `,
  ],
})
export class AlertBoxComponent {
  @Input() title: string = "Alerta";
  @Input() type: "success" | "error" = "success";
}
```

```hmtl
<app-alert-box title="Sucesso" type="success">
  A operação foi concluída com êxito!
</app-alert-box>

<app-alert-box title="Erro" type="error">
  Algo deu errado. Por favor, tente novamente.
</app-alert-box>
```

## Diretivas Nativas

O Angular fornece várias diretivas prontas para uso

- **Diretivas Estruturais**

  `ngIf`, `ngFor`, `ngSwitch`.

  ```html
  <div [ngSwitch]="status">
    <p *ngSwitchCase="'ativo'">Ativo</p>
    <p *ngSwitchCase="'inativo'">Inativo</p>
    <p *ngSwitchDefault>Desconhecido</p>
  </div>
  ```

- **Diretivas de Atributo**

  `[ngClass]`, `[ngStyle]`, `[hidden]`.

### Diferença entre as Diretivas

| **Tipo de Diretiva**        | **Função**                                                                | **Exemplo no Angular**   |
| --------------------------- | ------------------------------------------------------------------------- | ------------------------ |
| **Diretivas de Atributo**   | Alteram aparência ou comportamento sem mudar a estrutura do DOM.          | `[ngClass]`, `[ngStyle]` |
| **Diretivas Estruturais**   | Alteram a estrutura do DOM, adicionando ou removendo elementos.           | `*ngIf`, `*ngFor`        |
| **Diretivas de Componente** | Combinam lógica e interface de usuário e podem ser usadas como elementos. | Componentes customizados |

## Boas práticas ao usar Diretivas

Ao trabalhar com diretivas no Angular, algumas boas práticas podem melhorar a legibilidade, desempenho e manutenção do código.

### Não Use Duas Diretivas Estruturais no Mesmo Elemento

No Angular, **não é permitido usar duas diretivas estruturais no mesmo elemento**, como `*ngIf` e `*ngFor`, porque ambas tentam controlar o mesmo template, o que causa um erro de compilação.

- Exemplo Inválido

  ```html
  <div *ngIf="isLoggedIn" *ngFor="let user of users">{{ user.name }}</div>
  ```

  Erro

  > Cannot have multiple structural directives on the same element.
  >
  > ("Não é permitido usar mais de uma diretiva estrutural no mesmo elemento.")

- Como Resolver?

  Use um elemento auxiliar, como `<ng-container>`, para separar as diretivas.

  ```html
  <ng-container *ngIf="isLoggedIn">
    <div *ngFor="let user of users">{{ user.name }}</div>
  </ng-container>
  ```

  Por que usar `<ng-container>`?

  Ele não gera um nó extra no DOM, mantendo a estrutura limpa.

  Observação: falaremos mais sobre `ng-container` no tópico avançado.

### Prefira Diretivas Nativas Sempre que Possível

O Angular oferece várias diretivas prontas como `*ngIf`, `*ngFor`, `[ngClass]`, e `[ngStyle]`. Sempre que possível, utilize essas diretivas nativas para evitar recriar funcionalidades básicas.

- Em vez de criar uma diretiva personalizada para aplicar classes dinamicamente, use [ngClass].

  ```html
  <div [ngClass]="{ 'ativo': isActive, 'inativo': !isActive }">
    Este texto usa ngClass.
  </div>
  ```

### Evite Lógica Complexa Dentro de Diretivas

Diretivas devem ser pequenas e focadas em uma única responsabilidade. Para lógica complexa, crie serviços e injete-os na diretiva.

- Exemplo Correto

  Crie um serviço para encapsular lógica reutilizável e injete-o na diretiva.

  ```tsx
  import { Directive, ElementRef, Renderer2, OnInit } from "@angular/core";
  import { ThemeService } from "./theme.service";

  @Directive({
    selector: "[appDynamicTheme]",
  })
  export class DynamicThemeDirective implements OnInit {
    constructor(
      private el: ElementRef,
      private renderer: Renderer2,
      private themeService: ThemeService
    ) {}

    ngOnInit() {
      const theme = this.themeService.getTheme();
      this.renderer.setStyle(this.el.nativeElement, "color", theme.textColor);
    }
  }
  ```
