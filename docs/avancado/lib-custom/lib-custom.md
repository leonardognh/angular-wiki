---
sidebar_position: 14
---

# Bibliotecas Customizadas

## O que é?

Bibliotecas customizadas são pacotes reutilizáveis desenvolvidos para encapsular funcionalidades, componentes, diretivas, serviços, e pipes. Podem ser compartilhadas entre projetos ou publicadas no **npm**.

## Benefícios de Criar Bibliotecas

- **Reutilização:** Compartilhe código entre diferentes projetos.

- **Manutenção:** Centralize atualizações em um único lugar.

- **Encapsulamento:** Isola funcionalidades em módulos reutilizáveis.

## Criando uma Biblioteca Customizada

- **Criação do Workspace com Suporte a Bibliotecas**

  ```bash
  npx create-nx-workspace meu-workspace --preset=angular
  ```

- **Adicione uma Biblioteca**

  ```bash
  nx generate @nrwl/angular:library minha-biblioteca
  ```

- **Estrutura do Projeto**

  ```
  meu-workspace/
  ├── libs/
  │   └── minha-biblioteca/
  │       ├── src/
  │       │   ├── lib/
  │       │   │   └── meu-componente/
  │       │   │       ├── meu-componente.component.ts
  │       │   │       ├── meu-componente.component.html
  │       │   │       └── meu-componente.component.css
  │       │   ├── public-api.ts
  ├── apps/
  ```

- **Exportação dos Componentes no `public-api.ts`**

  ```tsx
  export * from "./lib/meu-componente/meu-componente.component";
  ```

- **Build da Biblioteca**

  ```bash
  nx build minha-biblioteca
  ```

- **Uso no Projeto Principal**

  Importe a biblioteca gerada

  ```tsx
  import { MinhaBibliotecaModule } from "@meu-workspace/minha-biblioteca";
  ```
