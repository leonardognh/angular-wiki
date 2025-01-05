---
sidebar_position: 4
---

# Diretivas

Diretivas personalizadas permitem adicionar comportamentos específicos aos elementos DOM.

Podem ser de **atributo** ou **estrutural**.

## Diretiva de Atributo Personalizada

Alteram comportamento ou estilo de elementos sem modificar a estrutura do DOM.

```tsx showLineNumbers title="hover-highlight.directive.ts"
import { Directive, ElementRef, Renderer2, HostListener } from "@angular/core";

@Directive({
  selector: "[appHoverHighlight]",
})
export class HoverHighlightDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener("mouseenter") onMouseEnter() {
    this.renderer.setStyle(this.el.nativeElement, "color", "blue");
  }

  @HostListener("mouseleave") onMouseLeave() {
    this.renderer.setStyle(this.el.nativeElement, "color", "black");
  }
}
```

```html showLineNumbers
<p appHoverHighlight>Texto com destaque ao passar o mouse.</p>
```

## Diretiva Estrutural Personalizada

Alteram a estrutura do DOM ao adicionar ou remover elementos.

```tsx showLineNumbers title="if-else.directive.ts"
import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";

@Directive({
  selector: "[appIfElse]",
})
export class IfElseDirective {
  @Input() set appIfElse(condition: boolean) {
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
<p *appIfElse="true">Este texto será exibido!</p>
```

## `Renderer2` vs `ElementRef`

- **`Renderer2`**: Manipula o DOM de forma segura, respeitando as plataformas.

- **`ElementRef`**: Acessa diretamente elementos DOM, mas deve ser usado com cuidado devido a vulnerabilidades de segurança.

| Recurso        | Quando Usar                                |
| -------------- | ------------------------------------------ |
| **Renderer2**  | Alterações de estilo ou atributos seguros. |
| **ElementRef** | Somente para leitura ou casos específicos. |

## Host Binding e Host Listener

- **Host Binding:**

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

- **Host Listener:**

Escuta eventos no elemento host.

```tsx showLineNumbers
@HostListener('click') onClick() {
  console.log('Elemento clicado!');
}
```
