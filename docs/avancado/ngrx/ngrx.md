---
sidebar_position: 6
---

# Gerenciamento de Estado com NgRx

## O que é?

O NgRx (Angular Reactive Extensions) é uma biblioteca para gerenciamento de estado no Angular, baseada no padrão **Redux**. Utiliza **Actions**, **Reducers**, e **Stores** para gerenciar o estado global da aplicação de forma previsível. Adota o modelo reativo usando Observables do RxJS.

- **Store:** O repositório central do estado.

- **Actions:** Representam intenções do usuário.

- **Reducers:** Determinam como o estado muda com base em uma ação.

- **Selectors:** Recuperam partes específicas do estado.

## Estado Global

Estado acessível em toda a aplicação. Ideal para dados que precisam ser compartilhados entre múltiplos módulos ou componentes.

**Exemplo**

- Informações do usuário autenticado.

- Configurações globais (tema, idioma).

## Estado Local

Estado mantido dentro de um único componente ou módulo. Ideal para dados temporários ou específicos de uma funcionalidade.

**Exemplo**

- Estados de formulário.

- Filtros de pesquisa em uma tabela.

## Quando Usar Estado Global ou Local

| **Critério**       | **Estado Global**                           | **Estado Local**                                                    |
| ------------------ | ------------------------------------------- | ------------------------------------------------------------------- |
| **Escopo**         | Compartilhado entre múltiplos componentes.  | Restrito a um componente ou funcionalidade.                         |
| **Complexidade**   | Necessita de estrutura mais robusta (NgRx). | Mais simples, utilizando `@Input`, `@Output`, ou `BehaviorSubject`. |
| **Exemplo de Uso** | Sessão do usuário, carrinho de compras.     | Campos de formulário ou interações isoladas.                        |

## Configuração Básica do NgRx

### Instalação

```bash
npm install @ngrx/store @ngrx/effects @ngrx/store-devtools
```

### Configuração do `StoreModule`

```tsx
import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { reducers } from "./store/reducers";

@NgModule({
  imports: [StoreModule.forRoot(reducers)],
})
export class AppModule {}
```

## Estrutura do NgRx

### Actions

Representam eventos que descrevem mudanças de estado.

```tsx
import { createAction, props } from "@ngrx/store";

export const carregarUsuario = createAction(
  "[Usuário] Carregar Usuário",
  props<{ id: number }>()
);
export const usuarioCarregado = createAction(
  "[Usuário] Usuário Carregado",
  props<{ usuario: any }>()
);
```

### Reducers

Funções puras que especificam como o estado muda com base nas ações.

```tsx
import { createReducer, on } from "@ngrx/store";
import { carregarUsuario, usuarioCarregado } from "./usuario.actions";

export const initialState = { usuario: null, carregando: false };

export const usuarioReducer = createReducer(
  initialState,
  on(carregarUsuario, (state) => ({ ...state, carregando: true })),
  on(usuarioCarregado, (state, { usuario }) => ({
    ...state,
    usuario,
    carregando: false,
  }))
);
```

### Selectors

Funções que recuperam partes específicas do estado.

```tsx
import { createSelector } from "@ngrx/store";

export const selectUsuario = (state: any) => state.usuario;
export const selectCarregando = createSelector(
  selectUsuario,
  (usuarioState) => usuarioState.carregando
);
```

### Effects

Gerencia efeitos colaterais, como chamadas HTTP, com base em ações disparadas.

```tsx
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, mergeMap } from "rxjs/operators";
import { UsuarioService } from "./usuario.service";
import { carregarUsuario, usuarioCarregado } from "./usuario.actions";

@Injectable()
export class UsuarioEffects {
  carregarUsuario$ = createEffect(() =>
    this.actions$.pipe(
      ofType(carregarUsuario),
      mergeMap((action) =>
        this.usuarioService
          .getUsuario(action.id)
          .pipe(map((usuario) => usuarioCarregado({ usuario })))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private usuarioService: UsuarioService
  ) {}
}
```

## Exemplo Completo

Gerenciar o estado do usuário autenticado.

### Actions

```tsx
import { createAction, props } from "@ngrx/store";

export const login = createAction("[Auth] Login", props<{ usuario: any }>());
export const logout = createAction("[Auth] Logout");
```

### Reducer

```tsx
import { createReducer, on } from "@ngrx/store";
import { login, logout } from "./auth.actions";

export const initialState = { usuario: null };

export const authReducer = createReducer(
  initialState,
  on(login, (state, { usuario }) => ({ ...state, usuario })),
  on(logout, () => ({ usuario: null }))
);
```

### Selector

```tsx
export const selectUsuario = (state: any) => state.auth.usuario;
```

### Componente

```tsx
import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { login, logout } from "./store/auth.actions";
import { selectUsuario } from "./store/auth.selectors";

@Component({
  selector: "app-login",
  template: `
    <button *ngIf="!(usuario$ | async)" (click)="fazerLogin()">Login</button>
    <button *ngIf="usuario$ | async" (click)="fazerLogout()">Logout</button>
  `,
})
export class LoginComponent {
  usuario$ = this.store.select(selectUsuario);

  constructor(private store: Store) {}

  fazerLogin() {
    this.store.dispatch(login({ usuario: { nome: "João" } }));
  }

  fazerLogout() {
    this.store.dispatch(logout());
  }
}
```

## Exemplo na Prática**: Sem NgRx - Gerenciamento de estado de um carrinho de compras**

O estado é gerenciado localmente, usando um serviço que mantém os dados compartilhados entre componentes. Ideal para projetos simples ou quando o estado não precisa ser global.

### Serviço de Estado

```tsx
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CarrinhoService {
  private itensSource = new BehaviorSubject<any[]>([]);
  itens$ = this.itensSource.asObservable();

  adicionarItem(item: any) {
    const itens = this.itensSource.value;
    this.itensSource.next([...itens, item]);
  }

  removerItem(index: number) {
    const itens = this.itensSource.value;
    itens.splice(index, 1);
    this.itensSource.next([...itens]);
  }
}
```

### Componente: Adicionar ao Carrinho

```tsx
import { Component } from "@angular/core";
import { CarrinhoService } from "./carrinho.service";

@Component({
  selector: "app-adicionar-item",
  template: ` <button (click)="adicionar()">Adicionar Item</button> `,
})
export class AdicionarItemComponent {
  constructor(private carrinhoService: CarrinhoService) {}

  adicionar() {
    this.carrinhoService.adicionarItem({ nome: "Produto", preco: 100 });
  }
}
```

### Componente: Exibir Carrinho

```tsx
import { Component } from "@angular/core";
import { CarrinhoService } from "./carrinho.service";

@Component({
  selector: "app-carrinho",
  template: `
    <ul>
      <li *ngFor="let item of itens; let i = index">
        {{ item.nome }} - R$ {{ item.preco }}
        <button (click)="remover(i)">Remover</button>
      </li>
    </ul>
  `,
})
export class CarrinhoComponent {
  itens: any[] = [];

  constructor(private carrinhoService: CarrinhoService) {
    this.carrinhoService.itens$.subscribe((dados) => (this.itens = dados));
  }

  remover(index: number) {
    this.carrinhoService.removerItem(index);
  }
}
```

## Exemplo na Prática**: Com NgRx - Gerenciamento de estado de um carrinho de compras**

O estado é gerenciado globalmente usando a biblioteca NgRx. As mudanças no estado são controladas por ações e reducers, promovendo previsibilidade e rastreabilidade.

### Instalação

```bash
npm install @ngrx/store
```

### Actions

```tsx
import { createAction, props } from "@ngrx/store";

export const adicionarItem = createAction(
  "[Carrinho] Adicionar Item",
  props<{ item: any }>()
);

export const removerItem = createAction(
  "[Carrinho] Remover Item",
  props<{ index: number }>()
);
```

### Reducer

```tsx
import { createReducer, on } from "@ngrx/store";
import { adicionarItem, removerItem } from "./carrinho.actions";

export const initialState: any[] = [];

export const carrinhoReducer = createReducer(
  initialState,
  on(adicionarItem, (state, { item }) => [...state, item]),
  on(removerItem, (state, { index }) => state.filter((_, i) => i !== index))
);
```

### Selector

```tsx
import { createSelector } from "@ngrx/store";

export const selectCarrinho = (state: any) => state.carrinho;

export const selectItens = createSelector(
  selectCarrinho,
  (carrinho) => carrinho
);
```

### Configuração do StoreModule

```tsx
import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { carrinhoReducer } from "./carrinho.reducer";

@NgModule({
  imports: [StoreModule.forRoot({ carrinho: carrinhoReducer })],
})
export class AppModule {}
```

### Componente: Adicionar ao Carrinho

```tsx
import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { adicionarItem } from "./carrinho.actions";

@Component({
  selector: "app-adicionar-item",
  template: ` <button (click)="adicionar()">Adicionar Item</button> `,
})
export class AdicionarItemComponent {
  constructor(private store: Store) {}

  adicionar() {
    this.store.dispatch(
      adicionarItem({ item: { nome: "Produto", preco: 100 } })
    );
  }
}
```

### Componente: Exibir Carrinho

```tsx
import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { selectItens } from "./carrinho.selectors";
import { removerItem } from "./carrinho.actions";

@Component({
  selector: "app-carrinho",
  template: `
    <ul>
      <li *ngFor="let item of itens$ | async; let i = index">
        {{ item.nome }} - R$ {{ item.preco }}
        <button (click)="remover(i)">Remover</button>
      </li>
    </ul>
  `,
})
export class CarrinhoComponent {
  itens$ = this.store.select(selectItens);

  constructor(private store: Store) {}

  remover(index: number) {
    this.store.dispatch(removerItem({ index }));
  }
}
```

## Sem NgRx vs. Com NgRx

| **Aspecto**               | **Sem NgRx**                                      | **Com NgRx**                                               |
| ------------------------- | ------------------------------------------------- | ---------------------------------------------------------- |
| **Estado**                | Gerenciado localmente no serviço.                 | Gerenciado globalmente na `Store`.                         |
| **Complexidade**          | Menor, mas menos escalável em aplicações grandes. | Maior, mas mais organizado e escalável.                    |
| **Rastreamento de ações** | Difícil rastrear mudanças no estado.              | Todas as mudanças passam pelas **Actions** e **Reducers**. |
| **Escalabilidade**        | Limitada a projetos pequenos e médios.            | Adequado para projetos grandes com muitos componentes.     |

- **Sem NgRx**

  É mais simples e rápido de implementar. Recomendado para estados locais ou pequenos projetos.

- **Com NgRx**

Proporciona rastreabilidade e previsibilidade. Recomendado para aplicações maiores ou com múltiplas partes compartilhando o mesmo estado.
