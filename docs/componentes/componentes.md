---
sidebar_position: 1
---

# Componentes

## O que é?

Componentes são a base da construção de interfaces no Angular. Cada componente é responsável por controlar uma parte específica da tela da aplicação.

Um componente é formado por:

- Template HTML: Define a estrutura visual do componente.
- Classe TypeScript: Contém a lógica e os dados que o template utiliza.
- Estilo CSS/SCSS: Estiliza o componente.

```tsx showLineNumbers title="example.component.ts"
import { Component } from "@angular/core";

@Component({
  // Nome usado no HTML
  selector: "app-example",
  // Arquivo HTML associado
  templateUrl: "./example.component.html",
  // Arquivo de estilo associado
  styleUrls: ["./example.component.css"],
})
export class ExampleComponent {
  titulo: string = "Meu Componente";
}
```

## Decorator

Um decorator é uma função especial que adiciona metadados a classes, métodos, propriedades ou parâmetros, estendendo suas funcionalidades sem alterar diretamente o código original. Ele é amplamente usado para configurar o comportamento de componentes, serviços, diretivas, entre outros.

### O Decorador @Component

O decorador @Component é utilizado para definir o componente. Ele aceita as seguintes propriedades principais:

- selector: Nome do elemento HTML para usar o componente.
- template ou templateUrl: Define o HTML diretamente ou aponta para um arquivo.
- styles ou styleUrls: Define os estilos diretamente ou aponta para arquivos CSS.

## Como criar um componente?

Use o Angular CLI para gerar componentes facilmente.

```bash
ng generate component nome-do-componente
```

**Estrutura Criada**

```plaintext
src/app/nome-do-componente/
├── nome-do-componente.component.ts       # Lógica do componente
├── nome-do-componente.component.html     # Template
├── nome-do-componente.component.css      # Estilos
├── nome-do-componente.component.spec.ts  # Testes
```
