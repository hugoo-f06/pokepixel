import "./style.css";
import { fetchJson } from "./api.js";
import { setupAutocomplete } from "./autocomplete.js";

const statusElement = document.querySelector("#status");
const pokemonImage = document.querySelector("#pokemon-image");
const pokemonCanvas = document.querySelector("#pokemon-canvas");
const context = pokemonCanvas.getContext("2d");
const guessForm = document.querySelector("#guess-form");
const guessInput = document.querySelector("#guess-input");
const attemptsElement = document.querySelector("#attempts");

const pixelLevels = [8, 12, 16, 32, 64, 128];
const maxAttempts = pixelLevels.length;

let attemptsUsed = 0;
let gameFinished = false;

let currentPokemon = null;
let pokemonNames = [];

function drawPokemon(resolution) {
	pokemonCanvas.width = resolution;
	pokemonCanvas.height = resolution;

	context.drawImage(
		pokemonImage,
		0,
		0,
		pokemonCanvas.width,
		pokemonCanvas.height,
	);
}

function finishGame(message) {
	gameFinished = true;

	drawPokemon(512);
	statusElement.textContent = message;

	guessInput.disabled = true;
	guessForm.querySelector("button").disabled = true;
}

function handleGuess(event) {
	event.preventDefault();

	if (gameFinished) {
		return;
	}

	if (currentPokemon === null) {
		statusElement.textContent = "El Pokémon todavía no está preparado.";
		return;
	}

	const guess = guessInput.value.trim().toLowerCase();

	if (guess === "") {
		statusElement.textContent = "Escribe un nombre antes de enviar.";
		return;
	}

	if (!pokemonNames.includes(guess)) {
		statusElement.textContent =
			"Ese nombre no existe. Revisa cómo lo has escrito.";
		return;
	}

	attemptsUsed += 1;
	updateAttempts();

	if (guess === currentPokemon.species.name) {
		const pokemonName = currentPokemon.species.name;
		const displayName =
			pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
		finishGame(`¡Has acertado! Era ${displayName}.`);
		return;
	}

	if (attemptsUsed === maxAttempts) {
		const pokemonName = currentPokemon.species.name;
		const displayName =
			pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);

		finishGame(`Sin intentos. Era ${displayName}.`);
		return;
	}

	drawPokemon(pixelLevels[attemptsUsed]);

	statusElement.textContent = "No es ese Pokémon. Intento fallido.";
}

guessForm.addEventListener("submit", handleGuess);

function updateAttempts() {
	const remainingAttempts = maxAttempts - attemptsUsed;

	attemptsElement.textContent = `Intentos restantes: ${remainingAttempts}`;
}

async function loadPokemon() {
	statusElement.textContent = "Cargando Pokémon…";

	try {
		const listData = await fetchJson(
			"https://pokeapi.co/api/v2/pokemon-species?limit=100000",
		);
		pokemonNames = listData.results.map((pokemon) => pokemon.name);
		setupAutocomplete(pokemonNames);

		const randomIndex = Math.floor(Math.random() * listData.results.length);
		const selectedSpecies = listData.results[randomIndex];

		const speciesData = await fetchJson(selectedSpecies.url);

		const defaultVariety = speciesData.varieties.find(
			(variety) => variety.is_default,
		);

		const pokemon = await fetchJson(defaultVariety.pokemon.url);

		pokemonImage.src =
			pokemon.sprites.other["official-artwork"].front_default;
		pokemonImage.alt = `Imagen de ${pokemon.species.name}`;

		await pokemonImage.decode();

		drawPokemon(pixelLevels[attemptsUsed]);

		pokemonCanvas.hidden = false;

		currentPokemon = pokemon;
		console.log("Especie elegida:", currentPokemon.species.name);

		statusElement.textContent = "Escribe el nombre del Pokémon.";
	} catch (error) {
		console.error(error);
		statusElement.textContent = "No se pudo preparar la partida.";
	}
}

updateAttempts();
loadPokemon();
