---
sidebar_position: 2
---

# Primeros Passos

## O que é?

Angular é um framework front-end desenvolvido pelo Google para construir aplicações web dinâmicas e responsivas. Baseado em TypeScript, oferece ferramentas robustas para desenvolvimento de aplicações escaláveis. Focado em Single Page Applications (SPAs), proporcionando experiência de usuário fluida. Arquitetura baseada em componentes e módulos.

### Components

Os componentes no Angular são as unidades básicas para construir a interface do usuário. Cada componente é composto por uma classe TypeScript, que gerencia a lógica, um template HTML, que define a estrutura visual, e um arquivo de estilos (CSS/SCSS), que personaliza a aparência. Eles permitem criar interfaces modulares, reutilizáveis e organizadas.

### Template e Estilo

Todo componente possui um arquivo HTML que define o que será exibido na tela do navegador. Os arquivos de estilo (CSS/SCSS) permitem personalizar a aparência desse conteúdo, tornando-o visualmente agradável e adequado à aplicação.

### Módulo

Um módulo no Angular é uma estrutura que organiza o código de forma lógica e funcional. Ele agrupa componentes, serviços e outras funcionalidades relacionadas, facilitando a manutenção e o reuso do código. Cada módulo gerencia a importação de dependências necessárias para os componentes que ele declara.

## Histórico e Evolução

- Lançado em 2010 como AngularJS (versão 1.x).

- Reescrito em 2016 como Angular 2+.

- Angular 16+ inclui recursos modernos como Standalone Components e melhorias de desempenho.

## Configurando o Ambiente

Ferramentas necessárias:

- Node.js: Gerenciador de pacotes e servidor de desenvolvimento.

- Angular CLI: Interface de linha de comando para criar e gerenciar projetos.

### Passo a passo

1. Instalar [Node.js](https://nodejs.org/en/download).
2. Instalar Angular CLI:

   ```bash
   npm install -g @angular/cli
   ```

3. Criar um novo projeto:

   ```bash
   ng new meu-projeto
   cd meu-projeto
   ng serve
   ```

4. Acesse no navegador: `http://localhost:4200`.
