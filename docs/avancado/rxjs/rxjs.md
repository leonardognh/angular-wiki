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

### Map

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

### Filter

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

### SwitchMap

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

### CombineLatest

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

### Merge

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
