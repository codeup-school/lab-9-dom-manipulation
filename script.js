document.addEventListener("DOMContentLoaded", () => {
  const lista = document.querySelector("#listaCervecerias");

  let currentPage = 1;

  function getBadgeColor(type) {
    if (type === "micro") {
      return `<div class="micro">${type}</div>`;
    } else if (type === "brewpub") {
      return `<div class="brewpub">${type}</div>`;
    } else {
      return `<div class="generic">${type}</div>`;
    }
  }

  async function loadBreweries() {
    try {
      const respuesta = await fetch(
        "https://api.openbrewerydb.org/v1/breweries?per_page=6"
      );
      const cervecerias = await respuesta.json();

      console.log(cervecerias);

      lista.innerHTML = ""; // Limpiar la lista antes de añadir nuevos elementos

      cervecerias.forEach((cerveceria) => {
        lista.innerHTML += `<div class="brewery">
            <h2 style="text-align: center">${cerveceria.name}</h2>
            <p>${cerveceria.address_1}</p>
            ${getBadgeColor(cerveceria.brewery_type)}
            <button id="${
              cerveceria.id
            }" class="navigateButton">Ver cervecería</button>
        </div>`;
      });

      const buttons = document.querySelectorAll(".navigateButton");

      buttons.forEach((button) => {
        button.addEventListener("click", (e) => {
          const id = e.target.getAttribute("id");
          localStorage.setItem("brewery_id", id);
          window.location.href = "/brewery.html";
        });
      });
    } catch (error) {
      console.error("Error al cargar las cervecerías:", error);
    }
  }

  const nextPageButton = document.querySelector("#nextPage");

  nextPageButton.addEventListener("click", async () => {
    currentPage += 1;
    const res = await fetch(
      `https://api.openbrewerydb.org/v1/breweries?page=${currentPage}&per_page=6`
    );
    const finalRes = await res.json();
    lista.innerHTML = ""; // Limpiar la lista antes de añadir nuevos elementos

    finalRes.forEach((cerveceria) => {
      lista.innerHTML += `<div class="brewery">
            <h2 style="text-align: center">${cerveceria.name}</h2>
            <p>${cerveceria.address_1}</p>
            ${getBadgeColor(cerveceria.brewery_type)}
            <button class="navigateButton">Ver cervecería</button>
        </div>`;
    });
    const buttons = document.querySelectorAll(".navigateButton");

    buttons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const id = e.target.getAttribute("id");
        localStorage.setItem("brewery_id", id);
        window.location.href = "/brewery.html";
      });
    });
  });

  loadBreweries();
});
