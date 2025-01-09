---
sidebar_position: 17
---

# JWT (JSON Web Tokens)

## O que é?

**JWT (JSON Web Token)** é um padrão para autenticação baseado em tokens. Ele permite que o servidor emita um token contendo informações do usuário, que pode ser usado para acessar recursos protegidos. O Angular, combinado com JWT, é uma solução eficiente para gerenciar autenticação em aplicações frontend.

## Como Funciona?

- **Usuário faz login:** O cliente envia credenciais para o servidor.
- **Servidor emite um token:** Após verificar as credenciais, o servidor gera um JWT e o retorna ao cliente.
- **Token é armazenado:** O cliente armazena o token, geralmente no **localStorage** ou **sessionStorage**.
- **Token é enviado nas requisições:** Para acessar recursos protegidos, o token é enviado no cabeçalho da requisição HTTP.
- **Servidor valida o token:** O servidor verifica o token antes de responder à requisição.

## Como Utilizar?

### Instalar o Angular JWT

```bash
npm install @auth0/angular-jwt
```

### Configurar o Interceptor

Use um interceptor para adicionar o token às requisições automaticamente.

```tsx showLineNumbers title="auth.interceptor.ts"
import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();

    if (token) {
      const clonedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      return next.handle(clonedReq);
    }

    return next.handle(req);
  }
}
```

Registrar no AppModule.

```tsx showLineNumbers title="app.module.ts"
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "./auth.interceptor";

@NgModule({
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
})
export class AppModule {}
```

### Serviço de Autenticação

Crie um serviço para gerenciar login, logout e validação do token.

```tsx showLineNumbers title="auth.service.ts"
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private readonly tokenKey = "authToken";

  constructor(
    private http: HttpClient,
    private router: Router,
    private jwtHelper: JwtHelperService
  ) {}

  login(credentials: { email: string; password: string }) {
    return this.http.post("/api/login", credentials).subscribe((res: any) => {
      localStorage.setItem(this.tokenKey, res.token);
      this.router.navigate(["/dashboard"]);
    });
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(["/login"]);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return token ? !this.jwtHelper.isTokenExpired(token) : false;
  }
}
```

## Protegendo Rotas

Use Route Guards para proteger rotas acessíveis apenas para usuários autenticados.

```tsx showLineNumbers title="auth.guard.ts"
import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    }
    this.router.navigate(["/login"]);
    return false;
  }
}
```

Registrar no AppRoutingModule.

```tsx showLineNumbers title="app-routing.module.ts"
const routes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
];
```

### Lidando com Expiração do Token

Verifique a validade do token antes de enviá-lo. Caso o token esteja expirado, redirecione o usuário para o login.

```tsx showLineNumbers
isLoggedIn(): boolean {
  const token = this.getToken();
  return token ? !this.jwtHelper.isTokenExpired(token) : false;
}
```

Redirecionar em Caso de Expiração no Interceptor.

```tsx showLineNumbers
if (this.jwtHelper.isTokenExpired(token)) {
  this.authService.logout();
}
```

## Armazenamento Seguro do Token

- localStorage: Persistente entre sessões.
- sessionStorage: Temporário (limpado ao fechar o navegador).

Evite armazenar tokens em cookies sem proteção CSRF.

## Decodificando o JWT

Use a biblioteca `angular-jwt` para decodificar o token e acessar os dados.

```tsx showLineNumbers
getUserInfo(): any {
  const token = this.getToken();
  if (token) {
    return this.jwtHelper.decodeToken(token);
  }
  return null;
}
```

## Exemplo Html

```tsx showLineNumbers title="login.component.ts"
import { Component } from "@angular/core";
import { AuthService } from "./auth.service";

@Component({
  selector: "app-login",
  template: `
    <form (ngSubmit)="login()">
      <input
        [(ngModel)]="credentials.email"
        placeholder="Email"
        name="email"
        required
      />
      <input
        [(ngModel)]="credentials.password"
        type="password"
        placeholder="Senha"
        name="password"
        required
      />
      <button type="submit">Login</button>
    </form>
  `,
})
export class LoginComponent {
  credentials = { email: "", password: "" };

  constructor(private authService: AuthService) {}

  login() {
    this.authService.login(this.credentials);
  }
}
```
