---
sidebar_position: 7
---

# Arquivos tsconfig.json

### O que é?

O `tsconfig.json` é o arquivo de configuração principal do TypeScript em um projeto. Ele define as opções de compilação e quais arquivos ou diretórios devem ser incluídos ou excluídos no processo de build.

```json showLineNumbers
{
  "compilerOptions": {
    "target": "ES2015", // Versão do JavaScript gerado
    "module": "ESNext", // Sistema de módulos
    "strict": true, // Ativa o modo estrito do TypeScript
    "outDir": "./dist", // Diretório de saída
    "baseUrl": "./src", // Base para importações relativas
    "paths": {
      "@shared/*": ["app/shared/*"]
    }
  },
  "include": ["src/**/*"], // Arquivos incluídos na compilação
  "exclude": ["node_modules", "**/*.spec.ts"] // Arquivos excluídos
}
```

## Arquivos Secundários de Configuração

**Por que ter outros arquivos?**

Em projetos Angular (e monorepos), diferentes partes do projeto têm requisitos distintos.

Arquivos como `tsconfig.app.json`, `tsconfig.spec.json` e `tsconfig.base.json` permitem personalizar as configurações para diferentes contextos (aplicação, testes, etc.), mantendo a configuração principal limpa e reutilizável.

## Principais Arquivos de Configuração

### `tsconfig.base.json`

Contém configurações compartilhadas entre todos os arquivos de configuração. Serve como base para configurações específicas como `tsconfig.app.json` e `tsconfig.spec.json`.

```json showLineNumbers
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "strict": true,
    "baseUrl": "./",
    "paths": {
      "@shared/*": ["src/app/shared/*"]
    }
  }
}
```

### `tsconfig.app.json`

Configuração específica para o código da aplicação. Geralmente inclui arquivos `.ts` da aplicação e exclui testes ou arquivos de configuração.

```json showLineNumbers
{
  "extends": "./tsconfig.base.json",
  "compilerOptions": {
    "outDir": "./dist/out-tsc/app"
  },
  "files": ["src/main.ts", "src/polyfills.ts"],
  "include": ["src/**/*.d.ts", "src/**/*.ts"],
  "exclude": ["src/test.ts", "src/**/*.spec.ts"]
}
```

### `tsconfig.spec.json`

Configuração específica para arquivos de teste. Inclui configurações necessárias para testes unitários, como bibliotecas de testes e arquivos `.spec.ts`.

```json showLineNumbers
{
  "extends": "./tsconfig.base.json",
  "compilerOptions": {
    "outDir": "./dist/out-tsc/spec",
    "types": ["jasmine", "node"]
  },
  "include": ["src/**/*.spec.ts", "src/**/*.d.ts"]
}
```

### `tsconfig.json`

Arquivo principal que referencia outros arquivos de configuração. Serve como ponto de entrada para o TypeScript.

```json showLineNumbers
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.spec.json" }
  ]
}
```

### Por que Separar as Configurações?

| **Razão**          | **Benefício**                                                               |
| ------------------ | --------------------------------------------------------------------------- |
| **Manutenção**     | Facilita a organização e a leitura das configurações.                       |
| **Reutilização**   | Configurações comuns ficam centralizadas no `tsconfig.base.json`.           |
| **Especificidade** | Permite customizar configurações para diferentes cenários (app, testes).    |
| **Performance**    | Apenas os arquivos relevantes são incluídos em cada contexto de compilação. |

### Fluxo de Herança entre Arquivos

```plaintext
tsconfig.json
  ├── tsconfig.base.json
  ├── tsconfig.app.json
  └── tsconfig.spec.json
```

- **`tsconfig.base.json`:** Configurações comuns compartilhadas.

- **`tsconfig.app.json`:** Extende o `tsconfig.base.json` com configurações específicas para a aplicação.

- **`tsconfig.spec.json`:** Extende o `tsconfig.base.json` com configurações específicas para testes.

## Benefícios em Projetos Reais

- **Aplicações Escaláveis**

  Separar configurações permite gerenciar projetos grandes com múltiplos contextos.

- **Monorepos**

  No Nx, por exemplo, cada aplicativo ou biblioteca pode ter seu próprio arquivo `tsconfig.json`.

- **Build Otimizado**

  Apenas os arquivos necessários para o contexto atual (app ou teste) são incluídos na compilação.

## Explicação dos Itens do `tsconfig.json`

### `compilerOptions`

Configura as opções de compilação do TypeScript.

### `target`

Define a versão do JavaScript gerado.

**Valores Comuns**

- `ES5`: Compatível com navegadores antigos.

- `ES2015`, `ES2020`, `ESNext`: Compatível com navegadores modernos.

### `module`

Define o sistema de módulos usado no código.

**Valores Comuns**

- `CommonJS`: Usado no Node.js.

- `ESNext`: Sistema de módulos moderno.

- `AMD`, `UMD`: Para navegadores antigos ou requisitos específicos.

### `strict`

Ativa o modo estrito do TypeScript, habilitando todas as verificações estritas.

**Valores Comuns**

- `noImplicitAny`

- `strictNullChecks`

- `strictFunctionTypes`

### `outDir`

Especifica o diretório onde os arquivos JavaScript compilados serão gerados.

```json showLineNumbers
"outDir": "./dist"
```

### `baseUrl`

Define o diretório base para resoluções de caminhos relativos.

```json showLineNumbers
"baseUrl": "./src"
```

### `paths`

Define atalhos para importações no código.

```json showLineNumbers
"paths": {
  "@shared/*": ["app/shared/*"]
}
```

### `sourceMap`

Gera arquivos `.map` que mapeiam o código TypeScript para o JavaScript gerado, facilitando o debug.

```json showLineNumbers
"sourceMap": true
```

### `declaration`

Gera arquivos `.d.ts` contendo definições de tipos, útil para bibliotecas.

```json showLineNumbers
"declaration": true
```

### `noImplicitAny`

Gera erro para variáveis ou parâmetros cujo tipo não seja explicitamente definido.

```json showLineNumbers
"noImplicitAny": true
```

### `skipLibCheck`

Ignora verificações de tipos em arquivos de definições de bibliotecas (`.d.ts`).

```json showLineNumbers
"skipLibCheck": true
```

### `moduleResolution`

Define como o TypeScript encontra os módulos importados.

**Valores Comuns**

- `node`: Baseado na resolução de módulos do Node.js.

- `classic`: Baseado no comportamento pré-ES6.

### `esModuleInterop`

Habilita compatibilidade com módulos ES6 e CommonJS.

```json showLineNumbers
"esModuleInterop": true
```

### `removeComments`

Remove comentários dos arquivos compilados.

```json showLineNumbers
"removeComments": true
```

### `resolveJsonModule`

Permite importar arquivos JSON diretamente no TypeScript.

```json showLineNumbers
"resolveJsonModule": true
```

### `typeRoots`

Define os diretórios onde o TypeScript deve procurar por definições de tipo.

```json showLineNumbers
"typeRoots": ["node_modules/@types"]
```

### `types`

Lista os pacotes de definições de tipo que serão incluídos.

```json showLineNumbers
"types": ["node", "jasmine"]
```

### `lib`

Especifica as bibliotecas padrão disponíveis durante a compilação.

**Valores Comuns**

- `DOM`: APIs de navegador.

- `ES2015`, `ES2020`: Recursos de JavaScript.

- `DOM.Iterable`: Iteração sobre NodeList, etc.

```json showLineNumbers
"lib": ["DOM", "ES2020"]
```

### `include`

Especifica os arquivos ou diretórios a serem incluídos na compilação.

```json showLineNumbers
"include": ["src/**/*"]
```

### `exclude`

Especifica os arquivos ou diretórios a serem excluídos da compilação.

```json showLineNumbers
"exclude": ["node_modules", "**/*.spec.ts"]
```

### `extends`

Permite herdar configurações de outro arquivo `tsconfig.json`.

```json showLineNumbers
"extends": "./tsconfig.base.json"
```

### `files`

Lista arquivos específicos a serem incluídos na compilação.

```json showLineNumbers
"files": ["src/main.ts", "src/polyfills.ts"]
```

### Exemplo

```json showLineNumbers
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "strict": true,
    "outDir": "./dist",
    "baseUrl": "./src",
    "paths": {
      "@shared/*": ["app/shared/*"]
    },
    "sourceMap": true,
    "declaration": true,
    "noImplicitAny": true,
    "skipLibCheck": true,
    "moduleResolution": "node",
    "esModuleInterop": true,
    "removeComments": true,
    "resolveJsonModule": true,
    "typeRoots": ["node_modules/@types"],
    "types": ["node"],
    "lib": ["DOM", "ES2020"]
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "**/*.spec.ts"]
}
```

### Resumo

| **Opção**             | **Descrição**                                                   |
| --------------------- | --------------------------------------------------------------- |
| **target**            | Define a versão do JavaScript gerado.                           |
| **module**            | Define o sistema de módulos a ser usado.                        |
| **strict**            | Ativa verificações estritas do TypeScript.                      |
| **outDir**            | Diretório de saída dos arquivos compilados.                     |
| **paths**             | Define atalhos para importações.                                |
| **sourceMap**         | Gera mapas de origem para debug.                                |
| **declaration**       | Gera arquivos de declaração de tipo (.d.ts).                    |
| **noImplicitAny**     | Impede tipos `any` implícitos.                                  |
| **skipLibCheck**      | Ignora verificações de tipos em bibliotecas.                    |
| **moduleResolution**  | Define como os módulos são resolvidos (ex.: `node`, `classic`). |
| **resolveJsonModule** | Permite importar arquivos JSON diretamente.                     |
| **lib**               | Define bibliotecas padrão disponíveis (ex.: `DOM`, `ES2020`).   |
| **include**           | Especifica os arquivos incluídos na compilação.                 |
| **exclude**           | Especifica os arquivos excluídos da compilação.                 |
