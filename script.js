const url = "https://pokeapi.co/api/v2/pokemon/";

const coloType = Object.freeze({
  bug: "#26de81",
  dragon: "#ffeaa7",
  electric: "#fed330",
  fairy: "#FF0069",
  fighting: "#30336b",
  fire: "#f0932b",
  flying: "#81ecec",
  grass: "#00b894",
  ground: "#EFB549",
  ghost: "#a55eea",
  ice: "#74b9ff",
  normal: "#95afc0",
  poison: "#6c5ce7",
  psychic: "#a29bfe",
  rock: "#2d3436",
  water: "#0190FF",
});

const pokemonCard = document.querySelector(".card");
const pokemonImg = pokemonCard.querySelector("img");
const pokemonName = pokemonCard.querySelector(".pokemon_name");
const pokemonHP = pokemonCard.querySelector(".hp");
const pokemonTypes = pokemonCard.querySelector(".types");
const pokemonStats = pokemonCard.querySelectorAll(".stats h3");
const btn = document.querySelector(".btn");

const getPokemon = async (url, id) => {
  try {
    const link = `${url}${id}`;
    console.log(link);
    const response = await fetch(link);

    if (!response.ok) throw new Error("Request Failed");

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

const generatePokemon = async () => {
  const id = Math.floor(Math.random() * 150) + 1;
  const pokemonData = await getPokemon(url, id);
  generateCard(pokemonData);
};

const generateCard = (data) => {
  pokemonHP.lastChild.nodeValue = data.stats[0].base_stat;
  pokemonName.textContent = data.name;
  pokemonImg.src = data.sprites.other.dream_world.front_default;
  pokemonStats[0].textContent = data.stats[1].base_stat;
  pokemonStats[1].textContent = data.stats[2].base_stat;
  pokemonStats[2].textContent = data.stats[5].base_stat;

  const themeColor = coloType[data.types[0]?.type?.name] || "#5a7acd";

  pokemonTypes.innerHTML = "";

  data.types.forEach((item) => {
    const span = document.createElement("span");
    span.appendChild(document.createTextNode(item.type.name));
    span.style.background = themeColor;
    pokemonTypes.appendChild(span);
  });

  pokemonCard.style.background = `
    radial-gradient(
        circle at 50% 0%,
        ${themeColor} 36%,
        var(--white-color) 36%
    `;
  pokemonCard.style.setProperty("--primary-color", themeColor);
};

const init = () => {
  btn.addEventListener("click", generatePokemon);
  document.addEventListener("DOMContentLoaded", generatePokemon);
};

init();
