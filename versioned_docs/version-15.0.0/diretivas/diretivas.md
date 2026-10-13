---
sidebar_position: 2
---

# Diretivas

## O que é?

Diretivas são elementos fundamentais no Angular que permitem modificar o comportamento ou a aparência de elementos no DOM.

- **Diretivas de Atributo**: Modificam a aparência ou comportamento de elementos DOM (como alterar estilos ou classes).
- **Diretivas Estruturais**: Alteram a estrutura do DOM (como *ngIf ou *ngFor).
- **Diretivas de Componente**: Utilizam a lógica de componentes como diretivas.

## Diretivas Nativas

O Angular fornece várias diretivas prontas para uso

- **Diretivas Estruturais**

  `ngIf`, `ngFor`, `ngSwitch`.

  ```html showLineNumbers
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

## `Renderer2` vs `ElementRef`

- **`Renderer2`**: Manipula o DOM de forma segura, respeitando as plataformas.

- **`ElementRef`**: Acessa diretamente elementos DOM, mas deve ser usado com cuidado devido a vulnerabilidades de segurança.

| Recurso        | Quando Usar                                |
| -------------- | ------------------------------------------ |
| **Renderer2**  | Alterações de estilo ou atributos seguros. |
| **ElementRef** | Somente para leitura ou casos específicos. |

## Host Binding e Host Listener

### O que é?

Os decoradores @HostListener e @HostBinding no Angular são usados para interagir com o elemento host de uma diretiva ou componente.

### Host Binding

Vincula propriedades ou classes do host.

```tsx showLineNumbers title="bold.directive.ts"
@Directive({
  selector: "[appBold]",
})
export class BoldDirective {
  @HostBinding("style.fontWeight") fontWeight = "normal";

  @HostListener("mouseenter") onMouseEnter() {
    this.fontWeight = "bold";
  }

  @HostListener("mouseleave") onMouseLeave() {
    this.fontWeight = "normal";
  }
}
```

### Host Listener

Escuta eventos no elemento host.

```tsx showLineNumbers
@HostListener('click') onClick() {
  console.log('Elemento clicado!');
}
```

## Boas práticas ao usar Diretivas

Ao trabalhar com diretivas no Angular, algumas boas práticas podem melhorar a legibilidade, desempenho e manutenção do código.

### Não Use Duas Diretivas Estruturais no Mesmo Elemento

No Angular, **não é permitido usar duas diretivas estruturais no mesmo elemento**, como `*ngIf` e `*ngFor`, porque ambas tentam controlar o mesmo template, o que causa um erro de compilação.

- Exemplo Inválido

  ```html showLineNumbers
  <div *ngIf="isLoggedIn" *ngFor="let user of users">{{ user.name }}</div>
  ```

  Erro

  > Cannot have multiple structural directives on the same element.
  >
  > ("Não é permitido usar mais de uma diretiva estrutural no mesmo elemento.")

- Como Resolver?

  Use um elemento auxiliar, como `<ng-container>`, para separar as diretivas.

  ```html showLineNumbers
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

  ```html showLineNumbers
  <div [ngClass]="{ 'ativo': isActive, 'inativo': !isActive }">
    Este texto usa ngClass.
  </div>
  ```

### Evite Lógica Complexa Dentro de Diretivas

Diretivas devem ser pequenas e focadas em uma única responsabilidade. Para lógica complexa, crie serviços e injete-os na diretiva.

- Exemplo Correto

  Crie um serviço para encapsular lógica reutilizável e injete-o na diretiva.

  ```tsx showLineNumbers title="dynamic-theme.directive.ts"
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
