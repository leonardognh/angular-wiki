---
sidebar_position: 3
---

# Comunicação entre Componentes

## O que é?

A comunicação entre componentes é essencial para que os dados fluam de forma eficiente e organizada em uma aplicação. Isso pode ser feito de várias formas, dependendo do relacionamento entre os componentes: Pai-Filho, Filho-Pai, ou até mesmo entre componentes não relacionados.

## Cenários de Comunicação

- Pai para Filho: O componente pai envia dados para o filho.
- Filho para Pai: O componente filho emite eventos ou envia dados para o pai.
- Entre componentes irmãos ou não relacionados: Comunicação usando serviços compartilhados ou um gerenciador de estado.

### `@Input`

Permite passar dados do componente pai para o componente filho.

Usa **Property Binding** no template.

```tsx showLineNumbers title="filho.component.ts"
import { Component, Input } from "@angular/core";

@Component({
  selector: "app-filho",
  template: `<p>Mensagem do pai: {{ mensagem }}</p>`,
})
export class FilhoComponent {
  @Input() mensagem: string = "";
}
```

```html showLineNumbers title="pai.component.html"
<app-filho [mensagem]="'Olá, filho!'"></app-filho>
```

### `@Output`

Permite que o componente filho envie eventos ou dados para o componente pai.

Usa **Event Binding**.

```tsx showLineNumbers title="filho.component.ts"
import { Component, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-filho",
  template: `<button (click)="enviarMensagem()">Enviar</button>`,
})
export class FilhoComponent {
  @Output() mensagemEnviada = new EventEmitter<string>();

  enviarMensagem() {
    this.mensagemEnviada.emit("Olá, pai!");
  }
}
```

```html showLineNumbers title="pai.component.html"
<app-filho (mensagemEnviada)="receberMensagem($event)"></app-filho>
```

```tsx showLineNumbers title="pai.component.ts"
receberMensagem(mensagem: string) {
  console.log(mensagem);
}
```

## Ciclo de Detecção de Mudanças (Change Detection)

### Modos de Change Detection

- **Default**

  Verifica todas as mudanças em todos os componentes.

- **OnPush**

  Verifica mudanças apenas quando os inputs ou eventos do componente são alterados.

```tsx showLineNumbers title="filho.component.ts"
import { Component, ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: "app-filho",
  template: `{{ dado }}`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilhoComponent {
  @Input() dado!: string;
}
```

## Resumo

| Recurso          | Uso Principal                                                                          |
| ---------------- | -------------------------------------------------------------------------------------- |
| **`@Input`**     | Passar dados do componente pai para o filho.                                           |
| **`@Output`**    | Emitir eventos ou dados do componente filho para o pai.                                |
| Change Detection | Gerenciar quando e como as mudanças no componente devem ser detectadas e renderizadas. |
