# SpotifyGenie

ML/AI application to create a Spotify playlist based on user input

## Local Development Setup

### OpenAI API Key

- Create an [OpenAI account](https://openai.com/)
- Create an OpenAI API Key
- Create a .env file in the `./backend` directory
- Create a variable `OPENAI_API_KEY` in the .env file and paste the API Key as a value

### Spotify API Key

- Create an [Spotify Developer account](https://developer.spotify.com/documentation/web-api/quick-start/#:~:text=To%20use%20the%20Web%20API,complete%20your%20account%20set%20up.)
- Find your Spotify client id and secret from the Spotify Dashboard
- Create variables `SP_CLIENT_ID` and `SP_CLIENT_SECRET` in the ./backend/.env file and add the values from the Spotify Dashboard

### Frontend

Runs on port 3001

```bash
cd frontend
npm i
npm start
```

### Backend

Runs on port 5001

```bash
cd backend
npm i
npm run start:dev
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.
