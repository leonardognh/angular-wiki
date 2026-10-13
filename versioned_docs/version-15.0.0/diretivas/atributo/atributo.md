---
sidebar_position: 1
---

# Diretivas de Atributo

## O que é?

As diretivas de atributo são usadas para modificar a aparência ou o comportamento de elementos DOM sem alterar sua estrutura.

- **`ngClass`**

  Define classes CSS dinamicamente.

  ```html showLineNumbers
  <div [ngClass]="{ 'ativo': isAtivo, 'inativo': !isAtivo }"></div>
  ```

- **`ngStyle`**

  Define estilos CSS dinamicamente.

  ```html showLineNumbers
  <div [ngStyle]="{ color: isAtivo ? 'green' : 'red' }"></div>
  ```

### Diretiva Personalizada

```tsx showLineNumbers title="text-color.directive.ts"
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

```html showLineNumbers
<p appTextColor="blue">Este texto ficará azul.</p>
<p appTextColor="red">Este texto ficará vermelho.</p>
```
