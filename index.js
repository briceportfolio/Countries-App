const inputSearch = document.getElementById("inputSearch");
const inputRange = document.querySelector("#inputRange");
const countriesContainer = document.querySelector(".countries-container");
const btnSort = document.querySelectorAll(".btnSort");
let countriesData = [];
let sortMethod = "alpha";

// **********FUNCTIONS*************************

// fonction fetch
const fetchCountries = async () => {
  await fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((data) => {
      countriesData = data;
      countriesDisplay();
    });
};
//  fonction affichage avec filter, sort et sliced
function countriesDisplay() {
  countriesContainer.innerHTML = countriesData
    // methode filter reliée a la valeur saisie dans l input text
    .filter((country) =>
      country.translations.fra.common
        .toLowerCase()
        .includes(inputSearch.value.toLowerCase())
    )
    // structure methode sort
    .sort((a, b) => {
      if (sortMethod === "maxToMin") {
        return b.population - a.population;
      } else if (sortMethod === "minToMax") {
        return a.population - b.population;
      } else if (sortMethod === "alpha") {
        return a.translations.fra.common.localeCompare(
          b.translations.fra.common
        );
      }
    })
    // methode slice reliée a la valeur du curseur d'affichage des cards
    .slice(0, inputRange.value)
    // structure du map qui represente les elements de l api extraits par le fetch pour l affichage
    .map(
      (country) =>
        `
      <div class="card">
          <img src=${country.flags.svg} alt="drapeau ${
          country.translations.fra.common
        }">
          <h2>${country.translations.fra.common}</h2>
          <h3>${country.capital}</h3>
          <p> Population : ${country.population.toLocaleString()}</p>
      </div>
            `
    )
    .join("");
}

// *******************EVENT*****************************

window.addEventListener("load", fetchCountries);
inputSearch.addEventListener("input", countriesDisplay);
// event lié au curseur pour le nombre de cartes affichées
inputRange.addEventListener("input", () => {
  countriesDisplay();
  rangeValue.textContent = inputRange.value;
});
// eventlistener pour la methode sort reliée au btn
btnSort.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    sortMethod = e.target.id;
    countriesDisplay();
  });
});
