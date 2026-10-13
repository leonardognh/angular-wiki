---
sidebar_position: 1
title: "Introdução ao Angular Wiki"
description: "Visão geral do Angular Wiki em pt-BR: versão Angular 16 (atual), snapshot 15 e como navegar na documentação."
keywords: [angular, wiki, documentação, pt-BR]
---

# Introdução ao Angular Wiki

Bem-vindo. Este site reúne **guias e referências** sobre o **Angular** (framework TypeScript do Google) em **português brasileiro**, com foco em quem precisa **aprender**, **revisar** ou **comparar** abordagens na prática do dia a dia.

---

## O que é?

O **Angular Wiki** é uma documentação comunitária construída com [Docusaurus 3.7](https://docusaurus.io/), com suporte a exemplos e organização em seções (componentes, rotas, formulários, SSR, testes, arquitetura, etc.).

O conteúdo não substitui a [documentação oficial](https://angular.dev); ela complementa com **explicações em pt-BR**, tabelas de evolução por versão e links internos entre tópicos do próprio wiki.

**Versão da documentação (Docusaurus):** o menu superior permite escolher **Angular 16** (árvore viva em `docs/`, padrão do site) ou **Angular 15** (snapshot congelado em `versioned_docs/version-15.0.0/`). O texto da v16 assume **Angular 16.x** como piso de exemplos; menções a v17+ aparecem com callout quando a API diverge.

Leia [Escopo e versionamento](./escopo-versoes.md) e o [Guia Angular 16](./guia-angular-16.md) antes de contribuir.

---

## Para que serve?

- **Onboarding:** entender conceitos centrais (componentes, DI, rotas, formulários) em uma narrativa única.
- **Upgrade e manutenção:** localizar o que mudou entre majors e onde isso aparece no código (signals, control flow, SSR, etc.).
- **Arquitetura:** ver padrões como monorepo, micro front-end, CI/CD e performance ao lado dos fundamentos do framework.

Se você busca apenas a API oficial palavra por palavra, use o **angular.dev**; se busca **contexto em português** e encadeamento de tópicos, use este wiki.

---

## Quando usar?

Use este wiki quando:

- Estiver **começando** e quiser um mapa das áreas do framework antes de mergulhar nos detalhes.
- Já for **intermediário** e quiser comparar abordagens (por exemplo, reactive forms vs template-driven, ou Observables vs signals em um trecho específico).
- For **avançado** e precisar de uma página âncora (SSR, NgRx, testes) para alinhar o time antes de ir ao código-fonte ou RFCs.

---

## Como navegar

1. **Seletor de versão (Angular 16 / Angular 15):** troca a **árvore inteira** de artigos. O padrão ao abrir “Documentação” é **Angular 16**.
2. **Barra lateral:** autogerada a partir da pasta da versão ativa (`docs/` ou `versioned_docs/...`).
3. **Escopo de versões** (link na barra): política de versionamento e diferenças 15 × 16.
4. **Links “Veja também”:** no fim de muitos artigos, apontam para páginas **da mesma versão** que você está lendo.

---

## O que esperar dos artigos

Os textos seguem uma convenção comum:

- Seções como **O que é?**, **Para que serve?**, **Quando usar?**, **Sintaxe / API**, **Exemplos**, **Boas práticas** e **Erros comuns** (quando fizer sentido).
- **Menção explícita da major** do Angular quando uma feature foi introduzida, depreciada ou está em preview.
- Exemplos **standalone-first** (padrão recomendado desde a era dos standalone applications); uso de `NgModule` aparece como **legado** quando necessário.

---

## Stack e ferramentas do próprio site

| Item            | Detalhe                                      |
| --------------- | -------------------------------------------- |
| Gerador         | Docusaurus 3.7 (preset classic)              |
| Idioma do site  | pt-BR (`defaultLocale`)                      |
| Live code       | `@docusaurus/theme-live-codeblock`         |
| Hospedagem      | GitHub Pages (veja o repositório do projeto) |

---

## Contribuindo (visão geral)

Melhorias são bem-vindas: correções de typos, exemplos que compilam, tabelas de evolução por versão e links para a documentação oficial. Ao escrever:

- Mantenha **pt-BR**; termos consagrados em inglês (component, pipe, signal) são aceitos.
- Indique a **versão mínima** do Angular quando o exemplo não for universal.
- Evite conteúdo que misture **AngularJS 1.x** com Angular 2+ sem deixar isso explícito.

---

## Evolução por versão (panorama do wiki)

| Destino no menu | Conteúdo                                                 |
| ----------------- | -------------------------------------------------------- |
| Angular 16        | Linha atual: guias alinhados à major 16 e notas v17+   |
| Angular 15        | Snapshot histórico; pode divergir do texto atual        |

Para o que há de **específico na major 16**, abra o [Guia Angular 16](./guia-angular-16.md). Para **política de snapshots**, abra [Escopo e versionamento](./escopo-versoes.md).

---

## Boas práticas para leitores

- Alinhe a **versão do Node** e do **Angular CLI** com o que o time usa; o artigo [Primeiros passos](./primeiros-passos.md) resume instalação.
- Ao copiar exemplo, verifique **imports** e a **major mínima** indicada no artigo.
- Em dúvida sobre suporte LTS, consulte a página oficial de releases (link na página de escopo).

---

## Erros comuns

- Tratar o wiki como **fonte normativa** de breaking changes — a palavra final é o changelog e o guia de update oficiais.
- Assumir que todo exemplo roda na **mesma major** que a sua sem ler o parágrafo de versão.
- Ignorar avisos de **preview** ou **experimental** em features novas.

---

## Perguntas frequentes

**Por que existe snapshot Angular 15?**  
Para preservar o material **como estava** no corte `15.0.0` enquanto a linha **Angular 16** evolui em `docs/`. Não espere atualizações frequentes no snapshot 15.

**Onde está o guia só da v16?**  
Na página [Guia Angular 16](./guia-angular-16.md), com links para o restante da árvore atual.

**O wiki duplica a documentação oficial?**  
Não. O objetivo é **curadoria em pt-BR**, encadeamento entre tópicos e exemplos alinhados ao que equipes brasileiras costumam precisar em code review e migração.

**Posso sugerir um tópico só da minha major?**  
Sim, desde que o texto deixe claro o **mínimo de versão** e não exija um snapshot inteiro do site só para isso — na maioria dos casos, uma seção “Evolução por versão” dentro do artigo existente resolve melhor.

**Onde está o código-fonte deste site?**  
No repositório público do projeto **angular-wiki** no GitHub da organização indicada no rodapé / URL do deploy; use issues e pull requests por lá.

---

## Comparação rápida: wiki vs documentação oficial

| Critério              | Angular Wiki (este site)     | angular.dev (oficial)     |
| --------------------- | ---------------------------- | ------------------------- |
| Idioma                | pt-BR                        | Principalmente inglês     |
| Norma de breaking     | Referência, não canônica     | Canônica                  |
| Organização           | Árvore fixa do repositório   | IA e busca oficiais       |
| Exemplos              | Curados pelo repositório     | Exemplos oficiais         |

---

## Glossário mínimo

- **Major:** primeira parte do semver do Angular (ex.: `21.0.0` → major 21).
- **Standalone:** componente ou rota que não declara `NgModule` como peça obrigatória do arranjo.
- **Control flow:** sintaxe `@if`, `@for`, `@switch` em templates (**a partir do Angular 17**; na v16 use `*ngIf` / `*ngFor` ou planeje upgrade).
- **Signal:** primitivo reativo (`signal()`, `computed()`, `effect()`) — evolução forte a partir da v16.

---

## Veja também

- [Escopo e versionamento](./escopo-versoes.md)
- [Guia Angular 16](./guia-angular-16.md)
- [Primeiros passos](./primeiros-passos.md)
- [Estrutura do projeto](./estrutura-projeto/estrutura-projeto.md)
