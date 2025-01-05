---
sidebar_position: 11
---

# Formulários

## O que é?

Angular oferece duas abordagens para trabalhar com formulários:

- **Template-driven Forms:** Baseados no template HTML, mais simples e intuitivos.

- **Reactive Forms:** Baseados em código TypeScript, oferecem maior controle, validação e escalabilidade.

## Reactive Forms

### FormGroup

`FormGroup` é uma classe usada para criar e gerenciar grupos de controles de formulário.

Os controles precisam ser declarados manualmente, tornando o código mais explícito, mas verboso para formulários maiores.

- **Vantagens:**

  Oferece controle total sobre os controles.

  Útil para formulários pequenos ou altamente personalizados.

  Cada controle no `FormGroup` é representado por um `FormControl`.

  ```tsx showLineNumbers title="login.component.ts"
  import { Component } from "@angular/core";
  import { FormGroup, FormControl } from "@angular/forms";

  @Component({
    selector: "app-login",
    template: `
      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
        <label>
          Email:
          <input formControlName="email" />
        </label>
        <label>
          Senha:
          <input type="password" formControlName="senha" />
        </label>
        <button type="submit">Entrar</button>
      </form>
    `,
  })
  export class LoginComponent {
    loginForm = new FormGroup({
      email: new FormControl(""),
      senha: new FormControl(""),
    });

    onSubmit() {
      console.log(this.loginForm.value);
    }
  }
  ```

### FormBuilder

`FormBuilder` é uma classe que fornece métodos convenientes para criar `FormGroup` e `FormControl`.

Reduz a verbosidade do código e melhora a legibilidade, especialmente em formulários grandes.

- **Vantagens:**

  Torna o código mais conciso.

  Facilita a criação de formulários dinâmicos.

  ```tsx showLineNumbers title="registro.component.ts"
  import { Component } from "@angular/core";
  import { FormBuilder, FormGroup } from "@angular/forms";

  @Component({
    selector: "app-registro",
    template: `
      <form [formGroup]="registroForm" (ngSubmit)="onSubmit()">
        <label>
          Nome:
          <input formControlName="nome" />
        </label>
        <label>
          Email:
          <input formControlName="email" />
        </label>
        <button type="submit">Registrar</button>
      </form>
    `,
  })
  export class RegistroComponent {
    registroForm: FormGroup;

    constructor(private fb: FormBuilder) {
      this.registroForm = this.fb.group({
        nome: [""],
        email: [""],
      });
    }

    onSubmit() {
      console.log(this.registroForm.value);
    }
  }
  ```

### FormArray

Um conjunto de `FormControl` ou `FormGroup` em forma de array.

Útil para coleções dinâmicas, como adicionar/remover campos.

```tsx showLineNumbers title="usuarios.component.ts"
import { Component } from "@angular/core";
import { FormBuilder, FormArray } from "@angular/forms";

@Component({
  selector: "app-usuarios",
  template: `
    <form [formGroup]="usuariosForm" (ngSubmit)="onSubmit()">
      <div formArrayName="usuarios">
        <div *ngFor="let usuario of usuarios.controls; let i = index">
          <label>
            Usuário {{ i + 1 }}:
            <input [formControlName]="i" />
          </label>
        </div>
      </div>
      <button type="button" (click)="addUsuario()">Adicionar Usuário</button>
      <button type="submit">Enviar</button>
    </form>
  `,
})
export class UsuariosComponent {
  usuariosForm = this.fb.group({
    usuarios: this.fb.array([]),
  });

  get usuarios() {
    return this.usuariosForm.get("usuarios") as FormArray;
  }

  constructor(private fb: FormBuilder) {}

  addUsuario() {
    this.usuarios.push(this.fb.control(""));
  }

  onSubmit() {
    console.log(this.usuariosForm.value);
  }
}
```

## Validações em Reactive Forms

### Validações Simples

Validadores como `Validators.required`, `Validators.minLength`, etc.

```tsx showLineNumbers
import { Validators } from "@angular/forms";

this.registroForm = this.fb.group({
  nome: ["", Validators.required],
  email: ["", [Validators.required, Validators.email]],
});
```

### Validações Personalizadas

Criar funções validadoras personalizadas.

```tsx showLineNumbers
import { AbstractControl, ValidationErrors } from "@angular/forms";

function senhaForte(control: AbstractControl): ValidationErrors | null {
  const valor = control.value;
  if (!/[A-Z]/.test(valor) || !/[0-9]/.test(valor)) {
    return { senhaForte: true };
  }
  return null;
}

this.registroForm = this.fb.group({
  senha: ["", [Validators.required, senhaForte]],
});
```

**Diferença FormGroup vs. FormBuilder vs. FormArray**

| **Recurso**   | **FormGroup**          | **FormBuilder**                 | **FormArray**                                      |
| ------------- | ---------------------- | ------------------------------- | -------------------------------------------------- |
| **Definição** | Grupo de controles.    | Atalho para criar controles.    | Array de controles ou grupos.                      |
| **Uso Comum** | Formulários estáticos. | Criação concisa de formulários. | Coleções dinâmicas.                                |
| **Exemplo**   | `new FormGroup({...})` | `this.fb.group({...})`          | `this.fb.array([...])` ou `new FormArray([{...}])` |

### Comparação FormGroup vs. FormBuilder

| Aspecto                  | **FormGroup**                        | **FormBuilder**                    |
| ------------------------ | ------------------------------------ | ---------------------------------- |
| **Sintaxe**              | Verbosa, controle manual.            | Concisa, reduz código repetitivo.  |
| **Facilidade de uso**    | Ideal para formulários pequenos.     | Ideal para formulários maiores.    |
| **Criação de controles** | Feita com `FormControl` manualmente. | Feita com métodos como `fb.group`. |
| **Código**               | Mais explícito.                      | Mais dinâmico e eficiente.         |

## Quando Usar Cada Um?

- **Use `FormGroup`** se você prefere configurar cada aspecto do formulário manualmente e precisa de maior controle.
- **Use `FormBuilder`** se deseja simplificar a configuração do formulário, economizando tempo e tornando o código mais legível.
