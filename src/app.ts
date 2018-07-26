import bodyParser from "body-parser"
import compression from "compression"
import dotenv from "dotenv"
import express, { Response } from "express"
import { PodcastParser } from "./util/PodcastParser"
import { LinksUtil } from "./util/LinksUtil";

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

app.post("/api/v1/links", (req, res) => {
  const podcastRssUrl = req.body['rssUrl']
  const iTunesID = req.body['iTunesID']
  if (podcastRssUrl == null) {
    sendErrorBody('rssUrl is required', res)
    return
  }
  if (iTunesID == null) {
    sendErrorBody('iTunesID is required', res)
    return
  }
  console.log(`Fetching info for ${podcastRssUrl}`)
  LinksUtil.links(podcastRssUrl, iTunesID).then((data) => {
    res.send(data)
  }).catch((err: any) => {
    console.log(err)
    sendServerError(res)
  })
})

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
