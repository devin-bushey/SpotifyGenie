# SpotifyGenie

ML/AI application to create a Spotify playlist based on user input

## Local Development Setup

### OpenAI API Key

- Create an [OpenAI account](https://openai.com/)
- Create an OpenAI API Key
- Create a .env file in the `./backend` directory
- Create a variable `OPENAI_API_KEY` in the .env file and paste the API Key as a value

### Frontend

Runs on port 3001

```bash
cd frontend
npm i
npm run dev
```

### Backend

Runs on port 5001

```bash
cd backend
npm i
nodemon index.js
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.
