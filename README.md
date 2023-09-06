# Gomoku Game App

A react web-based implementation of the classic Gomoku (Five in a Row) game.

## Author
- Krisna Gusti

## Usage 

### Front-end: gomoku-react

Navigate to the react project directory:

```bash
cd gomoku-react
```

Install dependencies:

```bash
npm install
```

#### Getting Started

Start the application:

```bash
npm start
```

Access the app in your web browser at http://localhost:3000.

### Back-end: gomoku-service

Navigate to the service project directory:

```bash
cd gomoku-service
```

Install dependencies:

```bash
npm install
```

#### Getting Started

Start the application:

```bash
npm run dev
```

Access the service can be interacted with at http://localhost:8080.

#### Using Postman to interact with the service

Import the following into Postman:
```
https://api.postman.com/collections/29238041-4f69214d-fb4f-47d5-8225-f83d0518182e?access_key=PMAT-01H95GQ74PDH7QBHWYV2071NG7
```

### Pre-configured Username and Password

A pre-configured user with username and password is generated. This profile does not contain any privileges over an ordinary user.

**username**: admin
**password**: admin

## Gomoku

### Gameplay

1. Log in or register to access the game.
2. Choose a board size between 5x5 and 20x20.
3. Players take turns placing white and black stones on the board.
4. Restart the game at any time.
5. After completing a game (win or draw), choose to leave to save the game in the log.
6. Leaving during an ongoing game doesn't save progress.
7. Visit the games log page to view saved games and statistics.
8. Click on a game in the log to view its stone placement order.

### Features

- Play the Gomoku game with a variable board size (between 5x5 and 20x20).
- User authentication system: Log in or register to start playing.
- Default account: Use the "admin" username and password "admin" for login (no special privileges).
- Alternating turns: Players take turns placing white and black stones on the board.
- Restart option: Restart the game at any point during play.
- Game completion: Once a game is completed (win or draw), you can choose to leave, and the game will be saved in the games log.
- In-progress game: Leaving while a game is in progress doesn't save the game, and you return to the home page.
- Games log: View a list of saved games in the games log page.
- Game playback: Click on a game in the log to view the stones' placement order. This view is read-only and doesn't allow game play.
- Navigation: Easily navigate back and forth between game pages.

## Endpoints

| Method    | Endpoint          | Parameter                         | Description                   | Response          |
| ---       | ---               | ---                               | ---                           | ---               |
| POST      | /auth/login       | RequestBody(username, password)   | Logs in a existing user       | {user, token}     |
| POST      | /auth/register    | RequestBody(username, password)   | Registers a new user          | {user, token}     |
| GET       | /games/           | -                                 | Retrieves a list of all games | List<Game>        |
| GET       | /games/:id        | Params(gameId)                    | Retrieve a single game        | Game              |
| POST      | /games/           | RequestBody(size, date, userId)   | Create a new game             | Game              |
| PUT       | /games/           | RequestBody(gameId, x, y)         | Update game data              | GameStatus        |
