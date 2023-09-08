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
npm run start
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

If this is the first time using this service you can run to initialise
the database and set default values.
```bash
npm run bootstrapdb
```

#### Getting Started

Start the application:

```bash
npm run dev
```

Access the service can be interacted with at http://localhost:8080.

### Usage with Docker

Navigate to the root directory which should contain the docker-compose.yml file.

Run the following command to start the full stack:
```bash
docker-compose up -d
``` 

To stop the stack run the following command:
```bash
docker-compose down 
```

The front end Gomoku application can be access at: http://localhost:3000.

The back end Gomoku service can be access at: http://localhost:8080.

The back end mongodb via docker container can be access at: mongodb://localhost:27017.

### Using Postman to interact with the service

Import the following into Postman:
```
https://api.postman.com/collections/29238041-4f69214d-fb4f-47d5-8225-f83d0518182e?access_key=PMAT-01H95GQ74PDH7QBHWYV2071NG7
```

**Authorisation**:

Login a user and and copy the token from the response. 
In the Authroization tab, select the type Bearer Token and paste the copied token in the Token section.

### Pre-configured Username and Password

A pre-configured user with username and password is generated. This profile does not contain any privileges over an ordinary user.

**username**: admin

**password**: admin

## Gomoku

### Gameplay

1. Log in or register to access the game.
2. Choose a board size between 5x5 and 20x20.
3. Players take turns placing white and black stones on the board.
4. Restart the game at any time during play.
5. After completing a game (win or draw) or during a game, you can choose to leave which will save the progress.
6. Click on a game in the log to view its stone placement order.
7. Clicking on a game in progress will return you to the game in progress.

## Endpoints

| Method    | Endpoint          | Parameter                         | Description                   | Response          |
| ---       | ---               | ---                               | ---                           | ---               |
| POST      | /auth/login       | RequestBody(username, password)   | Logs in a existing user       | {user, token}     |
| POST      | /auth/register    | RequestBody(username, password)   | Registers a new user          | {user, token}     |
| GET       | /games/           | -                                 | Retrieves a list of all games | List<Game>        |
| GET       | /games/:id        | Params(gameId)                    | Retrieve a single game        | Game              |
| POST      | /games/           | RequestBody(size, date, userId)   | Create a new game             | Game              |
| PUT       | /games/           | RequestBody(gameId, x, y)         | Update game data              | GameStatus        |
| PUT       | /games/restart    | RequestBody(gameId)               | Update game data (restart)    | GameStatus        |
