---
sidebar_position: 5
---

# Nx

## O que é?

Nx é uma plataforma de build avançada para monorepos, que ajuda no gerenciamento de múltiplos aplicativos e bibliotecas dentro de um único repositório.Oferece ferramentas para desenvolvimento, build, lint, e testes de aplicações Angular, React, Node.js, e outras tecnologias. Foi projetado para facilitar a escalabilidade e colaboração em projetos grandes.

### Fonte

Para saber mais, acesse [Nx](https://nx.dev/nx-api/angular).

## Principais Recursos do Nx

- **Monorepo:** Gerencie múltiplos projetos (front-end e back-end) em um único repositório.

- **Bibliotecas Compartilhadas:** Crie bibliotecas reutilizáveis entre projetos.

- **Graph:** Visualize dependências entre projetos.

- **CLI Poderoso:** Automação de tarefas comuns como geração de código, lint, e builds.

- **Cache Inteligente:** Otimiza tempo de build e execução de testes.

## Quando Usar Nx?

Projetos grandes com múltiplos aplicativos ou bibliotecas.

Times trabalhando em diferentes funcionalidades dentro do mesmo repositório.

Necessidade de compartilhar código entre aplicativos, como componentes ou serviços.

## Instalação do Nx

- **Instale o Nx CLI globalmente:**

  ```bash
  npm install -g nx
  ```

- **Crie um workspace Nx:**

  ```bash
  npx create-nx-workspace@latest meu-workspace
  ```

- **Opções do assistente:**

  Escolha o estilo do monorepo (Angular, React, Empty, etc.).

  Configure o nome do projeto inicial.

- **Entre no diretório do workspace:**

  ```bash
  cd meu-workspace
  ```

### Estrutura do Workspace

```plaintext
meu-workspace/
├── apps/                  # Aplicativos completos (Angular, React, etc.)
│   ├── admin/
│   ├── site/
├── libs/                  # Bibliotecas reutilizáveis (UI, utils, etc.)
│   ├── shared-ui/
│   ├── auth/
├── nx.json                # Configurações gerais do Nx
├── angular.json           # Configurações específicas do Angular
├── package.json           # Dependências do projeto
├── tsconfig.base.json     # Configuração base do TypeScript
├── workspace.json         # Configuração de projetos e tarefas
```

## Criando Aplicativos e Bibliotecas

- **Criar um Aplicativo**

  ```bash
  nx generate @nrwl/angular:application meu-app
  ```

  Adiciona o aplicativo na pasta `apps/meu-app`.

- **Criar uma Biblioteca**

  ```bash
  nx generate @nrwl/angular:library shared-ui
  ```

  Adiciona a biblioteca na pasta `libs/shared-ui`.

## Benefícios de Bibliotecas em Nx

- **Compartilhamento de Código**

  Componentes, serviços, e pipes podem ser reutilizados entre aplicativos.

  `libs/shared-ui` contém componentes reutilizáveis como botões, tabelas, etc.

- **Encapsulamento**

  Bibliotecas permitem criar código modular e evitar dependências desnecessárias.

## Executando Tarefas com Nx

### Build

```bash
nx build meu-app
```

### Testes

```bash
nx test meu-app
```

### Lint

```bash
nx lint meu-app
```

### Graph de Dependências

```bash
nx graph
```

Abre um visualizador interativo das dependências entre projetos e bibliotecas.

### Cache Inteligente do Nx

Nx salva resultados de builds, lint e testes para evitar execução desnecessária.

Se nenhum arquivo relacionado mudou, Nx usa os resultados do cache.

```bash
nx reset
```

### Integração Contínua com Nx

Nx facilita a configuração de pipelines CI/CD para monorepos.

Exemplo: Apenas projetos afetados por mudanças são construídos ou testados.

```bash
nx affected:build
nx affected:test
```
