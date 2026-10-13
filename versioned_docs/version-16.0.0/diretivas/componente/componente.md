---
sidebar_position: 3
---

# Diretivas de Componente

## O que é?

As diretivas de componente são componentes Angular que possuem um selector e podem ser usados como elementos ou atributos no DOM. Elas contêm tanto lógica quanto uma interface de usuário associada.

```tsx showLineNumbers title="alert-box.component.ts"
import { Component, Input } from "@angular/core";

@Component({
  selector: "app-alert-box",
  template: `
    <div class="alert" [ngClass]="type">
      <strong>{{ title }}</strong
      >:
      <ng-content></ng-content>
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

```html showLineNumbers
<app-alert-box title="Sucesso" type="success">
  A operação foi concluída com êxito!
</app-alert-box>

<app-alert-box title="Erro" type="error">
  Algo deu errado. Por favor, tente novamente.
</app-alert-box>
```
