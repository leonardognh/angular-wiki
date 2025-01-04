---
title: "ECMAScript"
sidebar_position: 2
---

# ECMAScript (ES)

## O que é?

O ECMAScript (ES) é a especificação que padroniza o JavaScript. Desde sua criação, várias versões introduziram melhorias significativas.

## Evolução

### ECMAScript 5 (2009)

- Introduziu o modo estrito (`"use strict"`).

- Adicionou novos métodos `Array.prototype.map()`, `filter()`, `reduce()`.

- Suporte para JSON.

  ```jsx
  "use strict";
  const numeros = [1, 2, 3, 4];
  const dobrados = numeros.map((n) => n * 2);
  console.log(dobrados); // [2, 4, 6, 8]
  ```

### ECMAScript 6 (ES6/2015)

- **`let` e `const`:** Escopo de bloco.

- **Arrow Functions:** Sintaxe concisa para funções.

- **Classes:** Suporte a orientação a objetos.

- **Template Literals:** Interpolação de strings.

- **Destructuring:** Extração de valores de objetos e arrays.

- **Promises:** Tratamento assíncrono.

- **Modules (import/export):** Modularização nativa.

  ```jsx
  const pessoa = { nome: "Maria", idade: 25 };
  const { nome, idade } = pessoa;
  console.log(`Nome: ${nome}, Idade: ${idade}`);
  ```

### ECMAScript 7 (ES2016)

- Operador de exponenciação (`*`).

- Método `Array.prototype.includes()`.

  ```jsx
  const numeros = [1, 2, 3];
  console.log(numeros.includes(2)); // true
  console.log(2 ** 3); // 8
  ```

### ECMAScript 8 (ES2017)

- **Async/Await:** Melhor sintaxe para Promises.

- Métodos: `Object.entries()`, `Object.values()`.

  ```jsx
  async function fetchDados() {
    const resposta = await fetch("https://api.exemplo.com");
    const dados = await resposta.json();
    console.log(dados);
  }
  ```

### ECMAScript 9 (ES2018)

- Operador de propagação/rest em objetos.

- **Promise.prototype.finally():** Finalizar Promises.

  ```jsx
  const usuario = { nome: "João", idade: 30 };
  const copia = { ...usuario, ativo: true };
  console.log(copia);
  ```

### ECMAScript 10 (ES2019)

- Métodos como `Array.prototype.flat()` e `flatMap()`.

- `Object.fromEntries()`.

  ```jsx
  const pares = [
    ["nome", "João"],
    ["idade", 30],
  ];
  const obj = Object.fromEntries(pares);
  console.log(obj); // { nome: "João", idade: 30 }
  ```

### ECMAScript 11 (ES2020)

- **Nullish Coalescing (`??`):** Define valores padrão para `null` ou `undefined`.

- **Optional Chaining (`?.`):** Acessar propriedades de forma segura.

  ```jsx
  const usuario = null;
  console.log(usuario?.nome ?? "Usuário não encontrado");
  ```

### ECMAScript 12 (ES2021)

- Métodos: `String.prototype.replaceAll()`.

- Operadores lógicos compostos: `&&=`, `||=`, `??=`.

  ```jsx
  let mensagem = "Olá, Angular! Angular é incrível.";
  mensagem = mensagem.replaceAll("Angular", "TypeScript");
  console.log(mensagem);
  ```
