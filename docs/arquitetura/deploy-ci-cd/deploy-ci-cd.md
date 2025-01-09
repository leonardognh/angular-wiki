---
sidebar_position: 7
---

# Deploy e CI/CD

## O que é ?

- **CI (Continuous Integration):**

Processo de integrar código continuamente ao repositório principal. Inclui testes automáticos e builds para validar o código.

- **CD (Continuous Deployment):**

Processo de implantar automaticamente as alterações aprovadas em ambientes de produção ou staging.

## Deploy de Aplicações

### Configurando o Build para Produção

Gere os arquivos otimizados para produção:

```bash
ng build --prod
```

Isso cria a pasta `dist/seu-projeto` com os arquivos minificados e otimizados.

### Servindo com um Servidor HTTP

- **Usando HTTP Server Localmente**

  ```bash
  npx http-server -p 8080 -c-1 dist/seu-projeto
  ```

- **Usando Nginx**

  **Arquivo de Configuração Básico (`/etc/nginx/sites-available/seu-projeto`):**

  ```plaintext
  server {
    listen 80;
    server_name exemplo.com;

    root /var/www/seu-projeto;
    index index.html;

    location / {
      try_files $uri /index.html;
    }
  }
  ```

- **Ativando a Configuração:**

  ```bash
  sudo ln -s /etc/nginx/sites-available/seu-projeto /etc/nginx/sites-enabled/
  sudo systemctl restart nginx
  ```

### Deploy em Provedores de Hospedagem

- **Firebase Hosting**

  Instale a CLI do Firebase

  ```bash
  npm install -g firebase-tools
  ```

  Inicialize o projeto

  ```bash
  firebase init hosting
  ```

  Faça o deploy

  ```bash
  firebase deploy
  ```

- **Vercel**

  Instale a CLI do Vercel

  ```bash
  npm install -g vercel
  ```

  Faça o deploy

  ```bash
  vercel
  ```

- **AWS S3 e CloudFront**

  Envie os arquivos para um bucket S3

  ```bash
  aws s3 sync dist/seu-projeto s3://seu-bucket
  ```

  Configure o CloudFront para servir os arquivos.

- **Docker**

  Crie um Dockerfile

  ```yml showLineNumbers
  FROM nginx:alpine
  COPY dist/seu-projeto /usr/share/nginx/html
  ```

  Construa e execute a imagem

  ```plaintext
  docker build -t angular-app .
  docker run -p 8080:80 angular-app
  ```

## Configurando CI/CD

### Usando GitHub Actions

- **Configuração Básica**

  Crie o arquivo `.github/workflows/deploy.yml`

  ```yml showLineNumbers
  name: Build and Deploy Angular

  on:
    push:
      branches:
        - main

  jobs:
    build:
      runs-on: ubuntu-latest

      steps:
        - name: Checkout code
          uses: actions/checkout@v3

        - name: Set up Node.js
          uses: actions/setup-node@v3
          with:
            node-version: "16"

        - name: Install dependencies
          run: npm install

        - name: Build Angular app
          run: npm run build -- --prod

        - name: Deploy to Firebase
          uses: w9jds/firebase-action@v2.3.0
          with:
            args: deploy
          env:
            FIREBASE_TOKEN: ${{ secrets.FIREBASE_TOKEN }}
  ```

  **Configurar o Token do Firebase**

  Gere o token

  ```bash
  firebase login:ci
  ```

  Adicione como segredo no repositório (`FIREBASE_TOKEN`).

### Usando GitLab CI/CD

- **Configuração Básica**

  Crie o arquivo `.gitlab-ci.yml`

  ```yml showLineNumbers
  stages:
    - build
    - deploy

  build:
    image: node:16
    stage: build
    script:
      - npm install
      - npm run build -- --prod
    artifacts:
      paths:
        - dist/

  deploy:
    image: node:16
    stage: deploy
    script:
      - npm install -g firebase-tools
      - firebase deploy --token $FIREBASE_TOKEN
    only:
      - main
  ```

  **Configurar o Token do Firebase:**

  Adicione o token no GitLab como variável de ambiente (`FIREBASE_TOKEN`).

### Usando Jenkins

- **Pipeline Básico**

  No arquivo `Jenkinsfile`

  ```groovy showLineNumbers
  pipeline {
    agent any

    stages {
      stage('Install dependencies') {
        steps {
          sh 'npm install'
        }
      }
      stage('Build Angular App') {
        steps {
          sh 'npm run build -- --prod'
        }
      }
      stage('Deploy') {
        steps {
          sh 'firebase deploy --token $FIREBASE_TOKEN'
        }
      }
    }
  }
  ```

  **Configurar Variáveis de Ambiente**

  Adicione o `FIREBASE_TOKEN` nas configurações do pipeline.

## Boas Práticas

- **Automatize Testes**

  Sempre execute testes unitários e de integração antes de realizar o deploy.

- **Configuração de Ambiente**

  Use arquivos de configuração para diferenciar ambientes (`environment.prod.ts`, `environment.dev.ts`).

- **Monitoramento**

  Configure ferramentas de monitoramento (ex.: Sentry ou Datadog) para capturar erros em produção.

- **Rollback**

  Mantenha a capacidade de reverter rapidamente para uma versão estável.

- **Documentação do Pipeline**

  Documente claramente as etapas do CI/CD para facilitar a manutenção.
