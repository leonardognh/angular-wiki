---
title: "JavaScript"
sidebar_position: 1
---

# JavaScript

## O que é?

JavaScript é a base para o desenvolvimento web e é essencial para entender o funcionamento do Angular.

## Fundamentos do JavaScript

### Variáveis

- `var`
- `let`
- `const`

```jsx showLineNumbers
var nome = "Angular";
let ativo = true;
const ano = 2023;
```

### Tipos de Primitivos

- `string`
- `number`
- `boolean`
- `null`
- `undefined`
- `object`
- `array`.

### Funções

- Declarativa

  Uma função declarativa é definida com a palavra-chave function e tem um nome.

  ```jsx showLineNumbers
  function somar(a, b) {
    return a + b;
  }

  console.log(somar(5, 3)); // 8
  ```

- Anônima

  Uma função anônima não tem nome e é geralmente atribuída a uma variável ou passada como argumento.

  ```jsx showLineNumbers
  const subtrair = function (a, b) {
    return a - b;
  };

  console.log(subtrair(8, 3)); // 5
  ```

  Ou usada como callback:

  ```jsx showLineNumbers
  setTimeout(function () {
    console.log("Esta é uma função anônima!");
  }, 1000);
  ```

- Function

  As arrow functions foram introduzidas no ES6 e têm uma sintaxe mais curta. Elas não possuem seu próprio this e arguments.

  ```jsx showLineNumbers
  const multiplicar = (a, b) => a \* b;

  console.log(multiplicar(4, 3)); // 12
  ```

  Quando há apenas um parâmetro:
  Você pode omitir os parênteses ao redor do parâmetro.

  ```jsx showLineNumbers
  const quadrado = x => x \* x;

  console.log(quadrado(5)); // 25
  ```

  Com várias linhas de código:
  Se o corpo da função for maior, use {} e return explicitamente.

  ```jsx showLineNumbers
  const dividir = (a, b) => {
    if (b === 0) {
      return "Não é possível dividir por zero!";
    }
    return a / b;
  };

  console.log(dividir(10, 2)); // 5
  console.log(dividir(10, 0)); // "Não é possível dividir por zero!"
  ```

  Usada como callback:

  ```jsx showLineNumbers
  setTimeout(() => {
    console.log("Esta é uma arrow function!");
  }, 1000);
  ```

### Manipulação do DOM

```jsx showLineNumbers
document.getElementById("btn").addEventListener("click", () => {
  console.log("Botão clicado!");
});
```
