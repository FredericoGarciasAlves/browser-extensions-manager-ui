document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("input-extensions");
  const containerExtensionsSearch = document.querySelector(
    ".container-extensions-search"
  );
  const containerExtensionsList = document.querySelector(
    ".container-extensions-list"
  );
  const btnRem = document.querySelectorAll(".btn-remove");
  const boxExtensionsList = document.getElementsByClassName(
    "box-extensions-list"
  );
  let arrayBoxExtensionsList = Array.from(boxExtensionsList);

  const btnSelectExtensionsListAll = document.getElementById(
    "btn-select-extensions-list-all"
  );
  const btnSelectExtensionsListActive = document.getElementById(
    "btn-select-extensions-list-active"
  );
  const btnSelectExtensionsListInactive = document.getElementById(
    "btn-select-extensions-list-inactive"
  );

  const btnSelectExtensionsList = document.querySelectorAll(
    ".btn-select-extensions-list-all"
  );

  const btnTheme = document.getElementById("btn-theme");
  // Se quiser manter a escolha ao recarregar:
  //   const saved = localStorage.getItem("theme");
  //   if (saved === "dark") document.documentElement.setAttribute("data-theme", "dark");

  btnTheme.addEventListener("click", () => {
    const iconTheme = document.querySelector(".icon-theme");
    const isDark =
      document.documentElement.getAttribute("data-theme") === "dark";
    if (isDark) {
      document.documentElement.removeAttribute("data-theme");

      iconTheme.src = "./assets/images/icon-moon.svg";
      iconTheme.alt = "Icon Moon";
      // localStorage.removeItem("theme");
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      // localStorage.setItem("theme", "dark");
      iconTheme.src = "./assets/images/icon-sun.svg";
      iconTheme.alt = "Icon Sun";
    }
  });
  // Evento Listener de click no nos botões remove

  btnRem.forEach((elemnt, i) => {
    elemnt.addEventListener("click", () => {
      arrayBoxExtensionsList[i].remove();
    });
  });

  // Btn filters
  btnSelectExtensionsListActive.addEventListener("click", () => {
    const boxExtensionsListActive = document.getElementsByClassName(
      "box-extensions-list"
    );
    let arrayBoxExtensionsListActive = Array.from(boxExtensionsListActive);
    arrayBoxExtensionsListActive.forEach((box) => {
      const checkbox = box.querySelector('input[type="checkbox"]');
      if (checkbox) {
        box.hidden = !checkbox.checked;
      }
    });
  });

  btnSelectExtensionsListInactive.addEventListener("click", () => {
    const boxExtensionsListInactive = document.getElementsByClassName(
      "box-extensions-list"
    );
    let arrayBoxExtensionsListInactive = Array.from(boxExtensionsListInactive);
    arrayBoxExtensionsListInactive.forEach((box) => {
      // Seleciona especificadamente o input type checkbox da caixa box-extensions-list
      const checkbox = box.querySelector('input[type="checkbox"]');
      if (checkbox) {
        // O atributo hidden esconde ou não esconde com base no valor booleano
        box.hidden = checkbox.checked;
      }
    });
  });

  btnSelectExtensionsListAll.addEventListener("click", () => {
    const boxExtensionsListAll = document.getElementsByClassName(
      "box-extensions-list"
    );
    let arrayBoxExtensionsListAll = Array.from(boxExtensionsListAll);
    arrayBoxExtensionsListAll.forEach((box) => {
      const checkbox = box.querySelector('input[type="checkbox"]');
      if (checkbox) {
        box.hidden = false;
      }
    });
  });
  const buttons = document.querySelectorAll(".btn-select-extensions-list");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // remove active de todos
      buttons.forEach((b) => {
        b.classList.remove("active");
        b.classList.add("inactive");
      });
      // adiciona active só no clicado
      btn.classList.add("active");
    });
  });
  let dataList = []; // vai armazenar o JSON inteiro

  // 1) Fetch uma vez e guarde em dataList
  fetch("data.json")
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return res.json();
    })
    .then((json) => (dataList = json))
    .catch((err) => console.error("Falha ao buscar JSON:", err));

  // 2) Listener de keydown registrado só uma vez
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const first = containerExtensionsSearch.querySelector(".item");
      if (first) {
        const name = first.querySelector(".name").textContent;
        // find funciona com .find((elemento, index, array) => ) Nesse caso ele buscou o elemento no banco de dadose faz um boolean e retorna o objeto de comparação do boolean no caso o d.name
        const item = dataList.find((d) => d.name === name); // aqui ele retorna o objeto inteiro {
        //     "logo": "./assets/images/logo-devlens.svg",
        //     "name": "DevLens",
        //     "description": "Quickly inspect page layouts and visualize element boundaries.",
        //     "isActive": true
        // }
        if (item) selectItem(item);
      }
    }
  });

  // 3) Handler de input: filtra dataList e renderiza sugestões
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

  function selectItem(item) {
    const card = document.createElement("div");
    card.className = "box-extensions-list box-extensions-list-light";
    card.innerHTML = `
      <div class="heading-box-extensions-list">
        <div class="logo-container">
          <img class="icon-box-extensions-list" src="${item.logo}" alt="${
      item.name
    } logo"/>
        </div>
        <div class="container-description">
          <p class="heading-title heading-title-light">${item.name}</p>
          <p class="heading-paragrath heading-paragrath-light">${
            item.description
          }</p>
        </div>
      </div>
      <div class="footer-box-extensions-list">
        <button type="button" class="btn-remove btn-remove-light">Remove</button>
        <label for="toggle-switch-${item.name}" class="toggle-switch">
          <input  class="input-checkbox input-checkbox-light" id="toggle-switch-${
            item.name
          }" name="inactive-active-input-${item.name}" type="checkbox" ${
      item.isActive ? "checked" : ""
    }/>
          <span class="slider slider-light"></span>
        </label>
      </div>
    `;
    card
      .querySelector(".btn-remove")
      .addEventListener("click", () => card.remove());
    card
      .querySelector('input[type="checkbox"]')
      .addEventListener("change", (e) => {
        item.isActive = e.target.checked;
      });
    // 1. Pega todos os títulos já existentes como strings
    const existingNames = Array.from(
      containerExtensionsList.querySelectorAll(".heading-title")
    ).map((el) => el.innerText);

    // 2. Se ainda não existir um card com este nome, adiciona
    if (!existingNames.includes(item.name)) {
      containerExtensionsList.appendChild(card);
    }

    input.value = "";
    containerExtensionsSearch.hidden = true;
  }
});
