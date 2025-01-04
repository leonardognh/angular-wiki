---
sidebar_position: 3
---

# Estrutura de Projetos

A estrutura de um projeto Angular organiza os arquivos e diretórios para que o desenvolvimento seja escalável e de fácil manutenção. Criada pelo Angular CLI, a estrutura inicial contém pastas padrão para módulos, componentes, serviços e outras funcionalidades.

```
meu-projeto/
├── e2e/                   # Testes End-to-End
├── node_modules/          # Dependências instaladas
├── src/                   # Código-fonte principal
│   ├── app/               # Diretório do aplicativo
│   ├── assets/            # Arquivos estáticos (imagens, fontes)
│   ├── environments/      # Configurações de ambiente
│   ├── main.ts            # Ponto de entrada do aplicativo
│   ├── index.html         # Página HTML inicial
│   ├── styles.css         # Estilos globais
│   ├── polyfills.ts       # Compatibilidade com navegadores
├── angular.json           # Configuração do Angular CLI
├── package.json           # Dependências e scripts
├── tsconfig.json          # Configuração do TypeScript
└── README.md              # Documentação do projeto
```

## Estrutura inicial gerada pelo Angular CLI

Criar um novo projeto

```bash
ng new meu-projeto
```

O comando inicializa um projeto com as configurações mínimas necessárias para começar.

**Pasta `src/app`**

Contém o código principal do aplicativo.

- `app.module.ts`: Declarações e configurações do módulo raiz.

- `app.component.ts`: Componente raiz.

## Estrutura Recomendada

Em projetos grandes, a organização deve facilitar a navegação e reutilização do código.

Seguir boas práticas, como o **princípio da modularidade**.

### Estrutura Modular

```
src/
├── app/
│   ├── core/               # Módulo Core: serviços globais, autenticação
│   ├── shared/             # Módulo Shared: componentes, pipes, diretivas reutilizáveis
│   ├── features/           # Módulos de funcionalidades
│   │   ├── home/           # Funcionalidade Home
│   │   ├── dashboard/      # Funcionalidade Dashboard
│   ├── app.module.ts       # Módulo principal
│   ├── app-routing.module.ts # Configuração de rotas
├── assets/                 # Imagens, ícones, arquivos estáticos
├── environments/           # Configurações para dev, prod, etc.
├── styles/                 # Estilos globais e temas
```

### Boas Práticas

**Módulo Core**

Contém serviços e funcionalidades globais (autenticação, interceptadores).

```
src/app/core/
├── services/
│   ├── auth.service.ts
│   ├── logger.service.ts
├── interceptors/
│   ├── auth.interceptor.ts
│   ├── error.interceptor.ts
```

**Módulo Shared**

Componentes reutilizáveis (botões, tabelas).

```
src/app/shared/
├── components/
│   ├── button/
│   ├── table/
├── directives/
├── pipes/
```

**Organizar por Módulos**

Módulos para cada funcionalidade

```
src/app/features/
├── home/
│   ├── home.module.ts
│   ├── home.component.ts
│   ├── home-routing.module.ts
├── dashboard/
```

### Diferentes formas de estruturar

**Estrutura Flat:**

Todos os arquivos na mesma pasta.

- **Vantagem:** Simples para projetos pequenos.

- **Desvantagem:** Dificulta a navegação em projetos grandes.

**Estrutura Modular:**

Cada funcionalidade em um módulo separado.

- **Vantagem:** Escalabilidade e reutilização.

- **Desvantagem:** Mais arquivos e configurações.

```
src/app/
├── auth/
├── user/
├── product/
```

**Diferença**

- **Flat:** Fácil de começar, mas não escalável.

- **Modular:** Requer mais configuração, mas mantém projetos organizados.
