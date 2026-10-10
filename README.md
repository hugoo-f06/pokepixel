# 🎮 PokePixel

PokePixel es un juego web de adivinanzas Pokémon inspirado en la mecánica de Wordle.

En cada partida se selecciona una especie aleatoria y se muestra su imagen muy pixelada. Tienes seis intentos para descubrir qué Pokémon se esconde. Cada respuesta incorrecta hace que la imagen sea un poco más clara.

**👉 [Jugar a PokePixel](https://pokepixel-0.netlify.app/)**

## Estado del proyecto

**Primera versión completada y publicada — v1.0.0.**

Esta versión incluye el núcleo jugable previsto y una interfaz adaptada a ordenador, tablet y móvil.

PokePixel es un proyecto personal de aprendizaje desarrollado durante mis estudios de Ingeniería Informática, priorizando la comprensión del código y la mantenibilidad.

## Cómo jugar

1. Observa la imagen pixelada.
2. Escribe el nombre de un Pokémon. A partir de tres letras aparecerán sugerencias que puedes seleccionar.
3. Envía tu respuesta.
4. Si fallas, consumes un intento y la imagen se vuelve más clara.
5. Si aciertas o agotas los seis intentos, se revela la imagen y el nombre del Pokémon.
6. Pulsa **Nueva partida** para jugar de nuevo con un Pokémon aleatorio.

Los nombres inexistentes o mal escritos no consumen intentos.

## Funcionalidades

- Selección aleatoria entre todas las especies disponibles en PokéAPI.
- Uso de la variedad por defecto de cada especie.
- Pixelado progresivo de la imagen mediante Canvas.
- Seis intentos por partida.
- Validación de nombres y autocompletado.
- Estados de victoria y derrota con revelación del Pokémon.
- Botón para iniciar una nueva partida.
- Modo claro y oscuro con preferencia guardada.
- Diseño responsive.

## Tecnologías

- **HTML:** estructura de la página.
- **CSS:** diseño, temas, animaciones y adaptación a distintos dispositivos.
- **JavaScript:** lógica del juego e interacción con la interfaz.
- **Canvas API:** representación de las imágenes pixeladas.
- **PokéAPI:** especies, nombres e imágenes de Pokémon.
- **Vite:** servidor de desarrollo y generación de la versión de producción.
- **Netlify:** alojamiento de la web.

La aplicación funciona en el navegador y consulta PokéAPI directamente. No utiliza un backend propio ni una base de datos.

## Ejecutar en local

Necesitas Git, Node.js y npm. Se recomienda Node.js 24 LTS.

```bash
git clone https://github.com/hugoo-f06/pixelquest.git
cd pixelquest
npm ci
npm run dev
```

Abre en el navegador la dirección que indique Vite.

En Windows puedes utilizar `npm.cmd` en lugar de `npm`.

### Generar la versión de producción

```bash
npm run build
```

Los archivos preparados para publicar se generan en `dist/`.

Para revisarlos localmente:

```bash
npm run preview
```

El juego necesita conexión a Internet para consultar PokéAPI y cargar las imágenes.

## Estructura

```text
.
├── index.html
├── package.json
├── package-lock.json
└── src/
    ├── main.js
    ├── api.js
    ├── autocomplete.js
    ├── appearance.js
    └── style.css
```

- `main.js`: estado de la partida, intentos y selección del Pokémon.
- `api.js`: peticiones HTTP a PokéAPI.
- `autocomplete.js`: sugerencias y selección de nombres.
- `appearance.js`: cambio de tema y efectos de los botones.
- `style.css`: presentación visual y diseño responsive.

## Aprendizaje

Durante esta primera versión he trabajado con:

- Manipulación del DOM y gestión de eventos.
- Estado y reglas de un juego.
- JavaScript asíncrono y peticiones HTTP.
- Integración con una API externa.
- Dibujo de imágenes mediante Canvas.
- Separación del código en módulos.
- Diseño responsive y temas visuales.
- Git, GitHub y publicación de una web estática.

## Créditos

Los datos y las imágenes utilizados proceden de [PokéAPI](https://pokeapi.co/).
