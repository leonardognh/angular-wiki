---
sidebar_position: 4
---

# Componentes

## O que é?

Componentes são a base da construção de interfaces no Angular. Cada componente combina **HTML**, **CSS** e **TypeScript** para definir a aparência e o comportamento de uma parte específica da aplicação.

- **Classe:** Contém a lógica do componente (TypeScript).

- **Template:** Define o layout (HTML).

- **Estilo:** Gerencia o design (CSS/SCSS).

```tsx showLineNumbers
import { Component } from "@angular/core";

@Component({
  selector: "app-exemplo",
  templateUrl: "./exemplo.component.html",
  styleUrls: ["./exemplo.component.css"],
})
export class ExemploComponent {
  titulo: string = "Meu Componente";
}
```

## Criando Componentes

Use o Angular CLI para gerar componentes

```bash
ng generate component nome-do-componente
```

Crie um componente `header`

```bash
ng generate component shared/header
```

**Estrutura Criada**

```plaintext
src/app/shared/header/
├── header.component.ts       # Lógica do componente
├── header.component.html     # Template
├── header.component.css      # Estilos
├── header.component.spec.ts  # Testes
```
