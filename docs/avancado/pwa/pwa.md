---
sidebar_position: 12
---

# PWA - Progressive Web Apps

## O que é?

- **Progressive Web Apps (PWAs)** são aplicações web que utilizam tecnologias modernas para oferecer experiência similar a aplicativos nativos.

### Fonte

Para saber mais, acesse [PWA](https://developer.mozilla.org/pt-BR/docs/Web/Progressive_web_apps).

## Características principais

- **Responsividade:** Funciona em diferentes dispositivos e tamanhos de tela.

- **Offline:** Acessível mesmo sem conexão com a internet.

- **Instalável:** Pode ser adicionada à tela inicial do dispositivo.

- **Desempenho Rápido:** Usa cache e otimizações para melhorar a velocidade.

## Adicionando PWA ao Angular

### Instalação

```bash
ng add @angular/pwa
```

Gera o arquivo `ngsw-config.json`.

Configura o `manifest.webmanifest`.

Adiciona um service worker.

### Estrutura Gerada

**Arquivos Relevantes**

```plaintext
src/
├── manifest.webmanifest  # Configurações do aplicativo
├── ngsw-config.json      # Configuração do Service Worker
```

### Configurar o Manifest

**Arquivo `manifest.webmanifest`**

Define como o aplicativo será exibido ao ser instalado.

```json
{
  "name": "Meu PWA",
  "short_name": "PWA",
  "theme_color": "#1976d2",
  "background_color": "#fafafa",
  "display": "standalone",
  "start_url": "/",
  "icons": [
    {
      "src": "assets/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "assets/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

### Configurar o Service Worker

**Arquivo `ngsw-config.json`**

Configura como os recursos são armazenados no cache.

```json
{
  "index": "/index.html",
  "assetGroups": [
    {
      "name": "app",
      "installMode": "prefetch",
      "resources": {
        "files": ["/favicon.ico", "/index.html"],
        "versionedFiles": ["/*.bundle.css", "/*.bundle.js"]
      }
    },
    {
      "name": "assets",
      "installMode": "lazy",
      "resources": {
        "files": ["/assets/**"]
      }
    }
  ]
}
```

**Modos de Cache**

- **`prefetch`:** Recursos são baixados durante a instalação.

- **`lazy`:** Recursos são baixados sob demanda.

### Build e Teste

Gere a build de produção

```bash
ng build --prod
```

Sirva os arquivos com um servidor que suporte HTTPS

```bash
npx http-server -p 8080 -c-1 dist/seu-projeto
```

## Funcionalidades Avançadas

### Atualização Automática

O service worker verifica automaticamente por atualizações.

Use o `SwUpdate` para detectar e aplicar atualizações

```tsx
import { SwUpdate } from "@angular/service-worker";
import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  template: `
    <button *ngIf="updateAvailable" (click)="atualizar()">Atualizar</button>
  `,
})
export class AppComponent {
  updateAvailable = false;

  constructor(private swUpdate: SwUpdate) {
    this.swUpdate.available.subscribe(() => {
      this.updateAvailable = true;
    });
  }

  atualizar() {
    this.swUpdate.activateUpdate().then(() => document.location.reload());
  }
}
```

### Modo Offline

A aplicação continua funcionando sem internet graças ao cache. Use as ferramentas de desenvolvedor do navegador:

Aba **Application** → **Service Workers**.

Simule o modo offline.

### Notificações em PWAs

### O que são Notificações em PWAs?

Notificações em PWAs permitem enviar mensagens para os usuários, mesmo quando a aplicação não está aberta.

Elas são gerenciadas pelo navegador usando a **Web Push API** e requerem um **Service Worker** para funcionar.

### Fluxo de Notificações Push

O servidor gera uma mensagem.

A mensagem é enviada para o navegador por meio de um serviço de push, como Firebase Cloud Messaging (FCM).

O navegador exibe a notificação usando o **Service Worker**.

### Permissões do Usuário

O navegador solicita permissão ao usuário para exibir notificações.

```tsx
Notification.requestPermission().then((status) => {
  if (status === "granted") {
    console.log("Permissão concedida!");
  } else {
    console.log("Permissão negada.");
  }
});
```

### Notificações

- Instalação: Firebase Cloud Messaging (opcional)

  ```bash
  npm install firebase @angular/fire --save
  ```

- Configure o Firebase no módulo principal

  ```tsx
  import { NgModule } from "@angular/core";
  import { provideFirebaseApp, initializeApp } from "@angular/fire/app";
  import { provideMessaging, getMessaging } from "@angular/fire/messaging";

  const firebaseConfig = {
    apiKey: "sua-api-key",
    authDomain: "seu-dominio.firebaseapp.com",
    projectId: "seu-projeto-id",
    messagingSenderId: "seu-sender-id",
    appId: "seu-app-id",
  };

  @NgModule({
    imports: [
      provideFirebaseApp(() => initializeApp(firebaseConfig)),
      provideMessaging(() => getMessaging()),
    ],
  })
  export class AppModule {}
  ```

### Criar e Registrar um Service Worker

**Service Worker `firebase-messaging-sw.js`**

```jsx
const firebaseConfig = {
  apiKey: "sua-api-key",
  authDomain: "seu-dominio.firebaseapp.com",
  projectId: "seu-projeto-id",
  messagingSenderId: "seu-sender-id",
  appId: "seu-app-id",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Mensagem recebida em segundo plano:", payload);
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: payload.notification.icon,
  });
});
```

Certifique-se de que o arquivo esteja no diretório `src/` ou seja servido pela aplicação.

### Registrar o Service Worker no Aplicativo

```tsx
navigator.serviceWorker
  .register("/firebase-messaging-sw.js")
  .then((registration) => {
    console.log("Service Worker registrado:", registration);
  });
```

### Enviando Notificações

- **Usando Firebase Cloud Messaging**

  Envie mensagens via painel do Firebase ou pela API REST do Firebase.

- **Exemplo de Envio Manual via API REST**

  ```plaintext
  curl -X POST -H "Authorization: key=SEU-SERVER-KEY" \
      -H "Content-Type: application/json" \
      -d '{
            "notification": {
              "title": "Olá, Mundo!",
              "body": "Esta é uma notificação de teste.",
              "icon": "https://seusite.com/icon.png"
            },
            "to": "SEU-TOKEN-DE-INSCRIÇÃO"
          }' \
      https://fcm.googleapis.com/fcm/send
  ```

### Personalizando Notificações

Use o `showNotification` no **Service Worker** para personalizar notificações.

```jsx
self.registration.showNotification("Título Personalizado", {
  body: "Esta é uma mensagem personalizada.",
  icon: "/assets/icon.png",
  vibrate: [200, 100, 200],
  data: { url: "https://seusite.com" },
  actions: [
    { action: "open", title: "Abrir Aplicação" },
    { action: "dismiss", title: "Fechar" },
  ],
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  if (event.action === "open") {
    clients.openWindow(event.notification.data.url);
  }
});
```

## Boas Práticas

### Adicione Feedback para Offline

Mostre mensagens para o usuário caso a internet esteja indisponível.

```tsx
window.addEventListener("offline", () => {
  alert("Você está offline.");
});
```

### Otimização de Recursos

Reduza o tamanho das imagens. Use fontes locais ou carregadas sob demanda.

### Teste de Compatibilidade

Use ferramentas como **Lighthouse** para validar a implementação da PWA.

### Notificações

- **Solicite Permissão com Moderação:**

  Peça permissão somente quando o usuário entender o motivo.

- **Evite Notificações Excessivas:**

  Envie notificações relevantes e em horários apropriados.

- **Teste em Múltiplos Dispositivos:**

  Certifique-se de que as notificações funcionem em diferentes navegadores e sistemas operacionais.

- **Aproveite Interatividade:**

  Adicione ações às notificações para melhorar a experiência do usuário.

## Diferença entre PWA e SPA

| **Aspecto**          | **PWA**                                  | **SPA**                                       |
| -------------------- | ---------------------------------------- | --------------------------------------------- |
| **Funciona Offline** | Sim, com cache e service workers.        | Não, requer conexão constante com o servidor. |
| **Instalável**       | Sim, pode ser adicionada à tela inicial. | Não.                                          |
| **Performance**      | Melhor com caching e otimizações.        | Depende da implementação.                     |

## Exemplos de Uso

- **E-commerce**

  Oferece experiência rápida e offline para usuários móveis.

- **Blogs e Portais de Notícias**

  Permite leitura offline de artigos.

- **Aplicativos de Serviço**

  Aplicações como entregas e reservas podem ser instaladas no dispositivo.

## Resumo

| **Recurso**        | **Descrição**                                                 |
| ------------------ | ------------------------------------------------------------- |
| **Manifest**       | Configura aparência e comportamento da PWA ao ser instalada.  |
| **Service Worker** | Gerencia cache, notificações push e atualizações automáticas. |
| **Offline**        | Garante funcionalidade sem conexão com a internet.            |
| **Notificação**    | Permita que o usuário seja notificado quando precisar.        |
| **Instalação**     | Permite adicionar à tela inicial como um aplicativo nativo.   |
| **Otimização**     | Reduz tamanho de recursos e melhora tempo de carregamento.    |
