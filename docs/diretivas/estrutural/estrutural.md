---
sidebar_position: 2
---

# Diretivas Estruturais

## O que é?

As diretivas estruturais alteram a estrutura do DOM, adicionando, removendo ou reordenando elementos no DOM.

- **`ngIf`:**

  Condicionalmente renderiza um elemento.

  ```html showLineNumbers
  <p *ngIf="isAtivo">Este texto é exibido se isAtivo for verdadeiro.</p>
  ```

- **`ngFor`:**

  Itera sobre uma lista e renderiza elementos.

  ```html showLineNumbers
  <ul>
    <li *ngFor="let item of itens">{{ item }}</li>
  </ul>
  ```

### Diretiva Personalizada

```tsx showLineNumbers title="show-if.directive.ts"
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

```html showLineNumbers
<div *appShowIf="true">Este conteúdo será exibido.</div>
<div *appShowIf="false">Este conteúdo será ocultado.</div>
```
