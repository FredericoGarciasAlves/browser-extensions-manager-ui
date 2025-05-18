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

  const iconExtensions = document.querySelector(".icon-extensions");

  const btnTheme = document.getElementById("btn-theme");

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

  btnRem.forEach((elemnt, i) => {
    elemnt.addEventListener("click", () => {
      arrayBoxExtensionsList[i].remove();
    });
  });

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
      const checkbox = box.querySelector('input[type="checkbox"]');
      if (checkbox) {
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
      buttons.forEach((b) => {
        b.classList.remove("active");
        b.classList.add("inactive");
      });

      btn.classList.add("active");
    });
  });
  let dataList = [];

  fetch("data.json")
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return res.json();
    })
    .then((json) => (dataList = json))
    .catch((err) => console.error("Falha ao buscar JSON:", err));

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

    const existingNames = Array.from(
      containerExtensionsList.querySelectorAll(".heading-title")
    ).map((el) => el.innerText);

    if (!existingNames.includes(item.name)) {
      containerExtensionsList.appendChild(card);
    }

    input.value = "";
    containerExtensionsSearch.hidden = true;
  }
});
