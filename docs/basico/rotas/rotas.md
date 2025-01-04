---
sidebar_position: 10
---

# Rotas

## O que é?

Permite criar aplicações de página única (SPA), onde a navegação não recarrega a página.

## Configuração Básica

Definir rotas no `AppRoutingModule`

```tsx
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";

const routes: Routes = [{ path: "", component: HomeComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
```

## Roteamento Avançado

- **Rotas Filhas**

  Configurar sub-rotas para funcionalidades específicas

  ```tsx
  const routes: Routes = [
    {
      path: "dashboard",
      component: DashboardComponent,
      children: [{ path: "relatorio", component: RelatorioComponent }],
    },
  ];
  ```

- **Rotas Dinâmicas**

  Usar parâmetros na URL.

  ```tsx
  const routes: Routes = [{ path: "usuario/:id", component: UsuarioComponent }];
  ```

  Acessar o parâmetro no componente

  ```tsx
  constructor(private route: ActivatedRoute) {
    const id = this.route.snapshot.paramMap.get('id');
  }
  ```

## Lazy Loading

Carregar módulos sob demanda para melhorar o desempenho.

```tsx
const routes: Routes = [
  {
    path: "admin",
    loadChildren: () =>
      import("./admin/admin.module").then((m) => m.AdminModule),
  },
];
```

## Guards e Resolvers

- **Guards**

  Controlam o acesso a rotas.

  ```tsx
  @Injectable({ providedIn: "root" })
  export class AuthGuard implements CanActivate {
    canActivate(): boolean {
      return true; // Implementar lógica de autenticação.
    }
  }
  ```

  ```tsx
  const routes: Routes = [
    { path: "admin", component: AdminComponent, canActivate: [AuthGuard] },
  ];
  ```

- **Resolvers**

  Pré-carregam dados antes de ativar a rota.

  ```tsx
  @Injectable({ providedIn: "root" })
  export class DataResolver implements Resolve<any> {
    resolve(): Observable<any> {
      return this.apiService.getData();
    }
  }
  ```

## Boas Práticas

- Use rotas filhas para agrupar rotas relacionadas.

- Evite hardcode de URLs: Use `routerLink` ou `Router.navigate`.

- Implemente guards para rotas protegidas.

- Divida a configuração em módulos para projetos grandes.

## Propriedades Importantes

### `children`

Usado para criar rotas filhas (sub-rotas) associadas a um componente principal.

Ideal para componentes que possuem partes dependentes ou relacionadas, como um painel administrativo.

**Quando Utilizar**

Quando uma funcionalidade depende de uma hierarquia lógica de rotas.

Quando deseja compartilhar um layout comum entre várias rotas.

Exemplo: Dashboard com seções como "Usuários", "Relatórios".

```tsx
const routes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent,
    children: [
      { path: "usuarios", component: UsuariosComponent },
      { path: "relatorios", component: RelatoriosComponent },
    ],
  },
];
```

Template do `DashboardComponent`

```html
<nav>
  <a routerLink="usuarios">Usuários</a>
  <a routerLink="relatorios">Relatórios</a>
</nav>
<router-outlet></router-outlet>
```

### `data`

Propriedade usada para passar informações estáticas para a rota, como títulos de página ou configurações específicas.

Não é ideal para dados dinâmicos.

**Quando Utilizar:**

Para fornecer metadados para rotas, como título, permissões ou configurações visuais.

Exemplo: Adicionar título dinâmico na aba do navegador.

```tsx
const routes: Routes = [
  {
    path: "sobre",
    component: SobreComponent,
    data: { titulo: "Página Sobre Nós" },
  },
];
```

Acessar os dados no componente

```tsx
constructor(private route: ActivatedRoute) {
  this.route.data.subscribe((data) => {
    console.log(data['titulo']); // Saída: "Página Sobre Nós"
  });
}
```

### `resolve`

Pré-carrega dados antes de a rota ser ativada.

Garantia de que os dados necessários estarão disponíveis no componente.

**Quando Utilizar**

Para evitar carregar telas vazias enquanto os dados são buscados.

Exemplo: Carregar informações do usuário antes de renderizar o perfil.

```tsx
const routes: Routes = [
  {
    path: "perfil",
    component: PerfilComponent,
    resolve: { usuario: UsuarioResolver },
  },
];
```

Resolver

```tsx
@Injectable({ providedIn: "root" })
export class UsuarioResolver implements Resolve<any> {
  constructor(private usuarioService: UsuarioService) {}

  resolve(): Observable<any> {
    return this.usuarioService.getUsuario();
  }
}
```

Acessar os dados no componente

```tsx
constructor(private route: ActivatedRoute) {
  this.route.data.subscribe((data) => {
    console.log(data['usuario']);
  });
}
```

### `canActivate`

Define regras para permitir ou negar acesso a uma rota.

Exemplo: Permitir acesso apenas para usuários autenticados.

**Quando Utilizar**

Para proteger rotas com lógica de autenticação ou autorização.

```tsx
const routes: Routes = [
  {
    path: "admin",
    component: AdminComponent,
    canActivate: [AuthGuard],
  },
];
```

Guard

```tsx
@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(): boolean {
    return this.authService.isAuthenticated();
  }
}
```

### `canDeactivate`

Define lógica para impedir a saída de uma rota até que certas condições sejam atendidas.

Exemplo: Avisar o usuário sobre alterações não salvas.

**Quando Utilizar**

Para evitar perda de dados ou mudanças inesperadas ao navegar.

```tsx
const routes: Routes = [
  {
    path: "editar",
    component: EditarComponent,
    canDeactivate: [CanDeactivateGuard],
  },
];
```

Guard

```tsx
@Injectable({ providedIn: "root" })
export class CanDeactivateGuard implements CanDeactivate<EditarComponent> {
  canDeactivate(component: EditarComponent): boolean {
    return component.podeSair() || confirm("Tem certeza que deseja sair?");
  }
}
```

### `pathMatch`

Determina como o Angular deve comparar a URL.

Valores possíveis

- `prefix`: Aceita URLs que começam com o caminho especificado (padrão).

- `full`: A URL deve corresponder exatamente ao caminho.

**Quando Utilizar:**

`full` para redirecionamentos ou rotas específicas.

Exemplo: Redirecionar a rota raiz para `/home`.

```tsx
const routes: Routes = [{ path: "", redirectTo: "/home", pathMatch: "full" }];
```

### `redirectTo`

Redireciona uma URL para outra rota.

Usado frequentemente com `pathMatch: 'full'`.

**Quando Utilizar**

Para redirecionar rotas não encontradas ou configurar uma página inicial.

```tsx
const routes: Routes = [
  { path: "", redirectTo: "/inicio", pathMatch: "full" },
  { path: "**", redirectTo: "/erro" },
];
```

**Diferenças**

| Propriedade         | Uso Principal                                   | Exemplo Comum                            |
| ------------------- | ----------------------------------------------- | ---------------------------------------- |
| **`children`**      | Estruturar rotas filhas dentro de uma rota pai. | Dashboard com sub-rotas.                 |
| **`data`**          | Fornecer metadados estáticos para a rota.       | Título da página, configurações.         |
| **`resolve`**       | Pré-carregar dados antes de ativar a rota.      | Carregar perfil do usuário.              |
| **`canActivate`**   | Proteger rotas com lógica de autenticação.      | Bloquear acesso não autenticado.         |
| **`canDeactivate`** | Evitar saída de uma rota sem confirmação.       | Avisar sobre alterações não salvas.      |
| **`pathMatch`**     | Especificar correspondência da URL.             | Usado com redirecionamentos (`full`).    |
| **`redirectTo`**    | Redirecionar para outra rota.                   | Página inicial ou rotas não encontradas. |
