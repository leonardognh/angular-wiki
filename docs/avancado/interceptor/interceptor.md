---
sidebar_position: 18
---

# Interceptor

## O que é?

No Angular, um **Interceptor** é um serviço que intercepta todas as solicitações HTTP feitas pelo `HttpClient`. Ele permite manipular requisições ou respostas antes que sejam enviadas ou recebidas, sendo útil para:

- Adicionar **headers**.
- Manipular **autenticação** (como tokens JWT).
- Logar informações de requisições/respostas.
- Gerenciar erros de forma global.

## Como Utilizar?

- **Gerar o Interceptor com o Angular CLI**

  ```bash
  ng generate interceptor core/http
  ```

  Isso criará dois arquivos: http.interceptor.ts e http.interceptor.spec.ts.

- **Implementar o Interceptor**

  No arquivo http.interceptor.ts:

  ```jsx
  import { Injectable } from "@angular/core";
  import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
  } from "@angular/common/http";
  import { Observable } from "rxjs";

  @Injectable()
  export class HttpInterceptorService implements HttpInterceptor {
    intercept(
      req: HttpRequest<any>,
      next: HttpHandler
    ): Observable<HttpEvent<any>> {
      // Clonar a requisição para adicionar um header
      const clonedReq = req.clone({
        headers: req.headers.set("Authorization", "Bearer <TOKEN>"),
      });

      // Continuar com a requisição
      return next.handle(clonedReq);
    }
  }
  ```

- **Registrar o Interceptor**

  No arquivo app.module.ts, adicione o Interceptor como um provider:

  ```tsx
  import { HTTP_INTERCEPTORS } from "@angular/common/http";
  import { HttpInterceptorService } from "./core/http.interceptor";

  @NgModule({
    providers: [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: HttpInterceptorService,
        multi: true, // Permite múltiplos interceptores
      },
    ],
  })
  export class AppModule {}
  ```

- **Manipulando Erros Globalmente**

  Interceptores podem capturar erros de forma centralizada. Isso é útil para exibir mensagens de erro ou redirecionar usuários.

  ```tsx
  import { Injectable } from "@angular/core";
  import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpErrorResponse,
  } from "@angular/common/http";
  import { Observable, throwError } from "rxjs";
  import { catchError } from "rxjs/operators";

  @Injectable()
  export class ErrorInterceptorService implements HttpInterceptor {
    intercept(
      req: HttpRequest<any>,
      next: HttpHandler
    ): Observable<HttpEvent<any>> {
      return next.handle(req).pipe(
        catchError((error: HttpErrorResponse) => {
          console.error("Erro HTTP:", error);

          // Exemplo de redirecionamento em caso de erro 401
          if (error.status === 401) {
            // Redirecionar para login
          }

          return throwError(() => new Error(error.message));
        })
      );
    }
  }
  ```

- **Adicionando Tokens de Autenticação**

  Muitas aplicações precisam incluir tokens JWT nas requisições HTTP. Isso pode ser feito facilmente com um Interceptor.

  ```tsx
  import { Injectable } from "@angular/core";
  import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
  } from "@angular/common/http";
  import { Observable } from "rxjs";
  import { AuthService } from "./auth.service";

  @Injectable()
  export class AuthInterceptorService implements HttpInterceptor {
    constructor(private authService: AuthService) {}

    intercept(
      req: HttpRequest<any>,
      next: HttpHandler
    ): Observable<HttpEvent<any>> {
      const token = this.authService.getToken();

      if (token) {
        const clonedReq = req.clone({
          headers: req.headers.set("Authorization", `Bearer ${token}`),
        });
        return next.handle(clonedReq);
      }

      return next.handle(req);
    }
  }
  ```

- **Exemplo com Múltiplos Interceptores**

  - AuthInterceptor: Adiciona o token de autenticação.
  - ErrorInterceptor: Gerencia erros globalmente.

```tsx
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptorService } from "./auth.interceptor";
import { ErrorInterceptorService } from "./error.interceptor";

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptorService,
      multi: true,
    },
  ],
})
export class AppModule {}
```
