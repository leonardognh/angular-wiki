---
sidebar_position: 14
---

# Bibliotecas Customizadas

## O que é?

Criar e publicar uma biblioteca no Angular permite compartilhar componentes, serviços ou utilitários reutilizáveis entre projetos ou até mesmo com a comunidade.

## Como Criar?

### Configurar o Workspace

Use o Angular CLI para criar um workspace monorepo com suporte a bibliotecas.

```bash
ng new my-workspace --create-application=false
cd my-workspace
```

### Criar a Biblioteca

```bash
ng generate library custom-lib
```

Isso cria uma pasta `projects/custom-lib` contendo os arquivos da biblioteca.

## Estrutura Básica da Biblioteca

A biblioteca gerada contém:

- `src/lib`: Código-fonte da biblioteca (componentes, serviços, etc.).
- `public-api.ts`: Arquivo que define os elementos exportados pela biblioteca.
- `package.json`: Informações de metadados da biblioteca.

### Adicionar um Componente

```tsx showLineNumbers title="lib/custom-button/custom-button.component.ts"
import { Component, Input } from "@angular/core";

@Component({
  selector: "lib-custom-button",
  template: `<button [style.background-color]="color">{{ label }}</button>`,
  styles: [
    `
      button {
        font-size: 16px;
        padding: 10px 20px;
      }
    `,
  ],
})
export class CustomButtonComponent {
  @Input() label: string = "Clique aqui";
  @Input() color: string = "blue";
}
```

Registrar no `public-api.ts`.

```tsx showLineNumbers
export * from "./lib/custom-button/custom-button.component";
```

## Testando a Biblioteca no Projeto

Para usar a biblioteca localmente antes de publicá-la.

```bash
ng build custom-lib
```

Instale a biblioteca compilada em outro projeto.

```bash
npm install dist/custom-lib
```

## Tornando a Biblioteca Customizável

Você pode usar Tokens de Injeção ou Inputs para permitir configurações.

```tsx showLineNumbers title="lib.ts"
import { InjectionToken } from "@angular/core";

export const LIB_CONFIG = new InjectionToken<LibConfig>("LIB_CONFIG");

export interface LibConfig {
  defaultColor: string;
}
```

```tsx showLineNumbers title="custom-button.service.ts"
import { Inject, Injectable } from "@angular/core";
import { LIB_CONFIG, LibConfig } from "./lib.config";

@Injectable({
  providedIn: "root",
})
export class CustomButtonService {
  constructor(@Inject(LIB_CONFIG) private config: LibConfig) {}

  getDefaultColor(): string {
    return this.config.defaultColor;
  }
}
```

```tsx showLineNumbers
providers: [{ provide: LIB_CONFIG, useValue: { defaultColor: "green" } }];
```

## Publicação no NPM

### Configurar o `package.json`

Atualize o `projects/custom-lib/package.json`.

```json showLineNumbers
{
  "name": "custom-lib",
  "version": "1.0.0",
  "author": "Seu Nome",
  "license": "MIT",
  "main": "bundles/custom-lib.umd.js",
  "module": "fesm2015/custom-lib.js",
  "es2015": "fesm2015/custom-lib.js",
  "typings": "custom-lib.d.ts",
  "peerDependencies": {
    "@angular/common": "^12.0.0",
    "@angular/core": "^12.0.0"
  }
}
```

### Compilar a Biblioteca

```bash
ng build custom-lib
```

### Publicar no NPM

```bash
npm login
```

```bash
cd dist/custom-lib
npm publish
```

## Usando a Biblioteca Publicada

Após publicada, você pode instalá-la em qualquer projeto Angular.

```bash
npm install custom-lib
```

```tsx showLineNumbers title="app.module.ts"
import { CustomLibraryModule } from "custom-lib";

@NgModule({
  imports: [CustomLibraryModule],
})
export class AppModule {}
```

```html showLineNumbers
<lib-custom-button label="Enviar" color="red"></lib-custom-button>
```

## Atualizando a Biblioteca

Ao fazer alterações na biblioteca.

Atualize a versão no `package.json` (ex.: 1.0.1).

```bash
npm publish
```

## Boas Práticas

- Documentação: Inclua instruções claras de uso `README.md`.
- Customização: Permita configurações globais e locais.
- Compatibilidade: Declare dependências no peerDependencies para evitar conflitos.
- Teste Localmente: Certifique-se de testar a biblioteca antes de publicá-la.
