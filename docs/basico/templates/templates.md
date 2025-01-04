---
sidebar_position: 5
---

# Templates

## O que é?

Templates definem a interface do componente usando HTML e diretivas do Angular. Podem ser definidos diretamente no decorator ou em arquivos `.html`.

Template inline

```tsx
// arquivo: header.component.ts
@Component({
  selector: "app-header",
  template: `
    <header>
      <h1>{{ titulo }}</h1>
    </header>
  `,
  styles: ["h1 { color: blue; }"],
})
export class HeaderComponent {
  titulo = "Componente Inline";
}
```

Template externo

```html
<!-- arquivo: header.component.html -->
<header>
  <h1>{{ titulo }}</h1>
</header>
```

### Diretivas no Template

Diretivas são instruções para manipular o DOM.

- **Estruturais:** Alteram o layout (ex.: `ngIf`, `ngFor`).

  ```html
  <p *ngIf="mostrarTexto">Texto visível</p>
  <ul>
    <li *ngFor="let item of itens">{{ item }}</li>
  </ul>
  ```

- **Atributos:** Alteram a aparência ou comportamento (ex.: `[ngClass]`, `[ngStyle]`).

  ```html
  <button [ngClass]="{ 'ativo': estaAtivo }">Clique aqui</button>
  ```

### Ciclo de Vida do Componente

Angular oferece hooks que permitem executar código em momentos específicos do ciclo de vida.

- **`ngOnInit`:** Inicialização do componente.

- **`ngOnChanges`:** Responde a alterações nos inputs.

- **`ngOnDestroy`:** Limpeza antes de destruir o componente.

  ```tsx
  @Component({ ... })
  export class MeuComponente implements OnInit, OnDestroy {
    ngOnInit() {
      console.log('Componente inicializado');
    }

    ngOnDestroy() {
      console.log('Componente destruído');
    }
  }
  ```

### Diferentes formas de criar Componentes

- **Standalone Components:** Introduzidos no Angular 14+, eliminam a necessidade de declarar componentes em módulos.

  ```tsx
  // arquivo: standalone.component.ts
  @Component({
    selector: "app-standalone",
    standalone: true,
    template: `<p>Componente Standalone</p>`,
    styleUrls: ["./standalone.component.css"],
    imports: [CommonModule],
  })
  export class StandaloneComponent {}
  ```

- **Módulo Declared Components:** Tradicional, usado em versões anteriores.

  ```tsx
  // arquivo: header.component.ts
  @Component({
    selector: "app-header",
    template: `
      <header>
        <h1>{{ titulo }}</h1>
      </header>
    `,
    styleUrls: ["./header.component.css"],
  })
  export class HeaderComponent {
    titulo = "Componente Header";
  }
  ```

  ```tsx
  // arquivo: header.module.ts
  @NgModule({
    declarations: [
      HeaderComponent, // Declaração do HeaderComponent
    ],
    imports: [CommonModule],
  })
  export class HeaderModule {}
  ```
