---
sidebar_position: 1
---

# Observables

## O que é?

No Angular, Observables são uma forma de lidar com dados assíncronos. Eles fornecem um fluxo contínuo de informações, permitindo que você reaja a mudanças ou eventos ao longo do tempo. São amplamente usados no Angular para gerenciar operações como requisições HTTP, eventos de usuários e streams de dados em tempo real.

### Os Observables seguem o padrão Observer

- Um Observable é o produtor de dados.
- Um Observer é o consumidor desses dados.

### Como funcionam os Observables?

- Criação: Um Observable emite dados ao longo do tempo.
- Assinatura: O consumidor (Observer) se inscreve para receber esses dados.
- Notificação: Sempre que o Observable produz um novo valor, ele notifica o Observer.
- Encerramento: O Observable pode ser encerrado quando não há mais dados a emitir.

### Simulação de um Observable Simples

```tsx showLineNumbers title="custom-observable.ts"
class CustomObservable {
  constructor(private producer: (observer: any) => void) {}

  subscribe(observer: { next: (value: any) => void; complete?: () => void }) {
    this.producer(observer);
  }
}

// Criando um Observable que emite números de 1 a 5
const observable = new CustomObservable((observer) => {
  let count = 1;

  const interval = setInterval(() => {
    observer.next(count);
    count++;

    if (count > 5) {
      clearInterval(interval);
      if (observer.complete) observer.complete();
    }
  }, 1000);
});

// Consumindo o Observable
observable.subscribe({
  next: (value) => console.log("Valor recebido:", value),
  complete: () => console.log("Observable completo!"),
});
```

```plaintext
Valor recebido: 1
Valor recebido: 2
Valor recebido: 3
Valor recebido: 4
Valor recebido: 5
Observable completo!
```
