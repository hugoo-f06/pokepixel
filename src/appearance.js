const themeToggle = document.querySelector("#theme-toggle");
const root = document.documentElement;

function applyTheme(theme) {
	root.dataset.theme = theme;

	const isDark = theme === "dark";

	themeToggle.setAttribute("aria-pressed", String(isDark));

	themeToggle.setAttribute(
		"aria-label",
		isDark ? "Activar modo claro" : "Activar modo oscuro",
	);

	document.querySelector('meta[name="theme-color"]').content = isDark
		? "#101b22"
		: "#f5f3ed";
}

applyTheme(root.dataset.theme);

themeToggle.addEventListener("click", () => {
	const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";

	applyTheme(nextTheme);

	try {
		localStorage.setItem("pixelquest-theme", nextTheme);
	} catch {
		// El tema funciona aunque el navegador no permita guardar preferencias.
	}
});

document.querySelectorAll(".ui-button").forEach((button) => {
	button.addEventListener("click", () => {
		button.classList.remove("is-glowing");

		// Reinicia el pulso si se vuelve a pulsar durante la animación.
		void button.offsetWidth;

		button.classList.add("is-glowing");
	});

	button.addEventListener("animationend", (event) => {
		if (event.animationName === "button-glow") {
			button.classList.remove("is-glowing");
		}
	});
});
