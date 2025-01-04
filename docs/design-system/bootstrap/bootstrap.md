---
sidebar_position: 1
---

# Bootstrap

## O que é?

Bootstrap é um framework CSS que oferece estilos prontos e componentes responsivos. Ele é amplamente usado por sua simplicidade e suporte a dispositivos móveis.

## Como Utilizar?

### Instalação

```plaintext
npm install bootstrap
```

### Configuração

Adicione o CSS no arquivo `angular.json`.

```json
"styles": [
  "node_modules/bootstrap/dist/css/bootstrap.min.css",
  "src/styles.css"
]
```

## Componentes Úteis no Bootstrap

- Grid System (Responsividade)

  ```html
  <div class="row">
    <div class="col-md-6">Coluna 1</div>
    <div class="col-md-6">Coluna 2</div>
  </div>
  ```

- Botões

  ```html
  <button class="btn btn-primary">Botão Primário</button>
  <button class="btn btn-secondary">Botão Secundário</button>
  ```

- Formulários

  ```html
  <form>
    <div class="mb-3">
      <label for="email" class="form-label">Email</label>
      <input
        type="email"
        class="form-control"
        id="email"
        placeholder="Digite seu email"
      />
    </div>
    <button type="submit" class="btn btn-success">Enviar</button>
  </form>
  ```

**Vantagens**

- Simplicidade na integração.
- Sistema de grade poderoso.
- Ampla documentação e comunidade.
