---
sidebar_position: 9
---

# Módulos

# O que é?

Módulos organizam a aplicação em partes menores, facilitando a manutenção e o carregamento de funcionalidades específicas. O Angular utiliza módulos para agrupar componentes, diretivas, serviços e pipes.

**`AppModule`** é o módulo raiz, mas aplicações grandes devem ser divididas em módulos funcionais ou de recursos (features).

```tsx showLineNumbers
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MeuComponente } from "./meu-componente.component";

@NgModule({
  declarations: [MeuComponente],
  imports: [CommonModule],
  exports: [MeuComponente],
})
export class MeuModulo {}
```

## Tipos de Módulos

**Módulo Raiz (`AppModule`)**

Contém o bootstrap do aplicativo.

**O que é o Bootstrap no Angular?**

No Angular, Bootstrap se refere ao processo de inicialização do aplicativo. É o ponto de entrada principal onde o Angular começa a carregar e executar o código. Ele especifica qual componente será renderizado primeiro na aplicação.

```tsx showLineNumbers
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

**Módulos Funcionais (Features)**

Isolam funcionalidades específicas.

```tsx showLineNumbers
@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule],
})
export class DashboardModule {}
```

**Módulo Compartilhado (`SharedModule`)**

Contém componentes, diretivas e pipes reutilizáveis.

```tsx showLineNumbers
@NgModule({
  declarations: [BotaoComponent],
  imports: [CommonModule],
  exports: [BotaoComponent],
})
export class SharedModule {}
```

**Módulo Core (`CoreModule`)**

Contém serviços e lógica global, como interceptadores e autenticação.

```tsx showLineNumbers
@NgModule({
  providers: [AuthService],
})
export class CoreModule {}
```

## Carregamento de Módulos

- **Carregamento Eager**

Módulos carregados na inicialização da aplicação. Importar no `AppModule`.

- **Carregamento Lazy**

Módulos carregados sob demanda. Configurado nas rotas com `loadChildren`.
