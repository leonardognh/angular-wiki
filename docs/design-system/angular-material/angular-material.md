---
sidebar_position: 2
---

# Angular Material

## O que é?

Angular Material é uma biblioteca de componentes baseada no Material Design, criada especificamente para aplicações Angular. Ela oferece componentes estilizados, prontos para uso e consistentes com as diretrizes do Google.

## Como Utilizar?

### Instalação

```plaintext
ng add @angular/material
```

Siga as instruções para escolher tema e configurações durante a instalação.

## Componentes Úteis

- Botões

  ```html
  <button mat-button>Botão Simples</button>
  <button mat-raised-button color="primary">Botão Elevado</button>
  ```

- Input

  ```html
  <mat-form-field appearance="fill">
    <mat-label>Email</mat-label>
    <input matInput placeholder="Digite seu email" />
  </mat-form-field>
  ```

- Tabelas

  ```html
  <table mat-table [dataSource]="dados" class="mat-elevation-z8">
    <ng-container matColumnDef="nome">
      <th mat-header-cell *matHeaderCellDef>Nome</th>
      <td mat-cell *matCellDef="let elemento">{{elemento.nome}}</td>
    </ng-container>
    <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
    <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
  </table>
  ```

- Cards

  ```html
  <mat-card>
    <mat-card-header>
      <mat-card-title>Título</mat-card-title>
    </mat-card-header>
    <mat-card-content>Conteúdo do Card</mat-card-content>
  </mat-card>
  ```

  **Vantagens**

- Totalmente integrado ao Angular.
- Segue as diretrizes do Material Design.
- Componentes interativos e responsivos.
