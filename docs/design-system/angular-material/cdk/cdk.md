---
sidebar_position: 1
---

# Angular CDK (Component Dev Kit)

## O que é?

O Angular CDK (Component Dev Kit) é uma biblioteca de utilitários e ferramentas fornecida pelo Angular para ajudar os desenvolvedores a criar componentes reutilizáveis e acessíveis. Ao contrário do Angular Material, que é focado em componentes visuais seguindo o Material Design, o CDK é mais técnico e oferece funcionalidades de baixo nível, como manipulação de layout, acessibilidade, arrastar e soltar, e muito mais.

## Principais Módulos do Angular CDK

### A11y (Acessibilidade)

Fornece ferramentas para melhorar a acessibilidade (a11y) da aplicação.

```tsx
import { FocusMonitor } from "@angular/cdk/a11y";
import { Component, ElementRef, OnDestroy } from "@angular/core";

@Component({
  selector: "app-example",
  template: `<button>Botão Acessível</button>`,
})
export class ExampleComponent implements OnDestroy {
  constructor(private focusMonitor: FocusMonitor, private elRef: ElementRef) {
    this.focusMonitor.monitor(this.elRef.nativeElement).subscribe((origin) => {
      console.log(origin ? "Foco via teclado" : "Foco via mouse");
    });
  }

  ngOnDestroy() {
    this.focusMonitor.stopMonitoring(this.elRef.nativeElement);
  }
}
```

### DragDrop (Arrastar e Soltar)

Permite implementar funcionalidades de arrastar e soltar sem dependências externas.

```html
<div cdkDropList (cdkDropListDropped)="soltar($event)">
  <div *ngFor="let item of itens" cdkDrag>{{ item }}</div>
</div>
```

```tsx
import { Component } from "@angular/core";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";

@Component({
  selector: "app-drag-drop",
  templateUrl: "./drag-drop.component.html",
})
export class DragDropComponent {
  itens = ["Item 1", "Item 2", "Item 3"];

  soltar(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.itens, event.previousIndex, event.currentIndex);
  }
}
```

### Overlay

Fornece uma base para criar elementos como menus, modais e tooltips.

```tsx
import { Overlay, OverlayRef } from "@angular/cdk/overlay";
import { Component } from "@angular/core";

@Component({
  selector: "app-overlay",
  template: `<button (click)="abrirOverlay()">Abrir Overlay</button>`,
})
export class OverlayComponent {
  private overlayRef: OverlayRef;

  constructor(private overlay: Overlay) {}

  abrirOverlay() {
    this.overlayRef = this.overlay.create();
    const portal = document.createElement("div");
    portal.innerHTML = "<p>Este é um overlay</p>";
    this.overlayRef.overlayElement.appendChild(portal);
  }
}
```

### Portal

Permite renderizar conteúdo dinamicamente em diferentes lugares no DOM.

```html
<ng-template #templatePortal>
  <p>Conteúdo do Portal</p>
</ng-template>

<div [cdkPortalOutlet]="templatePortal"></div>
```

### Layout

Oferece serviços e ferramentas para criar layouts responsivos.

```tsx
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";

@Component({
  selector: "app-layout",
  template: `<p *ngIf="isMobile">Você está em um dispositivo móvel</p>`,
})
export class LayoutComponent {
  isMobile = false;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe((result) => {
        this.isMobile = result.matches;
      });
  }
}
```

### Scrolling

Gerencia rolagem e listas virtuais para desempenho otimizado.

```html
<cdk-virtual-scroll-viewport itemSize="50" style="height: 200px;">
  <div *cdkVirtualFor="let item of itens">{{ item }}</div>
</cdk-virtual-scroll-viewport>
```

```tsx
itens = Array.from({ length: 1000 }).map((_, i) => `Item #${i}`);
```

## Quando Usar o Angular CDK?

- Criar Componentes Customizados: Se o projeto exige componentes não disponíveis no Angular Material.
- Adicionar Funcionalidades: Como arrastar e soltar ou overlays dinâmicos.
- Melhorar Acessibilidade: Com o módulo A11y.
- Otimizar Listas Grandes: Usando o módulo Scrolling.
