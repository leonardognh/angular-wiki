---
sidebar_position: 1
---

# Consumo de APIs

# O que é?

O Angular utiliza o módulo `HttpClient` para realizar requisições HTTP. Permite consumir APIs RESTful para enviar e receber dados de um servidor. O `HttpClient` retorna **Observables**, facilitando manipulação assíncrona e reativa.

```tsx showLineNumbers
this.http.get("https://api.exemplo.com/dados");
```

## Configuração do `HttpClient`

É necessário importar o módulo `HttpClientModule` no `AppModule`.

```tsx showLineNumbers title="app.module.ts"
import { HttpClientModule } from "@angular/common/http";
@NgModule({
  imports: [HttpClientModule],
})
export class AppModule {}
```

## Métodos Comuns do `HttpClient`

- **GET:** Obter dados.
- **POST:** Enviar dados.
- **PUT:** Atualizar todos os dados.
- **PATCH:** Atualizar parcialmente os dados.
- **DELETE:** Excluir dados.

```tsx showLineNumbers title="api.service.ts"
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  private baseUrl = "https://api.exemplo.com";

  constructor(private http: HttpClient) {}

  getDados() {
    return this.http.get(`${this.baseUrl}/dados`);
  }

  getDadosComParams(filtro: string, pagina: number) {
    const params = new HttpParams()
      .set("filtro", filtro)
      .set("pagina", pagina.toString());

    return this.http.get(`${this.baseUrl}/dados`, { params });
  }

  postDados(dado: any) {
    return this.http.post(`${this.baseUrl}/dados`, dado);
  }

  putDados(id: string, dado: any) {
    return this.http.put(`${this.baseUrl}/dados/${id}`, dado);
  }

  patchDados(id: string, dadoParcial: any) {
    return this.http.patch(`${this.baseUrl}/dados/${id}`, dadoParcial);
  }

  deleteDados(id: string) {
    return this.http.delete(`${this.baseUrl}/dados/${id}`);
  }
}
```

Utlização

```tsx showLineNumbers title="example.component.ts"
import { Component } from "@angular/core";
import { ApiService } from "./api.service";

@Component({
  selector: "app-example",
  templateUrl: "./example.component.html",
  styleUrls: ["./example.component.css"],
})
export class ExampleComponent {
  constructor(private apiService: ApiService) {}

  // GET sem parâmetros
  getDados() {
    this.apiService.getDados().subscribe({
      next: (dados) => console.log("GET sem parâmetros:", dados),
      error: (erro) => console.error("Erro no GET:", erro),
    });
  }

  // GET com parâmetros
  getDadosComParams() {
    const filtro = "ativo";
    const pagina = 1;

    this.apiService.getDadosComParams(filtro, pagina).subscribe({
      next: (dados) => console.log("GET com parâmetros:", dados),
      error: (erro) => console.error("Erro no GET com parâmetros:", erro),
    });
  }

  // POST
  postDados() {
    const novoDado = { nome: "Novo Item", ativo: true };

    this.apiService.postDados(novoDado).subscribe({
      next: (dados) => console.log("POST:", dados),
      error: (erro) => console.error("Erro no POST:", erro),
    });
  }

  // PUT
  putDados() {
    const id = "123";
    const dadoAtualizado = { nome: "Item Atualizado", ativo: false };

    this.apiService.putDados(id, dadoAtualizado).subscribe({
      next: (dados) => console.log("PUT:", dados),
      error: (erro) => console.error("Erro no PUT:", erro),
    });
  }

  // PATCH
  patchDados() {
    const id = "123";
    const dadoParcial = { ativo: true };

    this.apiService.patchDados(id, dadoParcial).subscribe({
      next: (dados) => console.log("PATCH:", dados),
      error: (erro) => console.error("Erro no PATCH:", erro),
    });
  }

  // DELETE
  deleteDados() {
    const id = "123";

    this.apiService.deleteDados(id).subscribe({
      next: (dados) => console.log("DELETE:", dados),
      error: (erro) => console.error("Erro no DELETE:", erro),
    });
  }
}
```

### URLs Geradas e Corpo (Body) para Cada Método HTTP

- GET sem parâmetros

  **Url**

  ```plaintext
  https://api.exemplo.com/dados
  ```

  **Body**

  Não se aplica.

- GET com parâmetros

  **Url**

  ```plaintext
  https://api.exemplo.com/dados?filtro=ativo&pagina=1
  ```

  **Body**

  Não se aplica.

- POST

  **Url**

  ```plaintext
  https://api.exemplo.com/dados
  ```

  **Body**

  ```json showLineNumbers
  {
    "nome": "Novo Item",
    "ativo": true
  }
  ```

- PUT

  **Url**

  ```plaintext
  https://api.exemplo.com/dados/123
  ```

  **Body**

  ```json showLineNumbers
  {
    "nome": "Item Atualizado",
    "ativo": false
  }
  ```

- PATCH

  **Url**

  ```plaintext
  https://api.exemplo.com/dados/123
  ```

  **Body**

  ```json showLineNumbers
  {
    "ativo": true
  }
  ```

- DELETE

  **Url**

  ```plaintext
  https://api.exemplo.com/dados/123
  ```

  **Body**

  Não se aplica.

## Tratamento de Erros

Usar o operador `catchError` do RxJS para capturar erros. O `HttpErrorResponse` contém informações do erro.

```tsx showLineNumbers
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

getDados() {
  return this.http.get(`${this.baseUrl}/dados`).pipe(
    catchError((error) => {
      console.error('Erro:', error);
      return throwError(() => error);
    })
  );
}
```

## Importante

No tópico avançado, falaremos mais sobre **RxJs** e **Observables**
