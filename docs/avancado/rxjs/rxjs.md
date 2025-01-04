---
sidebar_position: 2
---

# RxJS

## O que é?

O RxJS (Reactive Extensions for JavaScript) é uma biblioteca poderosa usada no Angular para lidar com programação reativa. Ele é a base para o sistema de Observables no Angular, oferecendo uma ampla gama de operadores para manipular fluxos de dados assíncronos de maneira eficiente.

## Principais Recursos do RxJS

- Observables: Representam um fluxo de dados assíncronos.
- Subjects: Observables que também podem emitir valores.
- Operadores: Transformam, combinam ou filtram os fluxos de dados.

## Tipos de Subjects no RxJS

### Subject

O Subject é um Observable que permite emitir valores manualmente e compartilhar o fluxo de dados com múltiplos Observers.

```tsx
import { Subject } from "rxjs";

// Serviço compartilhado
@Injectable({ providedIn: "root" })
export class CommunicationService {
  private evento = new Subject<string>();

  evento$ = this.evento.asObservable();

  emitirEvento(valor: string) {
    this.evento.next(valor);
  }
}
```

```tsx
// Componente Emissor
@Component({
  selector: "app-emissor",
  template: `<button (click)="emitir()">Emitir Evento</button>`,
})
export class EmissorComponent {
  constructor(private communicationService: CommunicationService) {}

  emitir() {
    this.communicationService.emitirEvento("Evento emitido!");
  }
}
```

```tsx
// Componente Receptor
@Component({
  selector: "app-receptor",
  template: `<p>{{ mensagem }}</p>`,
})
export class ReceptorComponent implements OnInit {
  mensagem: string = "";

  constructor(private communicationService: CommunicationService) {}

  ngOnInit() {
    this.communicationService.evento$.subscribe((valor) => {
      this.mensagem = valor;
    });
  }
}
```

### BehaviorSubject

O BehaviorSubject armazena o último valor emitido e o entrega imediatamente para novos Observers.

```tsx
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: "root" })
export class EstadoService {
  private estado = new BehaviorSubject<string>("Inicial");
  estado$ = this.estado.asObservable();

  atualizarEstado(novoEstado: string) {
    this.estado.next(novoEstado);
  }
}
```

```tsx
// Consumindo no Componente
@Component({
  selector: "app-estado",
  template: `<div>Estado Atual: {{ estado }}</div>`,
})
export class EstadoComponent implements OnInit {
  estado: string = "";

  constructor(private estadoService: EstadoService) {}

  ngOnInit() {
    this.estadoService.estado$.subscribe((estado) => (this.estado = estado));
  }

  alterarEstado() {
    this.estadoService.atualizarEstado("Atualizado");
  }
}
```

### ReplaySubject

O ReplaySubject armazena múltiplos valores emitidos e os entrega para novos Observers, baseado em uma configuração de "buffer".

```tsx
import { ReplaySubject } from "rxjs";

const replaySubject = new ReplaySubject<string>(3); // Armazena os últimos 3 valores

replaySubject.next("Evento 1");
replaySubject.next("Evento 2");
replaySubject.next("Evento 3");
replaySubject.next("Evento 4"); // "Evento 1" será descartado

replaySubject.subscribe((valor) => console.log("Observer:", valor));
```

```plaintext
Observer: Evento 2
Observer: Evento 3
Observer: Evento 4
```

### AsyncSubject

O AsyncSubject emite apenas o último valor produzido, mas somente após o Observable ser completado.

```tsx
import { AsyncSubject } from "rxjs";

const asyncSubject = new AsyncSubject<string>();

asyncSubject.subscribe((valor) => console.log("Observer:", valor));

asyncSubject.next("Valor 1");
asyncSubject.next("Valor 2");

asyncSubject.complete(); // Somente agora o último valor será emitido
```

```plaintext
Observer: Valor 2
```

## Operadores Mais Utilizados no RxJS

Os operadores são métodos que permitem transformar, filtrar ou combinar fluxos de dados.

### of

O of é um operador do RxJS que cria um Observable síncrono a partir de uma lista de valores ou argumentos. Ele emite cada valor sequencialmente e, após emitir todos os valores, completa automaticamente o Observable.

É frequentemente usado para criar fluxos de dados rapidamente para testes, simular chamadas assíncronas em cenários de desenvolvimento e emissão de valores estáticos ou imediatos.

- Síncrono: Os valores são emitidos imediatamente após a assinatura.
- Completa automaticamente: Após emitir os valores fornecidos, ele finaliza o Observable.
- Flexível: Aceita valores de qualquer tipo (números, strings, objetos, arrays, etc.).

```tsx
import { of } from "rxjs";

const observable = of([1, 2, 3]);

observable.subscribe({
  next: (valor) => console.log("Valor emitido:", valor),
  complete: () => console.log("Observable completo!"),
});
```

```plaintext
Valor emitido: [1, 2, 3]
Observable completo!
```

### from

O operador from no RxJS é usado para criar um Observable a partir de diferentes tipos de fontes de dados, como:

- Arrays
- Promises
- Iteráveis
- Objetos Observable-like

Ele emite os valores individualmente, um de cada vez, e completa automaticamente após emitir todos os valores.

- Emissão individual: Cada item de uma coleção (como um array) é emitido como um valor separado.
- Completa automaticamente: Após emitir todos os valores, o Observable é completado.
- Flexível: Pode ser usado com arrays, promessas, strings, iteráveis ou Observables existentes.

```tsx
import { from } from "rxjs";

const observable = from([10, 20, 30]);

observable.subscribe({
  next: (valor) => console.log("Valor emitido:", valor),
  complete: () => console.log("Observable completo!"),
});
```

```plaintext
Valor emitido: 1
Valor emitido: 2
Valor emitido: 3
Observable completo!
```

### from vs of

- `from`: Converte arrays, promessas ou iteráveis em Observables, emitindo um valor por vez.
- `of`: Cria um Observable que emite o valor completo como um único evento.

```tsx
import { of, from } from "rxjs";

// 'of' trata o array como um único valor
of([1, 2, 3]).subscribe((valor) => console.log("of:", valor));

// 'from' emite cada valor do array separadamente
from([1, 2, 3]).subscribe((valor) => console.log("from:", valor));
```

```plaintext
of: [1, 2, 3]
from: 1
from: 2
from: 3
```

**Resumo**

| **Característica** | **`from`**                            | **`of`**                                |
| ------------------ | ------------------------------------- | --------------------------------------- |
| **Entrada**        | Arrays, Promises, Strings, Iteráveis. | Valores individuais ou arrays inteiros. |
| **Comportamento**  | Emite cada item individualmente.      | Emite o valor como está.                |
| **Uso Principal**  | Converter coleções em Observables.    | Criar Observables rápidos e estáticos.  |

### map

Transforma os valores emitidos.

```tsx
import { of } from "rxjs";
import { map } from "rxjs/operators";

of(1, 2, 3)
  .pipe(map((valor) => valor * 2))
  .subscribe((resultado) => console.log(resultado));
```

```plaintext
2, 4, 6
```

### filter

Filtra os valores emitidos.

```tsx
import { of } from "rxjs";
import { filter } from "rxjs/operators";

of(1, 2, 3, 4)
  .pipe(filter((valor) => valor % 2 === 0))
  .subscribe((resultado) => console.log(resultado));
```

```plaintext
2, 4
```

### switchMap

Troca o Observable atual por um novo.

```tsx
import { of } from "rxjs";
import { switchMap } from "rxjs/operators";

of("Angular", "RxJS")
  .pipe(switchMap((valor) => of(`${valor} é incrível!`)))
  .subscribe((resultado) => console.log(resultado));
```

```plaintext
Angular é incrível!
RxJS é incrível!
```

### combineLatest

Combina os valores de múltiplos Observables.

```tsx
import { combineLatest, of } from "rxjs";

const obs1 = of("A", "B");
const obs2 = of(1, 2, 3);

combineLatest([obs1, obs2]).subscribe(([letra, numero]) => {
  console.log(`${letra}${numero}`);
});
```

```plaintext
B3
```

### merge

Combina múltiplos Observables e emite seus valores conforme eles chegam.

```tsx
import { merge, of } from "rxjs";

const obs1 = of("A");
const obs2 = of("B", "C");

merge(obs1, obs2).subscribe((valor) => console.log(valor));
```

```plaintext
  A
  B
  C
```

### Resumo

- **Tipos de Subjects**

| **Tipo**            | **Uso Principal**                                              |
| ------------------- | -------------------------------------------------------------- |
| **Subject**         | Comunicação entre componentes ou eventos manuais.              |
| **BehaviorSubject** | Compartilhar estado com Observers.                             |
| **ReplaySubject**   | Reproduzir valores anteriores para novos Observers.            |
| **AsyncSubject**    | Emitir apenas o último valor após o Observable ser completado. |

- **Operadores do RxJS**

| **Operador**      | **Função**                                  |
| ----------------- | ------------------------------------------- |
| **map**           | Transforma os valores emitidos.             |
| **filter**        | Filtra valores com base em uma condição.    |
| **switchMap**     | Troca o Observable atual por um novo.       |
| **combineLatest** | Combina valores de múltiplos Observables.   |
| **merge**         | Combina Observables e emite valores juntos. |
