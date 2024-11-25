# TaskFlow

## Índice

- [Visão geral](#visão-geral)
  - [O desafio](#o-desafio)
  - [Captura de tela](#screenshot)
- [Instalação](#instalação)
- [O meu processo](#meu-processo)
  - [Construído com](#construído-com)
  - [O que aprendi](#o-que-aprendi)
  - [Recursos úteis](#recursos-úteis)
- [Autor](#autor)

## [Visão geral](#overview)

Este é um aplicativo de gerenciamento de tarefas inspirado em um design pré-definido, desenvolvido para oferecer uma interface responsiva e interativa. Ele permite que os usuários gerenciem quadros e tarefas de forma eficiente, com suporte a criação, leitura, atualização e exclusão (CRUD). Além disso, inclui recursos adicionais, como persistência de dados para melhorar a experiência do usuário.

### O desafio

Os usuários devem ser capazes de:

- Visualize o layout ideal para o aplicativo, dependendo do tamanho da tela do dispositivo
- Veja estados de hover para todos os elementos interativos na página
- Criar, ler, atualizar e excluir quadros e tarefas
- Receba validações de formulário ao tentar criar/editar quadros e tarefas
- Ocultar/mostrar a barra lateral da placa
- Permitir que os usuários arrastem e soltem tarefas para alterar seu status e reordená-las em uma coluna

### Captura de tela

<img src="./public/print-project.PNG" alt="print project" height="400" width="auto" />

### Instalação

- Realizar clone do projeto

```
  git clone https://github.com/Ailson12/task-flow
```

- Instalar as depêndencias

```
  npm install
```

- Iniciar o projeto

```
  npm run dev
```

## Meu processo

- **Ferramentas**: Visual Studio Code e Github.
- **Tecnologias**: JavaScript (Node.js, React).
- **Ciclo**: Planejamento, Implementação, Testes, Revisão.
- **Qualidade**: Testes automatizados

### Construído com

- Marcação HTML5 semântica
- CSS Flexbox, Grid
- [Vite](https://vitejs.dev/) - ambiente de desenvolvimento
- [React](https://reactjs.org/) - Biblioteca JS
- [Vitest](https://vitest.dev/) - Test Runner
- [Zustand](https://docs.pmnd.rs/) - Gerenciar estados globais
- [Styled Components](https://styled-components.com/) - Para estilos
- [React Testing Library](https://testing-library.com/) - Biblioteca de testes
- [MSW (Mock Service Worker)](https://mswjs.io/) - Interceptar requisições e simular dados

### O que aprendi

**Mais afinidade com a biblioteca @testing-library**

```js
import { Text } from './index'
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

describe("<Text />", () => {
 it('should accept fontSize as a number and convert to rem', () => {
    const SIZE = 22

    render(<Text size={SIZE}>Lorem ipsum dolor sit amet.</Text>)
    const text = screen.getByText(/lorem ipsum/i)
    const fontSize = text.style.getPropertyValue('font-size')

    // check is rem
    expect(fontSize).toEqual(expect.stringContaining('rem'))

    // check if it converted correctly
    expect(pxToRem(SIZE)).toStrictEqual(fontSize)
  })
});
```

### Recursos úteis

- [Mock Service Worker](https://mswjs.io/) Isto ajudou-me porque é possível simular os retornos das apis, o que é muito utíl durante os testes unitários

## Autor

- [Ver Portifólio](https://ailson12.github.io/portifolio/)
- [Ver Linkedin](https://www.linkedin.com/in/ailson-feitosa/)
