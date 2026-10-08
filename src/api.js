export async function fetchJson(url) {
	const response = await fetch(url);

	if (!response.ok) {
		throw new Error(`PokéAPI respondió con el estado ${response.status}`);
	}

	return response.json();
}
