---
sidebar_position: 20
---

# WebSocket

## O que é?

O **WebSocket** é um protocolo que permite comunicação bidirecional em tempo real entre cliente e servidor. Diferente do HTTP, o WebSocket mantém uma conexão aberta, permitindo a troca contínua de mensagens sem a necessidade de múltiplas requisições.

### Vantagens

- Comunicação em tempo real.
- Menor latência em comparação com polling ou long-polling.
- Economia de recursos, já que não precisa abrir e fechar conexões continuamente.

## WebSocket

Para integrar WebSocket no Angular, você pode usar a API nativa de WebSocket ou bibliotecas como **RxJS** para manipular os dados de forma reativa.

#### Serviço

```tsx
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class WebSocketService {
  private socket!: WebSocket;

  connect(url: string): void {
    this.socket = new WebSocket(url);

    this.socket.onopen = () => {
      console.log("Conexão aberta");
    };

    this.socket.onmessage = (event) => {
      console.log("Mensagem recebida:", event.data);
    };

    this.socket.onerror = (error) => {
      console.error("Erro no WebSocket:", error);
    };

    this.socket.onclose = () => {
      console.log("Conexão fechada");
    };
  }

  sendMessage(message: string): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(message);
    } else {
      console.error("WebSocket não está aberto!");
    }
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.close();
    }
  }
}
```

Consumindo no Componente

```tsx
import { Component, OnInit } from "@angular/core";
import { WebSocketService } from "./web-socket.service";

@Component({
  selector: "app-websocket",
  template: `
    <button (click)="connect()">Conectar</button>
    <button (click)="sendMessage()">Enviar Mensagem</button>
    <button (click)="disconnect()">Desconectar</button>
  `,
})
export class WebSocketComponent {
  constructor(private webSocketService: WebSocketService) {}

  connect() {
    this.webSocketService.connect("ws://localhost:8080");
  }

  sendMessage() {
    this.webSocketService.sendMessage("Olá do Angular!");
  }

  disconnect() {
    this.webSocketService.disconnect();
  }
}
```

## Usando RxJS para WebSocket

Com RxJS, podemos criar Observables para gerenciar mensagens recebidas e enviadas.

```tsx
import { Injectable } from "@angular/core";
import { Observable, Subject, webSocket } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class WebSocketRxService {
  private socket$: Subject<any> = webSocket("ws://localhost:8080");

  sendMessage(message: any): void {
    this.socket$.next(message);
  }

  getMessages(): Observable<any> {
    return this.socket$;
  }

  disconnect(): void {
    this.socket$.complete();
  }
}
```

Consumindo no Componente

```tsx
import { Component, OnInit } from "@angular/core";
import { WebSocketRxService } from "./web-socket-rx.service";

@Component({
  selector: "app-websocket-rx",
  template: `
    <ul>
      <li *ngFor="let message of messages">{{ message }}</li>
    </ul>
    <button (click)="sendMessage()">Enviar Mensagem</button>
  `,
})
export class WebSocketRxComponent implements OnInit {
  messages: any[] = [];

  constructor(private webSocketService: WebSocketRxService) {}

  ngOnInit(): void {
    this.webSocketService.getMessages().subscribe((message) => {
      this.messages.push(message);
    });
  }

  sendMessage(): void {
    this.webSocketService.sendMessage("Mensagem do Angular com RxJS!");
  }
}
```

## Exemplo de Backend Simples com Node.js

Crie um servidor WebSocket para testes usando ws.

### Instalação

```bash
npm install ws
```

### Servidor WebSocket

```jsx
const WebSocket = require("ws");
const server = new WebSocket.Server({ port: 8080 });

server.on("connection", (socket) => {
  console.log("Cliente conectado");

  socket.on("message", (message) => {
    console.log("Mensagem recebida:", message);
    socket.send(`Servidor recebeu: ${message}`);
  });

  socket.on("close", () => {
    console.log("Cliente desconectado");
  });
});
```

## Boas Práticas

- Gerenciamento de Reconexão: Implementar lógica para reconectar automaticamente em caso de desconexão.
- Manutenção de Conexões: Monitore o estado da conexão para evitar erros de envio.
- Segurança: Use WebSocket seguro (wss://) em produção e implemente autenticação.
- Compressão: Utilize a compactação de dados para reduzir o tráfego em redes lentas.
