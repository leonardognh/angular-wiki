---
sidebar_position: 1
---

# WCAG

## O que é?

WCAG (Web Content Accessibility Guidelines) são diretrizes internacionais para garantir que conteúdos na web sejam acessíveis a todos, incluindo pessoas com deficiências. Mantidas pelo **World Wide Web Consortium (W3C)**, as diretrizes possuem três níveis de conformidade

- **A:** Requisitos mínimos.

- **AA:** Requisitos mais amplos (recomendado).

- **AAA:** Conformidade avançada (para casos específicos).

## Princípios Fundamentais (POUR)

### Perceptível (Perceivable)

A informação deve ser apresentada de forma que todos possam percebê-la. Alternativas textuais para imagens (`alt` em `<img>`). Legendas para vídeos. Contraste adequado entre texto e fundo.

### Operável (Operable)

A interface deve ser navegável e utilizável por todos. Navegação por teclado. Evitar elementos que causem convulsões (ex.: animações piscantes). Botões grandes e fáceis de clicar.

### Compreensível (Understandable)

O conteúdo e os controles devem ser fáceis de entender. Formulários com rótulos claros. Mensagens de erro detalhadas. Linguagem simples e direta.

### Robusto (Robust)

O conteúdo deve ser interpretável por tecnologias assistivas (ex.: leitores de tela). Uso de HTML semântico. Testes com leitores de tela.

### Níveis de Conformidade

| **Nível** | **Descrição**                                                    | **Exemplo**                                             |
| --------- | ---------------------------------------------------------------- | ------------------------------------------------------- |
| **A**     | Garantia básica de acessibilidade.                               | Texto alternativo para imagens.                         |
| **AA**    | Requisitos intermediários que cobrem a maioria das necessidades. | Contraste adequado (mínimo de 4.5:1 para texto normal). |
| **AAA**   | Conformidade avançada para atender necessidades específicas.     | Contraste elevado (mínimo de 7:1).                      |

## Boas Práticas

### Imagens

Adicione descrições significativas com o atributo `alt`.

```html
<img src="foto.jpg" alt="Paisagem de uma montanha ao pôr do sol" />
```

### Formulários

Use rótulos claros e conecte-os aos campos usando o atributo `for`.

```html
<label for="nome">Nome:</label> <input type="text" id="nome" name="nome" />
```

### Navegação por Teclado

Certifique-se de que todos os elementos interativos sejam acessíveis via teclado. Use o atributo `tabindex` para definir a ordem de tabulação.

### Contraste de Cor

Certifique-se de que o contraste entre o texto e o fundo seja suficiente. Use ferramentas como Contrast Checker para verificar o contraste.

### Leitores de Tela

Teste a aplicação com leitores de tela como JAWS, NVDA ou VoiceOver. Use o atributo `aria-label` para fornecer descrições adicionais:

```html
<button aria-label="Enviar formulário">Enviar</button>
```

### HTML Semântico

Use elementos HTML apropriados para cada conteúdo (ex.: `<header>`, `<nav>`, `<article>`).

```html
<nav>
  <ul>
    <li><a href="#inicio">Início</a></li>
    <li><a href="#sobre">Sobre</a></li>
  </ul>
</nav>
```

### Exemplo Prático de Página Acessível

```html
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Página Acessível</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        color: #333;
        background-color: #fff;
      }
      .alto-contraste {
        color: #fff;
        background-color: #000;
      }
    </style>
  </head>
  <body>
    <header>
      <h1>Bem-vindo à Página Acessível</h1>
    </header>
    <main>
      <section>
        <h2>Formulário de Contato</h2>
        <form>
          <label for="nome">Nome:</label>
          <input type="text" id="nome" name="nome" />

          <label for="email">Email:</label>
          <input type="email" id="email" name="email" />

          <button type="submit">Enviar</button>
        </form>
      </section>
      <section>
        <h2>Descrição da Imagem</h2>
        <img src="paisagem.jpg" alt="Paisagem de uma montanha ao pôr do sol" />
      </section>
    </main>
    <footer>
      <p>&copy; 2025 Todos os direitos reservados.</p>
    </footer>
  </body>
</html>
```

## Ferramentas para Avaliar Acessibilidade

- **Extensões para Navegadores**

WAVE: Identifica problemas de acessibilidade.

Lighthouse: Disponível no Chrome DevTools.

- **Ferramentas Online**

AXE Accessibility: Teste de acessibilidade automatizado.

- **Leitores de Tela**

JAWS, NVDA (Windows).

VoiceOver (MacOS).
