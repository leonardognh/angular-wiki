# Estrutura Dinâmica

## O que é?

Permitem criar elementos auxiliares que não geram tags HTML visíveis no DOM final, mas são úteis para organizar e controlar a renderização de elementos.

## Tipos de Controles

### `<ng-container>`

O `<ng-container>` é um elemento estrutural que não aparece no DOM e é usado para agrupar elementos ou aplicar diretivas sem adicionar um elemento extra no HTML renderizado.

- Principais usos

  - Agrupamento lógico de elementos.
  - Aplicação de diretivas em blocos de elementos sem criar novos nós no DOM.
  - Evitar poluição visual no DOM final.

```html showLineNumbers
<ng-container *ngIf="itens.length > 0">
  <p *ngFor="let item of itens">{{ item }}</p>
</ng-container>
```

Aqui, o `<ng-container>` agrupa o `*ngIf` e o `*ngFor`, evitando conflitos, já que não é permitido usar duas diretivas estruturais no mesmo elemento.

```html showLineNumbers
<ng-container *ngIf="isLoggedIn">
  <div *ngFor="let user of users">{{ user.name }}</div>
</ng-container>
```

No exemplo acima, o conteúdo dentro do `<ng-container>` será exibido somente se `isLoggedIn` for verdadeiro, mas o `<ng-container>` em si não aparecerá no DOM final.

### `<ng-template>`

O `<ng-template>` é um contêiner Angular usado para armazenar um bloco de código HTML ou lógica que será renderizado condicionalmente ou reutilizado dinamicamente. Ele não é renderizado automaticamente no DOM, a menos que seja explicitamente instruído a fazê-lo.

- Principais usos

  - Renderização condicional.
  - Reutilização de blocos de código.
  - Suporte a APIs como *ngIf, *ngFor, e outras diretivas estruturais.

```html showLineNumbers
<ng-template #templateExemplo>
  <p>Este conteúdo está dentro do ng-template.</p>
</ng-template>

<button (click)="mostrarTemplate = !mostrarTemplate">Alternar Template</button>

<div *ngIf="mostrarTemplate">
  <ng-container *ngTemplateOutlet="templateExemplo"></ng-container>
</div>
```

## Resumo

| **Aspecto**        | **ng-template**                                                | **ng-container**                                   |
| ------------------ | -------------------------------------------------------------- | -------------------------------------------------- |
| **Renderização**   | Não é renderizado no DOM automaticamente.                      | Renderizado como um agrupador invisível.           |
| **Finalidade**     | Armazenar conteúdo para renderização posterior ou condicional. | Agrupar elementos sem adicionar nós extras no DOM. |
| **Uso Principal**  | Reutilização e controle de renderização.                       | Organização e aplicação de diretivas.              |
| **Exemplo de Uso** | `*ngTemplateOutlet`                                            | `*ngIf`, `*ngFor`                                  |

## Boas Práticas

- Use `ng-container` para evitar poluição do DOM

  - Sempre que precisar aplicar uma diretiva como `*ngIf` ou `*ngFor` em múltiplos elementos, use `ng-container` para evitar a criação de elementos desnecessários.

- Prefira `ng-template` para renderização condicional complexa

  - Use-o quando precisar armazenar trechos de código para serem reutilizados ou renderizados sob demanda.

- Combine com `*ngTemplateOutlet`

  - Crie templates dinâmicos e reutilizáveis com `ng-template` e insira-os usando `*ngTemplateOutlet`.

- Evite usar `ng-template` sem necessidade

  - Não use `ng-template` para agrupamento simples. Use `ng-container` nesse caso.
