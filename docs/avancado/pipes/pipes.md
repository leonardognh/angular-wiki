---
sidebar_position: 5
---

# Pipes

## O que é?

Pipes são usados para transformar dados em templates.

Pipes personalizados permitem criar transformações específicas.

```tsx showLineNumbers title="capitalize.pipe.ts"
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "capitalize",
})
export class CapitalizePipe implements PipeTransform {
  transform(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }
}
```

```html showLineNumbers
<p>{{ 'angular' | capitalize }}</p>
<!-- Resultado: Angular -->
```

## Pipes Puros vs. Pipes Impuros

- **Pipes Puros**

  Executam a transformação apenas quando os dados de entrada mudam.

  ```tsx showLineNumbers
  @Pipe({
    name: 'meuPipe',
    pure: true,
  })
  ```

- **Pipes Impuros:**

  Executam em cada ciclo de detecção de mudanças.

  ```tsx showLineNumbers
  @Pipe({
    name: 'meuPipe',
    pure: false,
  })
  ```

| Tipo       | Quando Usar                        |
| ---------- | ---------------------------------- |
| **Puro**   | Transformações de dados estáticos. |
| **Impuro** | Dados dinâmicos ou mutáveis.       |

## Async Pipe

Simplifica o consumo de Observables ou Promises no template.

Dispensa a necessidade de `subscribe`.

```tsx showLineNumbers title="async-example.component.ts"
import { Component } from "@angular/core";
import { Observable, of } from "rxjs";

@Component({
  selector: "app-async-example",
  template: `<p>{{ dados$ | async }}</p>`,
})
export class AsyncExampleComponent {
  dados$: Observable<string> = of("Dados carregados");
}
```

## Pipes Combinados

Utilizar múltiplos pipes para transformação sequencial.

```html showLineNumbers
<p>{{ '2023-01-02T12:00:00' | date:'fullDate' | uppercase }}</p>
```
