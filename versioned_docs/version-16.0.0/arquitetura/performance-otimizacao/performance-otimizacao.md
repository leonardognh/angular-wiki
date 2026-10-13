---
sidebar_position: 6
---

# Performance e Otimização

## O que é o arquivo `angular.json`?

O `angular.json` é o arquivo de configuração principal de um projeto Angular. Define como a aplicação deve ser construída, testada, servida e implantada. Permite configurar otimizações para melhorar o desempenho em produção.

## Estrutura Básica do `angular.json`

```json showLineNumbers title="angular.json"
{
  "version": 1,
  "projects": {
    "meu-app": {
      "projectType": "application",
      "root": "",
      "sourceRoot": "src",
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:browser",
          "options": {
            "outputPath": "dist/meu-app",
            "index": "src/index.html",
            "main": "src/main.ts",
            "polyfills": "src/polyfills.ts",
            "tsConfig": "tsconfig.app.json",
            "assets": ["src/favicon.ico", "src/assets"],
            "styles": ["src/styles.css"],
            "scripts": []
          },
          "configurations": {
            "production": {
              "optimization": true,
              "outputHashing": "all",
              "sourceMap": false,
              "extractCss": true,
              "namedChunks": false,
              "aot": true,
              "buildOptimizer": true
            },
            "development": {
              "optimization": false,
              "sourceMap": true,
              "extractCss": false
            }
          }
        }
      }
    }
  }
}
```

## Configurações Importantes para Performance

### `optimization`

Habilita otimizações no bundle final, como minificação e remoção de código morto.

```json showLineNumbers
"optimization": true
```

### `outputHashing`

Adiciona hashes aos nomes dos arquivos para garantir o cache busting.

**Valores:**

`none`: Sem hashes.

`all`: Adiciona hashes a todos os arquivos.

```json showLineNumbers
"outputHashing": "all"
```

### `sourceMap`

Gera mapas de origem para debug.

Deve ser desabilitado em produção para reduzir o tamanho do bundle.

```json showLineNumbers
"sourceMap": false
```

### `extractCss`

Extrai CSS para arquivos separados, melhorando o carregamento inicial.

```json showLineNumbers
"extractCss": true
```

### `aot` (Ahead-of-Time Compilation)

Compila os templates Angular no momento do build, melhorando o desempenho em tempo de execução.

```json showLineNumbers
"aot": true
```

### `buildOptimizer`

Remove código desnecessário das bibliotecas Angular.

```json showLineNumbers
"buildOptimizer": true
```

### `namedChunks`

Desativa nomes descritivos para os chunks, reduzindo o tamanho final.

```json showLineNumbers
"namedChunks": false
```

### Otimizações no `angular.json` para Produção

**Configuração Padrão**

```json showLineNumbers title="angular.json"
"production": {
  "optimization": true,
  "outputHashing": "all",
  "sourceMap": false,
  "extractCss": true,
  "namedChunks": false,
  "aot": true,
  "buildOptimizer": true
}
```

## Configurações para Diferentes Ambientes

### Desenvolvimento

Código não otimizado. Geração de source maps para debug. Build mais rápido.

```json showLineNumbers
"development": {
  "optimization": false,
  "sourceMap": true,
  "extractCss": false
}
```

### Produção

Código otimizado. Arquivos menores. Melhor desempenho em tempo de execução.

```json showLineNumbers
"production": {
  "optimization": true,
  "outputHashing": "all",
  "sourceMap": false,
  "extractCss": true,
  "namedChunks": false,
  "aot": true,
  "buildOptimizer": true
}
```

## Melhorando a Performance no Angular

### Preloading Strategy

Pré-carrega módulos em segundo plano após a inicialização.

```tsx showLineNumbers title="app.module.ts"
RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules });
```

### Tree Shaking

Remove código não utilizado do bundle final.

**Habilitado por padrão no Webpack e Angular CLI.**

### Uso de `ChangeDetectionStrategy.OnPush`

Melhora a performance, verificando mudanças apenas quando as entradas do componente são alteradas.

```tsx showLineNumbers title="example.component.ts"
@Component({
  selector: "app-example",
  template: `<p>{{ data }}</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleComponent {
  @Input() data: string = "";
}
```

### Reduzir Polyfills

Remova polyfills desnecessários, especialmente para navegadores modernos.

```tsx title="polyfills.ts"
// Remova ou comente os polyfills não utilizados.
```

### Compressão GZIP

Ative a compressão no servidor para reduzir o tamanho dos arquivos transferidos.

**Exemplo no Nginx:**

```plaintext
gzip on;
gzip_types text/plain text/css application/json application/javascript;
```

## Melhorando o Tempo de Carregamento

### Minificação e Compactação

Reduz o tamanho dos arquivos removendo espaços, comentários e outros caracteres desnecessários. Compressão GZIP ou Brotli para transferir arquivos menores.

**Como Implementar**

Já é configurado por padrão no Angular em builds de produção. Verifique o servidor (ex.: Nginx ou Apache) para garantir compressão:

```plaintext
gzip on;
gzip_types text/plain text/css application/json application/javascript;
```

### Bundle Optimization

Reduz o tamanho dos pacotes JavaScript gerados. Remove código morto (dead code) e realiza tree-shaking.

**Como Configurar**

Certifique-se de que o `optimization` esteja habilitado no `angular.json`:

```json showLineNumbers title="angular.json"
"optimization": true,
"buildOptimizer": true
```

### Utilizar Content Delivery Network (CDN)

Uma CDN armazena recursos estáticos (ex.: imagens, fontes, scripts) em servidores distribuídos. Melhora o tempo de carregamento para usuários geograficamente distantes. Configure fontes e bibliotecas externas em uma CDN

```html showLineNumbers
<link
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
  rel="stylesheet"
/>
```

## Carregamento Sob Demanda

### Lazy Loading de Módulos

Carrega módulos apenas quando necessários.

```tsx showLineNumbers title="app-routing.module.ts"
const routes: Routes = [
  {
    path: "dashboard",
    loadChildren: () =>
      import("./dashboard/dashboard.module").then((m) => m.DashboardModule),
  },
];
```

### Preloading Strategy

Pré-carrega módulos em segundo plano após a inicialização.

```tsx showLineNumbers title="app.module.ts"
RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules });
```

Crie uma estratégia de preloading customizada

```tsx showLineNumbers
export class CustomPreloadingStrategy implements PreloadingStrategy {
  preload(route: Route, load: Function): Observable<any> {
    return route.data?.preload ? load() : of(null);
  }
}
```

## Gerenciamento de Recursos

### Uso de `OnPush` no Change Detection

Evita verificações de mudanças desnecessárias. Atualiza a view apenas quando as entradas (`@Input`) mudam.

```tsx showLineNumbers title="example.component.ts"
@Component({
  selector: "app-example",
  template: `<p>{{ valor }}</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleComponent {
  @Input() valor!: string;
}
```

### TrackBy em Listas

O `trackBy` ajuda o Angular a identificar quais itens mudaram em uma lista. Evita recriação de elementos DOM desnecessários.

```html showLineNumbers
<ul>
  <li *ngFor="let item of itens; trackBy: item.id">{{ item.nome }}</li>
</ul>
```

## Otimização de Imagens

### Formatos Modernos

Use formatos modernos como **WebP** para reduzir o tamanho das imagens.

```html showLineNumbers
<img src="imagem.webp" alt="Descrição" />
```

### Lazy Loading de Imagens

Adie o carregamento de imagens fora da área visível.

```html showLineNumbers
<img src="imagem.jpg" loading="lazy" alt="Descrição" />
```

## Otimização de CSS

### PurgeCSS

Remove classes CSS não utilizadas no projeto.

- Instale o PurgeCSS

  ```bash
  npm install purgecss-webpack-plugin glob-all --save-dev
  ```

- Configure no Webpack

  ```jsx showLineNumbers
  const PurgeCSSPlugin = require("purgecss-webpack-plugin");
  module.exports = {
    plugins: [
      new PurgeCSSPlugin({
        paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
      }),
    ],
  };
  ```

## Performance no Desenvolvimento

### Habilitar Source Maps Apenas para Desenvolvimento

Source maps ajudam no debug, mas aumentam o tamanho do bundle.

```json showLineNumbers
"sourceMap": {
  "scripts": true,
  "styles": false,
  "vendor": false
}
```

### Configuração de Hot Module Replacement (HMR)

Atualiza módulos sem recarregar toda a aplicação.

```bash
ng serve --hmr
```

## Redução de JavaScript

### Splitting de Chunks

Divide o código em partes menores para carregar sob demanda.

```json showLineNumbers
"optimization": {
  "splitChunks": {
    "chunks": "all"
  }
}
```

## Ferramentas para Análise de Performance

### Angular CLI Bundle Analyzer

Analisa os bundles gerados para identificar dependências grandes.

```bash
npm install --save-dev source-map-explorer
```

```bash
ng build --prod --stats-json
npx source-map-explorer dist/main.*.js
```

## Lighthouse

Ferramenta do Google para auditar a performance, SEO e acessibilidade. Execute no Chrome DevTools (Aba Lighthouse).
