---
title: "TypeScript"
sidebar_position: 3
---

# TypeScript

## O que é?

TypeScript é uma evolução do JavaScript, adicionando tipagem estática e recursos avançados que tornam o desenvolvimento mais seguro e escalável.

Angular utiliza TypeScript nativamente.

## Fundamentos do TypeScript

**Tipagem Estática**

- Adicionar tipos a variáveis, funções e objetos.

  ```tsx
  let idade: number = 25;
  let nome: string = "Angular";
  let ativo: boolean = true;
  ```

**Interfaces**

- Definir contratos para objetos.

  ```tsx
  interface Usuario {
    nome: string;
    idade: number;
    ativo: boolean;
  }

  const usuario: Usuario = {
    nome: "João",
    idade: 30,
    ativo: true,
  };
  ```

**Classes**

- Criar estruturas reutilizáveis com atributos e métodos.

  ```tsx
  class Pessoa {
    constructor(public nome: string, public idade: number) {}

    saudacao(): string {
      return `Olá, meu nome é ${this.nome} e tenho ${this.idade} anos.`;
    }
  }

  const pessoa = new Pessoa("Maria", 25);
  console.log(pessoa.saudacao());
  ```

**Generics**

- Reutilizar código com tipos dinâmicos.

  ```tsx
  function identico<T>(valor: T): T {
    return valor;
  }

  console.log(identico<string>("Teste"));
  console.log(identico<number>(42));
  ```

### Diferenças entre JavaScript e TypeScript

**JavaScript**

- Dinâmico e flexível, mas propenso a erros em tempo de execução.

  ```jsx
  let variavel = "Texto";
  variavel = 42; // Permite alterar o tipo
  ```

**TypeScript**

- Força tipagem e previne erros.

  ```tsx
  let variavel: string = "Texto";
  variavel = 42; // Erro em tempo de desenvolvimento
  ```

### Exemplo - Calculadora

- Criar uma calculadora simples com validação de tipos.

  ```tsx
  class Calculadora {
    somar(a: number, b: number): number {
      return a + b;
    }

    subtrair(a: number, b: number): number {
      return a - b;
    }
  }

  const calc = new Calculadora();
  console.log(calc.somar(10, 5)); // 15
  console.log(calc.subtrair(10, 5)); // 5
  ```
