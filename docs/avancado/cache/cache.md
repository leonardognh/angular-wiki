---
sidebar_position: 19
---

# Cache

## O que é?

O uso de cache em uma aplicação Angular é uma técnica para armazenar e reutilizar dados já carregados, reduzindo o número de chamadas à API e melhorando o desempenho da aplicação. O cache é especialmente útil em cenários onde os dados mudam raramente ou precisam ser acessados repetidamente.

## Quando Utilizar?

Dados que não mudam com frequência, como listas de produtos ou configurações. Requisições repetidas ao mesmo endpoint. Melhorar a experiência do usuário, reduzindo o tempo de carregamento. Abordagens para Implementar Cache no Angular

### Cache Manual

Armazene os dados em um serviço Angular para reutilizá-los.

```tsx
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CacheService {
  private cache = new Map<string, any>();

  constructor(private http: HttpClient) {}

  getData(url: string): Observable<any> {
    if (this.cache.has(url)) {
      console.log("Usando cache para:", url);
      return of(this.cache.get(url)); // Retorna os dados do cache
    }

    return new Observable((observer) => {
      this.http.get(url).subscribe((data) => {
        this.cache.set(url, data); // Salva os dados no cache
        observer.next(data);
        observer.complete();
      });
    });
  }
}
```

Consumindo o Serviço

```tsx
@Component({
  selector: "app-example",
  template: `<p>Veja os dados no console</p>`,
})
export class ExampleComponent {
  constructor(private cacheService: CacheService) {
    this.cacheService
      .getData("https://api.example.com/data")
      .subscribe((data) => {
        console.log(data);
      });
  }
}
```

### Cache com Interceptor

Use um HTTP Interceptor para implementar cache global para requisições HTTP.

```tsx
import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Observable, of } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  private cache = new Map<string, any>();

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.method !== "GET") {
      return next.handle(req); // Apenas cache para GET
    }

    if (this.cache.has(req.urlWithParams)) {
      console.log("Cache hit:", req.urlWithParams);
      return of(this.cache.get(req.urlWithParams));
    }

    console.log("Cache miss:", req.urlWithParams);
    return next.handle(req).pipe(
      tap((event) => {
        this.cache.set(req.urlWithParams, event); // Salva no cache
      })
    );
  }
}
```

Registrar no AppModule

```tsx
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { CacheInterceptor } from "./cache.interceptor";

@NgModule({
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true },
  ],
})
export class AppModule {}
```

### Cache com Bibliotecas Externas

Use bibliotecas como RxJS operators ou Apollo Cache (para GraphQL).

```tsx
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { shareReplay } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class RxjsCacheService {
  private cache$ = this.http.get("https://api.example.com/data").pipe(
    shareReplay(1) // Armazena a última emissão para reutilização
  );

  constructor(private http: HttpClient) {}

  getData() {
    return this.cache$;
  }
}
```

## Gerenciando o Tempo de Expiração do Cache

Para evitar dados desatualizados, implemente a expiração do cache.

```tsx
export class CacheService {
  private cache = new Map<string, { data: any; expiry: number }>();

  getData(url: string, expiryTime: number): Observable<any> {
    const cached = this.cache.get(url);

    if (cached && cached.expiry > Date.now()) {
      console.log("Cache válido:", url);
      return of(cached.data);
    }

    console.log("Cache expirado:", url);
    return new Observable((observer) => {
      this.http.get(url).subscribe((data) => {
        this.cache.set(url, { data, expiry: Date.now() + expiryTime });
        observer.next(data);
        observer.complete();
      });
    });
  }
}
```

## Boas Práticas

- Armazene Somente o Necessário: Evite cache para dados altamente dinâmicos.
- Limpe o Cache: Crie uma função para limpar o cache quando necessário.
- Gerencie Erros: Certifique-se de que falhas de rede não causem problemas no cache.
- Combine Técnicas: Use cache local para estado pequeno e cache global para dados externos.
