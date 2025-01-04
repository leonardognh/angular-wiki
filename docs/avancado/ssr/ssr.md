---
sidebar_position: 11
---

# Angular Universal (SSR)

## O que é?

Angular Universal é uma tecnologia para renderizar aplicações Angular no servidor (SSR - Server-Side Rendering). Gera HTML no servidor antes de enviá-lo para o navegador, melhorando desempenho e SEO.

**Vantagens**

- **Melhoria no SEO:** Motores de busca podem indexar conteúdo renderizado.

- **Desempenho Inicial:** Reduz o tempo de carregamento percebido.

- **Suporte para dispositivos lentos:** Dispositivos com pouca capacidade de processamento renderizam mais rápido.

### Fonte

Para saber mais, acesse [SSR](https://angular.dev/guide/ssr).

## Como o SSR Funciona?

O servidor processa as rotas e gera o HTML inicial com o conteúdo renderizado. O navegador recebe o HTML e exibe o conteúdo rapidamente. O Angular "hidrata" o aplicativo no lado do cliente, ativando interatividade.

## Configuração

### Instalação

```bash
ng add @nguniversal/express-engine
```

O comando cria uma aplicação SSR com um servidor Node.js usando **Express**.

- `server.ts`: Configuração do servidor.

- Configurações no `angular.json` e `package.json`.

### Estrutura Gerada

```
meu-projeto/
├── server.ts                # Configuração do servidor
├── angular.json             # Configuração para builds SSR
├── package.json             # Dependências do servidor SSR
├── src/
│   ├── main.server.ts       # Entrada principal para o lado do servidor
│   ├── app/
│   │   └── app.module.ts    # Configuração do AppModule
```

### Configurar o Servidor

**server.ts (configuração básica)**

```tsx
import "zone.js/node";
import { ngExpressEngine } from "@nguniversal/express-engine";
import * as express from "express";
import { join } from "path";

const app = express();
const DIST_FOLDER = join(process.cwd(), "dist/meu-projeto/browser");

// Configuração do Express
app.engine("html", ngExpressEngine({ bootstrap: AppServerModule }));
app.set("view engine", "html");
app.set("views", DIST_FOLDER);

app.get("*.*", express.static(DIST_FOLDER));
app.get("*", (req, res) => {
  res.render("index", { req });
});

app.listen(4000, () => {
  console.log("Servidor rodando em http://localhost:4000");
});
```

### Build e Execução

- **Build SSR**

  ```bash
  npm run build:ssr
  ```

- **Executar o Servido**

  ```bash
  npm run serve:ssr
  ```

### Configuração no angular.json

- **Configuração para SSR**

  Adiciona um `builder` específico para SSR no `angular.json`.

  ```json
  "server": {
    "builder": "@angular-devkit/build-angular:server",
    "options": {
      "outputPath": "dist/meu-projeto/server",
      "main": "src/main.server.ts",
      "tsConfig": "tsconfig.server.json"
    }
  }
  ```

## Exemplos Práticos

### Renderizar Dados no Servidor

No `AppComponent`

```tsx
import { Component, Inject, PLATFORM_ID } from "@angular/core";
import { isPlatformServer } from "@angular/common";

@Component({
  selector: "app-root",
  template: `
    <h1>Bem-vindo ao Angular Universal</h1>
    <p>Plataforma: {{ plataforma }}</p>
  `,
})
export class AppComponent {
  plataforma: string;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.plataforma = isPlatformServer(platformId) ? "Servidor" : "Cliente";
  }
}
```

### Manipulação de Metadados para SEO

Usar o `Meta` e o `Title` para manipular metadados.

```tsx
import { Component } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";

@Component({
  selector: "app-root",
  template: `<h1>Angular Universal</h1>`,
})
export class AppComponent {
  constructor(private meta: Meta, private title: Title) {
    this.title.setTitle("Página Inicial - Angular Universal");
    this.meta.addTags([
      { name: "description", content: "Descrição da aplicação" },
      { name: "keywords", content: "Angular, Universal, SSR" },
    ]);
  }
}
```

## Boas Práticas

- **Evite APIs Exclusivas do Navegador no SSR**

  Evite usar `window`, `document` ou `localStorage` diretamente. Use verificações de plataforma com `isPlatformBrowser` e `isPlatformServer`.

- **Use Transferência de Estado**

  Transfira dados do servidor para o cliente para evitar reprocessamentos.

  ```tsx
  import { TransferState, makeStateKey } from '@angular/platform-browser';

  const DADOS_KEY = makeStateKey<string>('dados');

  constructor(private state: TransferState) {
    if (this.state.hasKey(DADOS_KEY)) {
      const dados = this.state.get(DADOS_KEY, '');
      console.log(dados);
    }
  }
  ```

- **Teste Localmente**

  Certifique-se de que a aplicação funcione corretamente no cliente e no servidor.

- **Monitoramento de Performance**

  Use ferramentas como Lighthouse para avaliar o impacto do SSR.

### Diferença Entre SSR e CSR

| **Aspecto**            | **SSR (Server-Side Rendering)**      | **CSR (Client-Side Rendering)**             |
| ---------------------- | ------------------------------------ | ------------------------------------------- |
| **SEO**                | Melhor para SEO.                     | Motores de busca podem ter dificuldades.    |
| **Desempenho Inicial** | Conteúdo visível mais rápido.        | Requer carregamento completo do JavaScript. |
| **Carga no Servidor**  | Processamento adicional no servidor. | Processamento ocorre no navegador.          |

## Casos de Uso para SSR

- **SEO:** Blogs, e-commerce, ou portais de notícias.

- **Carregamento Rápido:** Sites voltados para usuários móveis com conexões lentas.

- **Aplicações Multilíngues:** Renderização dinâmica de metadados e conteúdo traduzido.
