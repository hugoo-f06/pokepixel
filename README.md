# 🎮 PixelQuest

PixelQuest is a Pokémon guessing game inspired by Wordle.

Each game selects a random Pokémon species from all generations.
Its image starts heavily pixelated and becomes clearer after each incorrect guess. The player has six attempts to identify it.

## 🎯 How it works

1. A highly pixelated image of the random Pokémon is displayed.
2. The player enters the name of a Pokémon.
3. If the guess is incorrect, an attempt is consumed and the image becomes less pixelated. Inexistent Pokémon names do not consume attempts.
4. The player continues until:
   - ✅ The Pokémon is guessed correctly.
   - ❌ All attempts are used.
5. At the end of the game, the original image and the correct Pokémon are revealed.

## 🚧 Project status

PixelQuest is currently in early development.

The first version will focus only on the core gameplay. Features such as user accounts, rankings, databases and advanced hints are intentionally excluded for now.

### Initial goals

- [x] Display a Pokémon
- [x] Pixelate its image
- [x] Allow the player to submit guesses
- [x] Validate Pokémon names
- [x] Reduce pixelation after incorrect guesses
- [x] Limit the number of attempts
- [x] Handle win and loss states
- [x] Reveal the Pokémon when the game ends
- [x] Select a random Pokémon species for each game

## 🛠️ Tech stack

- HTML and CSS for the interface.
- JavaScript for game logic and browser interaction.
- Canvas for image pixelation.
- PokéAPI for Pokémon species and images.
- Vite for development and production builds.

## 📚 Learning goals

PixelQuest is a personal project created while studying Computer Engineering.

The main objective is not only to build a working game, but also to learn about:

- Web development
- Frontend architecture
- Client-server communication
- APIs
- Git and GitHub
- Testing
- Software architecture
- Deployment

The project will be developed incrementally, prioritizing understanding and maintainability 
