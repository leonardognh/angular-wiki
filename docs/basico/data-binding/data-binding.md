---
sidebar_position: 6
---

# Data Binding

# O que é?

Data Binding é a ligação entre a lógica do componente e a interface (template). Permite que dados fluam entre o componente e o template de forma automática e reativa.

- **Interpolação** `{{ }}`: Enviar dados do componente para o template.

- **Property Binding** `[ ]`: Ligar propriedades HTML ao componente.

- **Event Binding** `( )`: Capturar eventos do template no componente.

- **Two-Way Binding** `[( )]`: Sincronizar dados entre o componente e o template.

## Tipos de Data Binding

### Interpolação

Utilizada para exibir dados diretamente no template. Sintaxe: `{{ expressao }}`. Interpolação só funciona com valores em formato de string.

```tsx
export class AppComponent {
  titulo = "Data Binding com Angular!";
}
```

```html
<h1>{{ titulo }}</h1>
```

## Property Binding

Liga propriedades do DOM a valores no componente. Sintaxe: `[propriedade]="expressao"`. Property Binding permite atribuir valores não-string, como objetos.

```tsx
export class AppComponent {
  imagemUrl = "https://angular.io/assets/images/logos/angular/angular.png";
}
```

```html
<img [src]="imagemUrl" alt="Logo Angular" />
```

## Event Binding

Liga eventos do template a métodos do componente. Sintaxe: `(evento)="expressao"`.

```tsx
export class AppComponent {
  saudacao(): void {
    console.log("Olá, Angular!");
  }
}
```

```html
<button (click)="saudacao()">Clique aqui</button>
```

## Two-Way Binding

Sincroniza dados entre o template e o componente. Requer o uso da diretiva `[(ngModel)]`.

```tsx
export class AppComponent {
  nome = "";
}
```

```html
<input [(ngModel)]="nome" placeholder="Digite seu nome" />
<p>Olá, {{ nome }}!</p>
```

**Diferenças**

| Tipo de Binding      | Sintaxe         | Fluxo de Dados        | Uso Comum                         |
| -------------------- | --------------- | --------------------- | --------------------------------- |
| **Interpolação**     | `{{ valor }}`   | Componente → Template | Exibir texto, valores calculados. |
| **Property Binding** | `[propriedade]` | Componente → Template | Configurar atributos do DOM.      |
| **Event Binding**    | `(evento)`      | Template → Componente | Capturar eventos do usuário.      |
| **Two-Way Binding**  | `[(ngModel)]`   | Bidirecional          | Sincronizar campos de formulário. |

## Boas Práticas

- Evite lógica chamar funções no template.

- Use o `[(ngModel)]` com moderação, para formulários mais complexos, prefira o **Reactive Forms**.

- Evite misturar estilos de binding, escolha entre interpolação ou property binding para manter a consistência.
