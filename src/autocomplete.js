export function setupAutocomplete(pokemonNames) {
	const input = document.querySelector("#guess-input");
	const list = document.querySelector("#pokemon-suggestions");
	const container = input.closest(".autocomplete");
	const form = input.closest("form");

	const minimumLetters = 3;
	const maximumSuggestions = 8;
	const sortedNames = [...pokemonNames].sort();

	let matches = [];
	let activeIndex = -1;

	function closeSuggestions() {
		list.hidden = true;
		input.setAttribute("aria-expanded", "false");
		input.removeAttribute("aria-activedescendant");
		activeIndex = -1;
	}

	function setActiveOption(index) {
		activeIndex = index;

		Array.from(list.children).forEach((option, optionIndex) => {
			option.setAttribute(
				"aria-selected",
				String(optionIndex === activeIndex),
			);
		});

		const activeOption = list.children[activeIndex];

		input.setAttribute("aria-activedescendant", activeOption.id);
		activeOption.scrollIntoView({ block: "nearest" });
	}

	function selectOption(index) {
		const name = matches[index];

		if (!name) {
			return;
		}

		input.value = name;
		input.focus({ preventScroll: true });
		closeSuggestions();
	}

	function showSuggestions() {
		const query = input.value.trim().toLowerCase();
		const letterCount = query.replace(/[^a-z]/g, "").length;

		list.replaceChildren();
		input.removeAttribute("aria-activedescendant");
		activeIndex = -1;

		if (input.disabled || letterCount < minimumLetters) {
			closeSuggestions();
			return;
		}

		matches = sortedNames
			.filter((name) => name.startsWith(query))
			.slice(0, maximumSuggestions);

		if (matches.length === 0) {
			closeSuggestions();
			return;
		}

		matches.forEach((name, index) => {
			const option = document.createElement("li");

			option.id = `pokemon-suggestion-${index}`;
			option.setAttribute("role", "option");
			option.setAttribute("aria-selected", "false");
			option.textContent = name.charAt(0).toUpperCase() + name.slice(1);

			// Conserva el foco del campo al seleccionar con el ratón.
			option.addEventListener("mousedown", (event) => {
				event.preventDefault();
			});

			option.addEventListener("click", () => {
				selectOption(index);
			});

			list.append(option);
		});

		list.hidden = false;
		input.setAttribute("aria-expanded", "true");
	}

	input.addEventListener("input", showSuggestions);
	input.addEventListener("focus", showSuggestions);

	input.addEventListener("keydown", (event) => {
		if (event.key === "Escape" || event.key === "Tab") {
			closeSuggestions();
			return;
		}

		if (event.key === "ArrowDown" || event.key === "ArrowUp") {
			if (list.hidden) {
				showSuggestions();
			}

			if (list.hidden) {
				return;
			}

			event.preventDefault();

			const direction = event.key === "ArrowDown" ? 1 : -1;

			const nextIndex =
				activeIndex === -1
					? direction === 1
						? 0
						: matches.length - 1
					: (activeIndex + direction + matches.length) %
						matches.length;

			setActiveOption(nextIndex);
			return;
		}

		if (event.key === "Enter" && !list.hidden && activeIndex !== -1) {
			event.preventDefault();
			selectOption(activeIndex);
		}
	});

	document.addEventListener("pointerdown", (event) => {
		if (!container.contains(event.target)) {
			closeSuggestions();
		}
	});

	form.addEventListener("submit", closeSuggestions);
}
