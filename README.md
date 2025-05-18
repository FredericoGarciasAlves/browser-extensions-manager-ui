# Frontend Mentor - Browser extensions manager UI solution

Este é um desafio do [Browser extensions manager UI challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/browser-extension-manager-ui-yNZnOfsMAp). Frontend Mentor challenges Ajuda você a melhorar as suas habilidades construindo projetos realistas.

## Table of contents

- [Visão-geral](#Visão-geral)
  - [O Desafio](#O-desafio)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [Meu processo](Meu-processo)
  - [Construido com](#Construido-com)
  - [O que eu aprendi](#O-que-eu-aprendi)
  - [Coisas a se fazer](#Coisas-a-se-fazer)
  - [Continuar desenvolvendo](#Continuar-desenvolvendo)
- [Autor](#Autor)

## Visão geral

Esse é um projeto de Lista de Estensões Ui é uma, envolve varias estensões que penso ser de um editor de códigos, adiciona em uma tabela abaixo do campo de pesquisa, esse modelo ofereceu somente logo light e a página tem que estar em inglês para poder usúfluir de suas totais funções.5

### O desafio

Os usuários devem ser capazes de:

- Alternar extensões entre os estados ativo e inativo

- Filtrar extensões ativas e inativas

- Remover extensões da lista

- Selecionar seu tema de cores

- Visualizar o layout ideal da interface conforme o tamanho da tela dispositivo

- Ver os estados :hover e :focus de todos os elementos interativos na página

### Screenshot

![](./assets/images/Screenshot%202025-05-18%20at%2020-06-27%20Browser%20extensions%20manager%20ui.png)

### Links

- Solution URL: [Browser extensions manager ui Frontend Mentor challenger junior](https://github.com/FredericoGarciasAlves/browser-extensions-manager-ui)
- Live Site URL: [Browser extensions manager ui Frontend Mentor challenger junior](https://fredericogarciasalves.github.io/browser-extensions-manager-ui/)

## Meu processo

Venho estudando des de março de 2024 com intervalos, mas vou falar um pouco mais recente comecei um curso de programação a mais ou menos dois meses e des de então eu aprendi 3 modulos o inicial de HTML e CSS e o basico de HTML, nessa nova faze de estudo não me apresei e busquei aprender afinco e descobri que HTML além de ser sobre estrutura, as tags que usamos com propósito (semântica) fala muito sobre acessibilidade e mecanismos de busca, o que se repetiu em todas as tags que pesquisei foi isso, tem umas com regras especificas de usar uma de cada vez, seu proposito esses por exemplo.

Nos ultimos dias basicamente foi isso, por estar somente estudando e a pratica ser de mínima, resolvi pesquisei esse projeto e escolhi fazelo, para me deparar com algo que eu não até então (pesquisar dentro do input em um banco de dados), e me deparei com ideias que fui fazendo. Nessa nova pegada em vez de fazer tudo a mão e ir pesquisando o que não sabia no JS resolvi usar IA para fazer, deu certo e foi uma boa experiência, não tive problemas em não saber precisamente o que estava fazendo na hora com o que tinha passado de informação para a IA conseguimos fazer um bom trabalho, nesse modelo de pratica usei uma pasta especificadamente para tentes para verificar se o que a IA estava me passando iria rodar na minha maquina e tudo funcionou direito.

Nesse projeto por estar focando em reaquecer as habilidades e desenvolver novas habilidades me deparei com coisas que nunca fiz e acabo que muito coisa eu não sabia o que fazia e qual concerteza (entendia o que a parte do codigo fazia e sabia que iria funcionar quando fosse aplicar na fonte), minha mente por incrivel que pareça está se adequando a responder bem em situações de estresse a isso.

No 4 dia quando no dia que fiz mais progresso com a IA me deparo com o final da tarde me perguntando se tinha em mente o projeto e fiquei só com explicações incompletas, quando um pouco mais tarde me pego lendo o código e vendo o que cada coisa fazia, por ter feito com a IA a explicação foi de bom prazer.

Com isso no outro dia foi um desprazer por estar com o projeto em finalização e um prazer por estar com o códigos em mãos

### Construido com

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid

### O que eu aprendi

```html
<h1>Some HTML code I'm proud of</h1>
```

```css
}

.main
  .box-select-extensions-list
  .container-btn-select-extensions-list
  .btn-select-extensions-list.inactive {
  background-color: var(--background-select-extensions-input-checkbox);
  color: var(--word-btn-select);
}


.main
  .box-select-extensions-list
  .container-btn-select-extensions-list
  .btn-select-extensions-list.active {
  background-color: var(--background-selected-extensions-input-checkbox);
  color: var(--word-btn-selected);
}
}
```

```js
box.hidden = checkbox.checked;

input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const first = containerExtensionsSearch.querySelector(".item");
      if (first) {
        const name = first.querySelector(".name").textContent;

        const item = dataList.find((d) => d.name === name);
        if (item) selectItem(item);
      }
    }
  });
};

let dataList = [];

  fetch("data.json")
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return res.json();
    })
    .then((json) => (dataList = json))
    .catch((err) => console.error("Falha ao buscar JSON:", err));

const buttons = document.querySelectorAll(".btn-select-extensions-list");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => {
        b.classList.remove("active");
        b.classList.add("inactive");
      });

      btn.classList.add("active");
    });
  });

  btnTheme.addEventListener("click", () => {
    const iconTheme = document.querySelector(".icon-theme");
    const isDark =
      document.documentElement.getAttribute("data-theme") === "dark";
    if (isDark) {
      document.documentElement.removeAttribute("data-theme");

      iconTheme.src = "./assets/images/icon-moon.svg";
      iconTheme.alt = "Icon Moon";
      iconExtensions.src = "./assets/images/logo.svg";
    } else {
      document.documentElement.setAttribute("data-theme", "dark");

      iconTheme.src = "./assets/images/icon-sun.svg";
      iconTheme.alt = "Icon Sun";
      iconExtensions.src = "./assets/images/logo-dark.svg";
    }
  });

  input.addEventListener("input", () => {
    const term = input.value.trim().toLowerCase();
    containerExtensionsSearch.innerHTML = "";

    if (!term) {
      containerExtensionsSearch.hidden = true;
      return;
    }

    const matches = dataList
      .filter((item) => item.name.toLowerCase().includes(term))
      .sort((a, b) => a.name.localeCompare(b.name));

    if (!matches.length) {
      containerExtensionsSearch.hidden = true;
      return;
    }

    matches.forEach((item) => {
      const div = document.createElement("div");
      div.className = "item";
      div.innerHTML = `
        <img src="${item.logo}" alt="${item.name} logo"/>
        <span class="name">${item.name}</span>
        <div class="desc-tooltip">${item.description}</div>
      `;
      div.addEventListener("click", () => selectItem(item));
      containerExtensionsSearch.appendChild(div);
    });
    containerExtensionsSearch.hidden = false;
  });

      const existingNames = Array.from(
      containerExtensionsList.querySelectorAll(".heading-title")
    ).map((el) => el.innerText);


```

### Coisas a se fazer

- Não tem box-shadow no mecanismo de busca e nem nas boxs extensions list no tema escuro, mas acho que sombra no escuro é um design meio zuado.
- Descrição na box de opções clicáveis (após pesquisa) quando paira o mouse por mais de 2 segundos.
- Ter acessibilidade no modo de tema escuro para pesssoas que são deficientes visuais, mas entra outro fato, se o site não é usado por longos periodos esse modo não se torna tão evidente.
- Aparecer uma mensagem quando não existir nem uma extensão quando clicado no botão de selecionar entre ativo, inativo e all

### Continuar desenvolvendo

Dependendo de como estiver se desenrolando o curso posso fazer um que eu já saiba ou praticar algo novo, hipotese é que eu faça algo novo

## Autor

- YouTube - [Valdevorte](https://www.youtube.com/@valdevorte2702)
- Frontend Mentor - [@FredericoGarciasAlves](https://www.frontendmentor.io/profile/FredericoGarciasAlves)
- Twitter - [@FredericoGA70](https://x.com/FredericoGA70)
- Facebook - [Fred Garcias](https://www.facebook.com/fred.garcias.1)
- instagram - [@fred_alves23](https://www.instagram.com/fred_alves23/)
- Linkedin - [frederico garcias alves](https://www.linkedin.com/in/frederico-garcias-alves-8730722b5/)
