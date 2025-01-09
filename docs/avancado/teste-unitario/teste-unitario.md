---
sidebar_position: 5
---

# Testes Unitários

## O que é?

Testes unitários verificam o comportamento de unidades isoladas do código, como funções, serviços, ou métodos de classes. No Angular, geralmente testamos componentes, serviços, pipes, e diretivas. Garantir que cada unidade funcione conforme esperado, sem depender da interface ou outras unidades.

## Estrutura Básica de um Teste Unitário no Angular

O Angular utiliza **Jasmine** e **Karma** por padrão.

### Fonte

Para saber mais, acesse [Jasmine](https://jasmine.github.io/pages/docs_home.html) e [Karma](https://karma-runner.github.io/latest/index.html).

```tsx showLineNumbers
describe("Nome da Unidade", () => {
  it("Deve realizar uma ação", () => {
    // Arrange: Configurar o estado inicial
    // Act: Executar a ação
    // Assert: Verificar o resultado
  });
});
```

### Configuração do TestBed

`TestBed` é uma classe usada para configurar e inicializar um ambiente de teste no Angular.

```tsx showLineNumbers
beforeEach(() => {
  TestBed.configureTestingModule({
    declarations: [MeuComponente], // Componentes a serem testados
    providers: [MeuServico], // Serviços ou dependências
    imports: [HttpClientTestingModule], // Módulos necessários
  });
});
```

## Boas Práticas

- **Teste Somente o Necessário**

  Não inclua a interface ou renderização no teste.

- **Use Mocks**

  Evite dependências externas reais, como APIs.

- **Mantenha os Testes Isolados**

  Cada teste deve funcionar independentemente de outros.

## Utilizando o Jest (Alternativa ao Jasmine)

### Fonte

Para saber mais, acesse [Jest](https://jestjs.io/docs/getting-started).

### Instalação

```bash
npm install jest jest-preset-angular @types/jest ts-jest --save-dev
```

### Configuração

- Crie o arquivo `jest.config.js`

  ```jsx showLineNumbers title="jest.config.js"
  module.exports = {
    preset: "jest-preset-angular",
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
    transform: {
      "^.+\\.(ts|js|html)$": "ts-jest",
    },
    moduleNameMapper: {
      "^src/(.*)$": "<rootDir>/src/$1",
    },
    testMatch: ["**/__tests__/**/*.spec.ts"],
  };
  ```

- Crie o arquivo `setup-jest.ts`

  ```tsx showLineNumbers title="setup-jest.ts"
  import "jest-preset-angular/setup-jest";
  ```

- Atualizar `tsconfig.spec.json`

  Ajuste para suportar o Jest

  ```json showLineNumbers title="tsconfig.spec.json"
  {
    "compilerOptions": {
      "types": ["jest"]
    }
  }
  ```

- Adicionar Script no `package.json`

  ```json showLineNumbers title="package.json"
  "scripts": {
    "test": "jest"
  }
  ```

- Remover Dependências do Karma e Jasmine

  ```bash
  npm uninstall karma karma-chrome-launcher karma-coverage karma-jasmine karma-jasmine-html-reporter jasmine-core @types/jasmine
  ```

## Usando `ng-mocks`

`ng-mocks` é uma biblioteca que simplifica testes de componentes e módulos no Angular. Facilita a criação de mocks para módulos, componentes, serviços, diretivas, e pipes.

- **Vantagens**

Substitui automaticamente dependências complexas por mocks. Reduz a configuração de testes, tornando-os mais rápidos e fáceis.

### Instalação

Adicione a biblioteca ao projeto.

```bash
npm install --save-dev ng-mocks
```

Utilização

```tsx showLineNumbers title="home.component.spec.ts"
import { MockModule } from 'ng-mocks';

describe('HomeComponent', () => {
  beforeEach(() => {
	  TestBed.configureTestingModule({
	  // ...
	  imports: [
	    MockModule(...),
	   ]
    })
  })
});

```

### Melhores Práticas com `ng-mocks`

- **Mantenha os Testes Leves**

  Use mocks para evitar dependências reais em testes unitários.

- **Evite Testar Componentes Não Relacionados**

  `ng-mocks` ajuda a isolar componentes, mas mantenha o foco na unidade testada.

- **Combine com TestBed**

  `ng-mocks` não substitui `TestBed`, mas simplifica sua configuração.

- **Use Mocks para Reduzir Complexidade**

  Substitua módulos inteiros ou serviços complexos por versões mockadas.
