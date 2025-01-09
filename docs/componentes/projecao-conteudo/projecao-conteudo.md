# Projeção de Conteúdo

## O que é?

A projeção de conteúdo é um recurso que permite passar elementos HTML ou outros componentes do componente pai para dentro do template de um componente filho. Isso é feito usando a diretiva especial `<ng-content>`, que age como um "placeholder" para o conteúdo que será inserido dinamicamente.

## Por que usar?

- Flexibilidade: Permite criar componentes reutilizáveis e dinâmicos que podem receber conteúdo personalizado.
- Separação de responsabilidades: O componente pai define o conteúdo, enquanto o componente filho define a estrutura e o estilo.
- Reutilização: Evita duplicação de código e promove a criação de componentes mais genéricos.

## Como funciona?

Vamos pensar em um componente filho (app-filho)

```tsx showLineNumbers
@Component({
  selector: "app-filho",
  template: `
    <div class="container">
      <h2>Conteúdo do Componente Filho</h2>
      <ng-content></ng-content>
      <!-- Aqui será inserido o conteúdo -->
    </div>
  `,
  styles: [".container { border: 1px solid #ccc; padding: 10px; }"],
})
export class FilhoComponent {}
```

Agora no componente pai (app-pai)

```tsx showLineNumbers
@Component({
  selector: "app-pai",
  template: `
    <app-filho>
      <p>Este é o conteúdo projetado pelo Pai!</p>
    </app-filho>
  `,
})
export class PaiComponent {}
```

Resultado

```html showLineNumbers
<div class="container">
  <h2>Conteúdo do Componente Filho</h2>
  <p>Este é o conteúdo projetado pelo Pai!</p>
</div>
```

## Boas Práticas

- Nomeie as áreas de projeção com select

  - Ajuda a organizar e identificar onde o conteúdo será projetado.

- Use conteúdo padrão para fallback

  - Proporcione uma boa experiência caso nenhum conteúdo seja fornecido.

- Combine projeção com encapsulamento de estilos (ViewEncapsulation)

  - Evite conflitos de estilos entre componentes.

- Evite lógica complexa nos componentes filhos

  - Mantenha o propósito do componente filho focado na estrutura e estilo.

## Limitações

- Bidirectional Binding: Dados passados para o conteúdo projetado não possuem vinculação direta com o componente filho.
- Eventos: O componente filho não pode manipular eventos diretamente no conteúdo projetado.
- Encapsulamento: Estilos do componente pai e filho continuam isolados, o que pode exigir customizações adicionais.
