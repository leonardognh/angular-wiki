---
sidebar_position: 3
---

# Micro Front-end

## O que é?

Divide uma aplicação grande em partes menores e independentes. Cada micro front-end pode ser desenvolvido, implantado e mantido separadamente. Comumente usado com frameworks como **Module Federation**.

**Vantagens**

Escalabilidade.

Equipes podem trabalhar de forma independente.

Desempenho otimizado com carregamento sob demanda.

**Exemplo de Uso**

Um site de e-commerce onde o carrinho, produtos e pagamentos são micro front-ends separados.

## Exemplo Integrado

Uma plataforma de ensino com áreas independentes para "Cursos", "Certificados" e "Perfil do Usuário".

## Configuração de Micro Front-end (Module Federation)

**App Principal**

Carrega os micro front-ends sob demanda.

```jsx showLineNumbers title="webpack.config.js"
module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        cursos: "cursos@http://localhost:4201/remoteEntry.js",
        certificados: "certificados@http://localhost:4202/remoteEntry.js",
      },
    }),
  ],
};
```
