---
sidebar_position: 10
---

# Serviços e Injeção de Dependência

## O que é Serviço?

Serviços são classes usadas para encapsular lógica compartilhada entre componentes, como manipulação de dados, chamadas HTTP ou armazenamento de estado. São projetados para serem reutilizáveis e desacoplados dos componentes.

```tsx showLineNumbers title="user.service.ts"
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class UserService {
  getUsers() {
    return ["João", "Maria", "Pedro"];
  }
}
```

## O que é Injeção de Dependência?

É um padrão de design que permite a criação de dependências fora de uma classe e sua injeção na classe conforme necessário. No Angular, o **Injetor** gerencia as instâncias e o ciclo de vida das dependências.

```tsx showLineNumbers title="user-list.component.ts"
import { Component } from "@angular/core";
import { UserService } from "./user.service";

@Component({
  selector: "app-user-list",
  template: `<ul>
    <li *ngFor="let user of users">{{ user }}</li>
  </ul>`,
})
export class UserListComponent {
  users: string[];

  constructor(private userService: UserService) {
    this.users = this.userService.getUsers();
  }
}
```

### Formas de Prover Serviços

- **`providedIn: 'root'`**

  O serviço é singleton e acessível em toda a aplicação.

  ```tsx showLineNumbers title="auth.service.ts"
  @Injectable({
    providedIn: "root",
  })
  export class AuthService {}
  ```

- **Declaração em Módulos**

  O serviço é singleton dentro do módulo onde foi declarado.

  ```tsx showLineNumbers title="core.module.ts"
  @NgModule({
    providers: [AuthService],
  })
  export class CoreModule {}
  ```

- **Declaração em Componentes**

  Cada instância do componente tem seu próprio serviço.

  ```tsx showLineNumbers title="login.component.ts"
  @Component({
    providers: [AuthService],
  })
  export class LoginComponent {}
  ```

**Diferenças**

| Forma                    | Escopo                             | Ideal Para                       |
| ------------------------ | ---------------------------------- | -------------------------------- |
| **`providedIn: 'root'`** | Toda a aplicação                   | Lógica global.                   |
| **Módulos**              | Módulos específicos                | Funcionalidades modulares.       |
| **Componentes**          | Instâncias isoladas por componente | Dados específicos do componente. |

### Ciclo de Vida de Serviços Singleton

Serviços declarados com `providedIn: 'root'` são instanciados uma única vez e permanecem vivos enquanto a aplicação está ativa. Evita duplicação de lógica e melhora o desempenho.

```tsx showLineNumbers title="auth.service.ts"
@Injectable({
  providedIn: "root",
})
export class AuthService {
  private isLoggedIn = false;

  login() {
    this.isLoggedIn = true;
  }

  logout() {
    this.isLoggedIn = false;
  }

  get status(): boolean {
    return this.isLoggedIn;
  }
}
```

### Serviço Escopo de Módulo

Escopos modulares ajudam a limitar a instância do serviço a um módulo específico. Funcionalidades como autenticação ou configurações específicas de uma área.

```tsx showLineNumbers title="admin.module.ts"
@NgModule({
  providers: [AdminService],
})
export class AdminModule {}
```

### Serviço Escopo de Componente

Cada componente recebe sua própria instância do serviço. Útil para armazenar estados locais ou dados temporários.

```tsx showLineNumbers title="session.component.ts"
@Component({
  providers: [SessionService],
})
export class SessionComponent {}
```

**Diferenças**

| Característica       | Singleton (root)            | Escopo de Módulo               | Escopo de Componente       |
| -------------------- | --------------------------- | ------------------------------ | -------------------------- |
| **Instância Única?** | Sim                         | Sim (no módulo)                | Não, uma por componente    |
| **Escopo**           | Toda a aplicação            | Módulo específico              | Apenas no componente       |
| **Uso Comum**        | Dados globais, autenticação | Lógica modular, API específica | Estado local ou temporário |

## Boas Práticas

**Evite duplicação de lógica**

Use serviços para compartilhar lógica comum entre componentes.

**Escolha o escopo correto**

Use `providedIn: 'root'` para lógica global.

Use escopo de módulo para isolar funcionalidades.

**Mantenha os serviços coesos**

Um serviço deve ter responsabilidade única.

**Desacople lógica de componentes**

Coloque chamadas HTTP ou manipulação de dados em serviços, não em componentes.
