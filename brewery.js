document.addEventListener("DOMContentLoaded", () => {
  const id = localStorage.getItem("brewery_id");

  async function getBrewery(id) {
    const res = await fetch(
      `https://api.openbrewerydb.org/v1/breweries?by_ids=${id}`
    );
    const finalRes = await res.json();
    document.querySelector("h1").innerHTML = finalRes[0].name;

    console.log(finalRes);
  }

  getBrewery(id);
});
