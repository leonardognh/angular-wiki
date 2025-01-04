---
sidebar_position: 6
---

# WebPack

## O que é?

Webpack é um **module bundler** (empacotador de módulos) para JavaScript. Ele processa arquivos e dependências em uma aplicação, criando um ou mais pacotes (bundles) otimizados para o navegador. Suporta não apenas JavaScript, mas também CSS, imagens, fontes e outros recursos.

## Principais Recursos

- **Code Splitting:** Divide o código em partes menores, carregadas sob demanda.

- **Loaders:** Processa arquivos antes de adicioná-los ao bundle (ex.: CSS, TypeScript).

- **Plugins:** Estendem as funcionalidades do Webpack (ex.: minificação, cache).

- **Hot Module Replacement (HMR):** Atualiza partes do código sem recarregar toda a página.

## Como Funciona?

- **Entry (Entrada)**

  Define o arquivo inicial do aplicativo, como `index.js`.

- **Output (Saída)**

  Configura onde os arquivos empacotados serão gerados.

- **Loaders**

  Transformam outros tipos de arquivos (ex.: TypeScript → JavaScript, SCSS → CSS).

- **Plugins**

  Realizam tarefas como otimizações, injeção de variáveis ou criação de arquivos extras.

- **Mode (Modo)**

  Define o modo de execução:

- **Development**

  Gera arquivos não minificados com mensagens úteis para debug.

- **Production**

  Gera arquivos otimizados e minificados.

## Instalação

- **Instalar o Webpack e o Webpack CLI**

  ```bash
  npm install --save-dev webpack webpack-cli
  ```

- **Estrutura Inicial**

  ```
  projeto/
  ├── src/
  │   └── index.js
  ├── dist/
  ├── webpack.config.js
  ├── package.json
  └── node_modules/
  ```

## Configuração Básica do Webpack

- **Arquivo `webpack.config.js`**

  ```jsx
  const path = require("path");

  module.exports = {
    entry: "./src/index.js", // Arquivo de entrada
    output: {
      path: path.resolve(__dirname, "dist"), // Diretório de saída
      filename: "bundle.js", // Nome do bundle gerado
    },
    mode: "development", // Modo de desenvolvimento
  };
  ```

- **Script no `package.json`**

  ```json
  "scripts": {
    "build": "webpack"
  }
  ```

- **Comando para Build**

  ```bash
  npm run build
  ```

## Loaders

Loaders permitem que o Webpack processe arquivos que não sejam JavaScript, como CSS, imagens e fontes.

## Carregando CSS

- **Instale os loaders:**

  ```bash
  npm install --save-dev style-loader css-loader
  ```

- **Atualize `webpack.config.js`**

  ```jsx
  module.exports = {
    module: {
      rules: [
        {
          test: /\.css$/i, // Arquivos CSS
          use: ["style-loader", "css-loader"], // Aplica os loaders
        },
      ],
    },
  };
  ```

- **Use o CSS no seu projeto**

  ```jsx
  import "./styles.css";
  ```

## Plugins

Plugins adicionam funcionalidades extras ao Webpack, como geração de HTML ou minificação de arquivos.

## HTML Webpack Plugin

- **Instale o plugin**

  ```bash
  npm install --save-dev html-webpack-plugin
  ```

- **Atualize `webpack.config.js`**

  ```jsx
  const HtmlWebpackPlugin = require("html-webpack-plugin");

  module.exports = {
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html", // Arquivo HTML base
      }),
    ],
  };
  ```

Gera um arquivo `index.html` no diretório `dist`, com o bundle incluído automaticamente.

## Code Splitting

Divida o código em bundles menores para carregar partes da aplicação sob demanda.

## Hot Module Replacement (HMR)

Permite atualizar partes do código em tempo real, sem recarregar a página inteira.

### Configuração

- **Instale o Webpack Dev Server**

  ```bash
  npm install --save-dev webpack-dev-server
  ```

- **Atualize `webpack.config.js`**

  ```jsx
  module.exports = {
    devServer: {
      contentBase: "./dist",
      hot: true,
    },
  };
  ```

- **Adicione o script no `package.json`**

  ```json
  json
  Copiar código
  "scripts": {
    "start": "webpack serve"
  }
  ```

- **Comando para rodar**

  ```bash
  npm start
  ```

## Modos de Execução

- **Development**

  Inclui mapas de origem (source maps) para facilitar o debug.

  ```jsx
  mode: 'development',
  devtool: 'source-map',
  ```

- **Production**

  Gera arquivos otimizados e minificados.

  ```jsx
  mode: 'production',
  ```
