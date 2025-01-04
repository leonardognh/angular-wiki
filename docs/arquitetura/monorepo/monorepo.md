---
sidebar_position: 4
---

# Monorepo

## O que é?

Uma única estrutura de repositório que contém múltiplos projetos ou pacotes relacionados. Pode incluir back-end, front-end, bibliotecas compartilhadas, etc.

**Vantagens**

Facilidade para compartilhar código entre projetos.

Controle centralizado de dependências.

Melhoria no gerenciamento de versionamento.

**Exemplo**

Usar **Nx** ou **Lerna** para gerenciar um monorepo Angular.

## **Estrutura Monorepo com Nx**

Gerencia o projeto como um todo, mas mantém cada funcionalidade modularizada.

```
apps/
├── cursos/
├── certificados/
├── perfil/
libs/
├── shared/  # Componentes reutilizáveis
```
