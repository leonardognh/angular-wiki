---
sidebar_position: 15
---

# Signals

## O que é?

Signals são um novo modelo reativo introduzido no Angular para gerenciar estado de forma mais previsível e eficiente. Eles oferecem uma alternativa simplificada aos **Observables** e **EventEmitters** em cenários onde streams reativas completas não são necessárias.

**Vantagens**

- **Previsibilidade:** Atualizações de estado ocorrem de forma síncrona e previsível.

- **Imutabilidade:** Signals incentivam o uso de dados imutáveis.

- **Performance:** Menos overhead do que Observables em casos simples.

## Exemplo

```tsx showLineNumbers title="contador.component.ts"
import { Component, signal } from "@angular/core";

@Component({
  selector: "app-contador",
  template: `
    <button (click)="incrementar()">+</button>
    <p>{{ contador() }}</p>
    <button (click)="decrementar()">-</button>
  `,
})
export class ContadorComponent {
  contador = signal(0);

  incrementar() {
    this.contador.set(this.contador() + 1);
  }

  decrementar() {
    this.contador.set(this.contador() - 1);
  }
}
```

- `signal(0)`: Cria um signal inicializado com o valor `0`.

- `contador()`: Lê o valor do signal.

- `contador.set()`: Atualiza o valor do signal.

## Computação Derivada

Signals permitem criar valores derivados de outros signals.

```tsx showLineNumbers
total = computed(() => this.quantidade() * this.preco());

atualizarPreco(novoPreco: number) {
  this.preco.set(novoPreco);
}
```

## Signals x Observables

Diferenças Fundamentais
| **Aspecto** | **Signals** | **Observables** |
|-------------------------|-----------------------------------------------|---------------------------------------------|
| **Modo de Operação** | Reatividade baseada em leitura e escrita síncronas. | Reatividade baseada em streams assíncronas. |
| **Uso Principal** | Estado local e derivação de valores. | Streams de eventos e chamadas de API. |
| **Complexidade** | Mais simples para cenários de estado local. | Necessário para manipulação de dados assíncronos complexos. |
| **API** | Semelhante a variáveis reativas (`signal()` e `computed()`). | Baseada em operadores RxJS, como `map`, `mergeMap`, etc. |

### Estado Local (Signals vs Observables)

- **Signals**

  ```tsx showLineNumbers title="contador.component.ts"
  import { Component, signal } from "@angular/core";

  @Component({
    selector: "app-contador",
    template: `
      <button (click)="incrementar()">+</button>
      <p>{{ contador() }}</p>
    `,
  })
  export class ContadorComponent {
    contador = signal(0);

    incrementar() {
      this.contador.set(this.contador() + 1);
    }
  }
  ```

- **Observables**

  ```tsx showLineNumbers title="contador.component.ts"
  import { Component } from "@angular/core";
  import { BehaviorSubject } from "rxjs";

  @Component({
    selector: "app-contador",
    template: `
      <button (click)="incrementar()">+</button>
      <p>{{ contador$ | async }}</p>
    `,
  })
  export class ContadorComponent {
    contador$ = new BehaviorSubject(0);

    incrementar() {
      this.contador$.next(this.contador$.value + 1);
    }
  }
  ```

### Requisição HTTP com Transformação de Dados

- **Signals**

  ```tsx showLineNumbers title="dados.component.ts"
  import { Component, signal } from "@angular/core";
  import { HttpClient } from "@angular/common/http";

  @Component({
    selector: "app-dados",
    template: ` <p>{{ dadosFormatados() }}</p> `,
  })
  export class DadosComponent {
    dados = signal<any[]>([]);
    dadosFormatados = computed(() =>
      this.dados().map((item) => item.nome.toUpperCase())
    );

    constructor(private http: HttpClient) {
      this.http.get<any[]>("https://api.exemplo.com/dados").subscribe((res) => {
        this.dados.set(res);
      });
    }
  }
  ```

- **Observables**

  ```tsx showLineNumbers title="dados.component.ts"
  import { Component } from "@angular/core";
  import { HttpClient } from "@angular/common/http";
  import { map } from "rxjs/operators";
  import { Observable } from "rxjs";

  @Component({
    selector: "app-dados",
    template: `
      <p *ngFor="let nome of dadosFormatados$ | async">{{ nome }}</p>
    `,
  })
  export class DadosComponent {
    dadosFormatados$: Observable<string[]>;

    constructor(private http: HttpClient) {
      this.dadosFormatados$ = this.http
        .get<any[]>("https://api.exemplo.com/dados")
        .pipe(map((dados) => dados.map((item) => item.nome.toUpperCase())));
    }
  }
  ```

### Transformação com Pipe

- **Com Signals e Pipe Customizado**

  - **Pipe**

    ```tsx showLineNumbers title="capitalize.pipe.ts"
    import { Pipe, PipeTransform } from "@angular/core";

    @Pipe({ name: "capitalize" })
    export class CapitalizePipe implements PipeTransform {
      transform(value: string): string {
        return value.charAt(0).toUpperCase() + value.slice(1);
      }
    }
    ```

  - **Componente**

    ```html showLineNumbers
    <p>{{ dado() | capitalize }}</p>
    ```

- **Com Observables e Pipe Customizado**

  O pipe funciona da mesma forma

  ```html showLineNumbers
  <p *ngIf="dado$ | async as dado">{{ dado | capitalize }}</p>
  ```

### Quando Usar Signals ou Observabl

| **Cenário**                              | **Recomendação** |
| ---------------------------------------- | ---------------- |
| Estado local ou simples derivação.       | **Signals**      |
| Requisições HTTP ou streams assíncronas. | **Observables**  |
| Combinação de múltiplos fluxos.          | **Observables**  |
| Componentes isolados e autossuficientes. | **Signals**      |
