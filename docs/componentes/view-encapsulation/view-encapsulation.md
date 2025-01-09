---
sidebar_position: 2
---

# View Encapsulation

## O que é?

O View Encapsulation é o mecanismo que controla como os estilos (CSS/SCSS) de um componente são aplicados ao HTML do componente e como eles afetam outros componentes. Ele garante que os estilos de um componente não interfiram nos estilos de outros, mantendo uma separação clara.

## Por que é importante?

### Isolamento de estilos

- Evita conflitos de CSS entre componentes.
- Garante que cada componente tenha seus próprios estilos.

### Modularidade e reutilização

- Facilita o desenvolvimento de componentes reutilizáveis, sem a preocupação de sobrescrever ou ser sobrescrito por outros estilos.

### Manutenção

- Mantém os estilos organizados e específicos para cada componente, tornando o código mais legível e fácil de manter.

## Tipos de View Encapsulation

<details>
  <summary>Emulated</summary>

Como funciona?

- Os estilos do componente são aplicados apenas ao próprio componente.
- O Angular adiciona atributos únicos ao HTML e CSS do componente para simular o Shadow DOM.

Vantagens

- Compatível com navegadores mais antigos.
- Isolamento de estilo sem a necessidade de Shadow DOM.

Desvantagens

- Os estilos são visíveis no DOM, embora sejam específicos.

```tsx showLineNumbers
@Component({
  selector: "app-exemplo",
  template: `<h1>Estilo isolado</h1>`,
  styles: [
    `
      h1 {
        color: red;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.Emulated,
})
export class ExemploComponent {}
```

HTML Renderizado

```html showLineNumbers
<h1 _ngcontent-abc123="">Estilo isolado</h1>
<style>
  h1[_ngcontent-abc123] {
    color: red;
  }
</style>
```

</details>

<details>
  <summary>ShadowDom</summary>

Como funciona?

- Utiliza o Shadow DOM nativo do navegador.
- Os estilos são totalmente isolados e aplicados apenas ao conteúdo dentro do Shadow DOM.

Vantagens

- Melhor isolamento de estilos, garantindo que eles não vazem para outros componentes.

Desvantagens

- Nem todos os navegadores mais antigos suportam o Shadow DOM.

```tsx showLineNumbers
@Component({
  selector: "app-exemplo",
  template: `<h1>Shadow DOM</h1>`,
  styles: [
    `
      h1 {
        color: blue;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class ExemploComponent {}
```

HTML Renderizado

```html
<app-exemplo>
  #shadow-root
  <h1>Shadow DOM</h1>
  <style>
    h1 {
      color: blue;
    }
  </style>
</app-exemplo>
```

</details>

<details>
  <summary>None</summary>

Como funciona?

- Nenhum encapsulamento é aplicado.
- Os estilos são globais e afetam todo o DOM.

Vantagens

- Útil em situações onde os estilos precisam ser globais.

Desvantagens

- Pode causar conflitos de estilos entre componentes.

```tsx showLineNumbers
@Component({
  selector: "app-exemplo",
  template: ` <h1>Sem isolamento</h1> `,
  styles: [
    `
      h1 {
        color: green;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class ExemploComponent {}
```

HTML Renderizado

```html showLineNumbers
<h1>Sem isolamento</h1>
<style>
  h1 {
    color: green;
  }
</style>
```

</details>

## Quando usar cada tipo?

| **Tipo**  | **Use quando...**                                                                             |
| --------- | --------------------------------------------------------------------------------------------- |
| Emulated  | Você quer o isolamento padrão, sem depender de Shadow DOM (opção mais comum).                 |
| ShadowDom | Precisa de isolamento total dos estilos e pode garantir suporte em navegadores modernos.      |
| None      | Os estilos precisam ser globais ou você deseja compartilhar estilos entre vários componentes. |

## Exemplo Prático

Imagine que você tem dois componentes: Pai e Filho.

- Estilo no componente pai:

```tsx showLineNumbers
@Component({
  selector: "app-pai",
  template: `<h1>Componente Pai</h1>
    <app-filho></app-filho>`,
  styles: [
    `
      h1 {
        color: red;
      }
    `,
  ],
})
export class PaiComponent {}
```

- Estilo no componente filho:

```tsx showLineNumbers
@Component({
  selector: "app-filho",
  template: `<h1>Componente Filho</h1>`,
  styles: [
    `
      h1 {
        color: blue;
      }
    `,
  ],
})
export class FilhoComponent {}
```

- Resultados com diferentes encapsulamentos no Filho

  - Emulated

    Estilos do Pai não afetam o Filho.
    Estilos do Filho são aplicados apenas ao seu próprio HTML.

  - ShadowDom

    Mesmo comportamento que o Emulated, mas com maior isolamento.
    O Pai não pode acessar nada dentro do Shadow DOM do Filho.

  - None

    Estilos do Pai podem interferir nos elementos do Filho.
    Os estilos do Filho afetam o Pai e outros componentes.

## Boas Práticas

- Use Emulated para a maioria dos casos (é o padrão).
- Prefira ShadowDom se precisar de isolamento completo e seu público usar navegadores modernos.
- Use None com cuidado, apenas quando estilos globais forem realmente necessários.
- Combine encapsulamento com boas práticas de CSS, como uso de classes específicas, para evitar conflitos.
