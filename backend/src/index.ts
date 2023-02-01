const { Configuration, OpenAIApi } = require("openai");

import express from "express";
import bodyParser from 'body-parser';
import cors from "cors";
require('dotenv').config('./.env');
import axios from 'axios';


const app = express();
const port = 5001;

const configuration = new Configuration({
  organization: "org-0vIMGNLnWtexatzeEFq02gIp",
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.use(bodyParser.json());
app.use(cors());

const getSpotifyAuth = async () => {

  const client_id = process.env.SP_CLIENT_ID;
  const client_secret = process.env.SP_CLIENT_SECRET;
  const encoded = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

  try {
    const response = await axios({
      url: 'https://accounts.spotify.com/api/token',
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + encoded
      },
      params: {
        "grant_type": 'client_credentials'
      }

    });
    return response.data.access_token;
  } catch (error) {
    console.error("Error: POST getAccessToken");
    console.error(error);
  }

}

const getSpotifyTrackLink = async (access_token : string, song : string, artist : string) => {
  try {
    const response = await axios.get(`https://api.spotify.com/v1/search?q=track:${song}%20artist:${artist}&type=track`, {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    });
    //console.log("song: ", song, "artist: ", artist, "response:", response.data)
    if (response.data.tracks.items.length > 0) {
      return response.data.tracks.items[0].external_urls.spotify;
    } else {
      return 'No match found';
    }
  } catch (error) {
    console.log(error);
  }
}

app.post('/', async (req : any, res : any) => {

  const { message } = req.body;
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Give me a song that is accessible through the Canadian Spotify API that I would listen to that is: ${message}`,
    max_tokens: 25,
    temperature: 0,
  });
  if (response.data.choices[0].text) {
    const auth = await getSpotifyAuth();
    const song = response.data.choices[0].text.split(' by ')[0].replace(/"/g, '');
    const band = response.data.choices[0].text.split(' by ')[1];
    const link = await getSpotifyTrackLink(auth, song, band);
    res.json({
      message: response.data.choices[0].text,
      link: link
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});