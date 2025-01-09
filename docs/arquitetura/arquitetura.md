---
sidebar_position: 1
---

# Arquitetura

## Boas Práticas

### Princípios S.O.L.I.D.

- **Single Responsibility Principle (SRP)**

  Cada classe ou componente deve ter uma única responsabilidade.

  **Exemplo:** Um serviço para chamadas HTTP, outro para lógica de autenticação.

- **Open/Closed Principle**

  Código deve estar aberto para extensão, mas fechado para modificação.

  **Exemplo:** Usar interfaces para adicionar novas funcionalidades sem alterar classes existentes.

- **Liskov Substitution Principle**

  Objetos de uma classe base devem poder ser substituídos por objetos de suas subclasses sem problemas.

  **Exemplo:** Serviços devem respeitar contratos definidos por interfaces.

- **Interface Segregation Principle**

  Divida grandes interfaces em interfaces menores e específicas.

  **Exemplo:** Evitar uma única interface para diferentes responsabilidades.

- **Dependency Inversion Principle**

  Componentes de alto nível não devem depender de componentes de baixo nível diretamente.

  **Exemplo:** Injete serviços usando interfaces e o sistema de injeção de dependência do Angular.

### Uso de Módulos

- **Modularize sua aplicação**

  Módulo Core: Serviços e configurações globais.

  Módulo Shared: Componentes reutilizáveis.

  Módulos Funcionais: Funcionalidades específicas.

  **Benefício**

  Melhor separação de responsabilidades e carregamento sob demanda.

### Componentização

- **Componentes Pequenos:**

  Divida componentes grandes em menores.

  Cada componente deve ter uma única responsabilidade.

- **Use Inputs e Outputs:**

  Facilite a comunicação entre componentes pais e filhos.

  Evite acessar diretamente métodos ou propriedades de componentes filhos.

- **Evite Lógica no Template:**

  Prefira métodos ou propriedades no componente.

### Gerenciamento de Estado

Use um sistema reativo (ex.: NgRx) para estados globais.

Use `BehaviorSubject` ou serviços para estados locais.

### Testes

- **Unitários:** Garanta que funções e componentes funcionem isoladamente.

- **E2E:** Garanta que sua interface funciona.

- **Integração:** Teste a comunicação entre componentes e serviços.
