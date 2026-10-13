---
sidebar_position: 1
---

# Ciclo de Vida

## O que é?

O Ciclo de Vida de um Componente é a sequência de eventos ou "ganchos" (hooks) que ocorrem desde o momento em que um componente é criado até que ele seja destruído. Esses eventos permitem executar ações específicas em diferentes estágios do componente, como inicialização, atualização de dados, ou limpeza de recursos.

## Por que é importante?

- Controle de comportamento: Permite realizar ações específicas em momentos chave, como carregar dados na inicialização ou limpar recursos ao destruir o componente.
- Eficiência: Ajuda a evitar desperdício de recursos, garantindo que tarefas como assinaturas, timers ou listeners sejam gerenciadas corretamente.
- Manutenção: Simplifica o gerenciamento do estado do componente, facilitando a depuração e extensibilidade.

## Principais Funções

Aqui estão as funções mais comuns, em ordem de execução:

<details>
  <summary>ngOnChanges()</summary>

Quando é chamado?

- Sempre que uma propriedade vinculada ao componente (@Input) é alterada.

Usado para reagir a mudanças nos valores das entradas.

```tsx showLineNumbers
ngOnChanges(changes: SimpleChanges) {
  console.log('Mudanças detectadas:', changes);
}
```

</details>

<details>
<summary>ngOnInit()</summary>

Quando é chamado?

- Uma vez, após o Angular inicializar todas as propriedades do componente.

Usado para configurações iniciais, como inicializar dados ou carregar informações de uma API.

```tsx showLineNumbers
ngOnInit() {
  console.log('Componente inicializado!');
}
```

</details>

<details>
<summary>ngDoCheck()</summary>

Quando é chamado?

- Durante cada ciclo de verificação de alterações.

Usado para detectar e responder a mudanças que não são detectadas por @Input.

```tsx showLineNumbers
ngDoCheck() {
  console.log('Verificação de mudanças!');
}
```

</details>

<details>
<summary>ngAfterContentInit()</summary>

Quando é chamado?

- Uma vez, após o conteúdo inicializar no componente.

Usado para ações relacionadas ao conteúdo projetado.

```tsx showLineNumbers
ngAfterContentInit() {
  console.log('Conteúdo projetado inicializado!');
}
```

</details>

<details>
<summary>ngAfterContentChecked()</summary>

Quando é chamado?

- Após o Angular verificar as alterações no conteúdo projetado.

Usado para responder a mudanças no conteúdo projetado.

```tsx showLineNumbers
ngAfterContentChecked() {
  console.log('Conteúdo projetado verificado!');
}
```

</details>

<details>
<summary>ngAfterViewInit()</summary>

Quando é chamado?

- Uma vez, após o Angular inicializar as views e os filhos do componente.

Usado para manipular elementos DOM ou inicializar interações dependentes da view.

```tsx showLineNumbers
ngAfterViewInit() {
console.log('Views inicializadas!');
}
```

</details>

<details>
<summary>ngAfterViewChecked()</summary>

Quando é chamado?

- Após o Angular verificar mudanças nas views e nos filhos.

Usado para realizar ações adicionais após mudanças na view.

```tsx showLineNumbers
ngAfterViewChecked() {
console.log('Views verificadas!');
}
```

</details>

<details>
<summary>ngOnDestroy()</summary>

Quando é chamado?

- Antes de o componente ser destruído.

Usado para limpar recursos, como assinaturas, listeners ou timers.

```tsx showLineNumbers
ngOnDestroy() {
  console.log('Componente destruído!');
}
```

</details>

## Fluxo Completo do Ciclo de Vida

- Criação do componente

  - `ngOnChanges()`.
  - `ngOnInit()`.

- Interação com o conteúdo projetado

  - `ngAfterContentInit()`.
  - `ngAfterContentChecked()`.

- Interação com a view

  - `ngAfterViewInit()`.
  - `ngAfterViewChecked()`.

- Verificações contínuas

  - `ngDoCheck()`.
  - `ngOnChanges()`.

- Destruição do componente

  - `ngOnDestroy()`.

## Exemplo Prático

```tsx showLineNumbers
import { Component, OnInit, OnDestroy } from "@angular/core";

@Component({
  selector: "app-exemplo",
  template: `<p>{{ mensagem }}</p>`,
})
export class ExemploComponent implements OnInit, OnDestroy {
  constructor() {
    console.log("Construtor chamado!");
  }

  ngOnInit() {
    console.log("ngOnInit - inicializando componente.");
  }

  ngOnDestroy() {
    console.log("ngOnDestroy - limpando recursos.");
  }
}
```

Saída esperada no console

```plaintext
Construtor chamado!
ngOnInit - inicializando componente.
(Quando o componente é destruído) ngOnDestroy - limpando recursos.
```
