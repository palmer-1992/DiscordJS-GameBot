## Discord Bot - GameBot

**Gamebot** is a simply Discord bot which has 1 primary focus, track game wins. This was built with DiscordJS. The bot uses NodeJS & and MongoDB for a database.

## Features

This bot is still in development.

- [x] Create a profile to track wins
- [x] Add a game to profile
- [x] Increase game wins
- [x] Check how many wins you have

## Tech

<b>Built with</b>

- [DiscordJS](https://discord.js.org/#/)
- [NodeJS](https://nodejs.org/en/)
- [MongoDB](https://www.mongodb.com/)

## Commands

- !createuser - Creates the profile in the DB based on discord name.
- !add [GAME] - This adds a new game into the profile (Game must be in 'GameStore').
- !check [GAME] - This checks if the game is in the profile & returns total win count.
- !won [GAME] - This increments the chosen game count by 1.
