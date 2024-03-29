import axios from 'axios'
import bodyParser from "body-parser"
import compression from "compression"
import dotenv from "dotenv"
import express, { Response } from "express"
import { LinksUtil } from "./util/LinksUtil"
import { PodcastParser } from "./util/PodcastParser"

dotenv.config()

const app = express()

app.set("port", process.env.PORT || 5000)
app.use(compression())
app.use(bodyParser.json())

app.get("/api/v1/status", (req, res) => {
  res.sendStatus(200)
})

app.post("/api/v1/info", (req, res) => {
  const podcastRssUrl = req.body['rssUrl']
  if (podcastRssUrl == null) {
    sendErrorBody('rssUrl is required', res)
    return
  }
  console.log(`Fetching info for ${podcastRssUrl}`)
  PodcastParser.retrievePodcastInfo(podcastRssUrl).then((data) => {
    res.send(data)
  }).catch((err: any) => {
    console.log(err)
    sendServerError(res)
  })
})

app.post("/api/v1/links", async (req, res) => {
  const iTunesID = req.body['iTunesID']
  if (iTunesID == null) {
    sendErrorBody('iTunesID is required', res)
    return
  }
  console.log(`Fetching links for ${iTunesID}`)

  const podcastRssUrl = await getFeed(iTunesID)

  LinksUtil.links(podcastRssUrl, iTunesID).then((data) => {
    res.send(data)
  }).catch((err: any) => {
    console.log(err)
    sendServerError(res)
  })
})

async function getFeed(id: string): Promise<string> {
  try {
    const itunesAPI = await axios.get(`https://itunes.apple.com/lookup?id=${id}`)
    const iTunesData = itunesAPI.data
    return iTunesData.results[0].feedUrl
  } catch (e) {
    console.error(e)
  }
}

function sendErrorBody(message: string, res: Response) {
  const response = {
    message,
  }
  res.status(400).send(response)
}

function sendServerError(res: Response) {
  res.status(500).send('Internal server error')
}

export default app
