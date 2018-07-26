# PodLink-Services

Provides services to [PodLink](https://github.com/nathangathright/PodLink)

## Getting started
- Install dependencies
```
npm install
```
- Build and run the project
```
npm start
```

## API

The endpoints are as follows:

#### GET /api/v1/status
Always sends status code 200 if the service is up and running

#### POST /api/v1/info
Request body:
```json
{
    "rssUrl": "http://leo.am/podcasts/floss"
}
```
Response body (follows the format of https://github.com/akupila/node-podcast-parser):
```json
{
    "categories": [
        "Technology>Tech News",
        "Technology>Software How-To",
        "Education>Training"
    ],
    "title": "FLOSS Weekly (MP3)",
    "link": "https://twit.tv/shows/floss-weekly",
    "language": "en-us",
    "ttl": 720,
    "updated": "2018-06-06T23:09:25.000Z",
    "author": "TWiT",
    "description": {
        "short": "We show off free, libre, and open source software here each week.",
        "long": "We're not talking dentistry here; FLOSS all about Free Libre Open Source Software. Join host Randal Schwartz and his rotating panel of co-hosts every Wednesday as they talk with the most interesting and important people in the Open Source and Free Software community.\r\n\r\nRecords live every Wednesday at 12:30pm Eastern / 9:30am Pacific / 16:30 UTC."
    },
    "explicit": false,
    "owner": {
        "name": "Leo Laporte",
        "email": "leo@twit.tv"
    },
    "image": "https://elroycdn.twit.tv/sites/default/files/styles/twit_album_art_2048x2048/public/images/shows/floss_weekly/album_art/audio/floss1400audio.jpg?itok=bQyTXyOk",
    "episodes": [
        {
            "title": "FLOSS Weekly 487: rbspy",
            "published": "2018-06-06T19:46:08.000Z",
            "categories": [
                "Technology",
                "Open Source",
                "Software"
            ],
            "explicit": false,
            "description": "<p>rbspy lets one profile Ruby processes that are already running. Just give it a PID, and it starts profiling. Earlier this year, instead of just documenting other people's debuggers &amp; profilers, Julia Evans decided to build a new tool: a Ruby profiler.</p> \r\n<p><strong>Hosts:</strong> <a href=\"https://twit.tv/people/randal-schwartz\">Randal Schwartz</a> and <a href=\"https://twitter.com/jp_bennett\" target=\"_blank\">Jonathan Bennett</a></p> \r\n<p><strong>Guest:</strong> <a href=\"https://rbspy.github.io/\" target=\"_blank\">Julia Evans</a></p> \r\n<p>Download or subscribe to this show at <a href=\"https://twit.tv/shows/floss-weekly\">https://twit.tv/shows/floss-weekly</a></p> \r\n<p><a href=\"http://bit.ly/flossweeklyguests\" target=\"_blank\">Here's what's coming up for FLOSS in the future</a>.</p> \r\n<p>Think your open source project should be on FLOSS Weekly? Email Randal at <a href=\"mailto:merlyn@stonehenge.com\">merlyn@stonehenge.com</a></p> \r\n<p>Thanks to <a href=\"https://www.cachefly.com/\" target=\"_blank\">CacheFly</a> for providing the bandwidth for this podcast and <a href=\"http://lullabot.com/\" target=\"_blank\">Lullabot's</a> Jeff Robbins, web designer and musician, for our theme music.</p>\r\n<p><strong>Sponsor:</strong><ul>\r\n<li><a href=\"http://RocketMortgage.com/floss\">RocketMortgage.com/floss</a></li>\r\n</ul></p>",
            "guid": "http://www.podtrac.com/pts/redirect.mp3/cdn.twit.tv/audio/floss/floss0487/floss0487.mp3",
            "duration": 3670,
            "enclosure": {
                "filesize": 29648437,
                "type": "audio/mpeg",
                "url": "http://www.podtrac.com/pts/redirect.mp3/cdn.twit.tv/audio/floss/floss0487/floss0487.mp3"
            }
        }
    ]
}
```

#### POST /api/v1/links
Request body:
```json
{
  "rssUrl": "https://rss.simplecast.com/podcasts/1684/rss",
  "iTunesID": "968779958"
}
```
Response body:
```json
{
    "breaker": "https://www.breaker.audio/shows?feed_url=https%3A%2F%2Frss.simplecast.com%2Fpodcasts%2F1684%2Frss",
    "castBox": "http://castbox.fm/vic/968779958",
    "castro": "https://castro.fm/itunes/968779958",
    "google": "https://www.google.com/podcasts?feed=aHR0cHM6Ly9yc3Muc2ltcGxlY2FzdC5jb20vcG9kY2FzdHMvMTY4NC9yc3M=",
    "iTunes": "https://geo.itunes.apple.com/ca/podcast/feed/id968779958",
    "overcast": "https://overcast.fm/itunes968779958",
    "pocketCasts": "http://pca.st/itunes/968779958",
    "radioPublic": "https://radiopublic.com/https%3A%2F%2Frss.simplecast.com%2Fpodcasts%2F1684%2Frss",
    "rss": "https://rss.simplecast.com/podcasts/1684/rss"
}
```
## Dev Notes
- Within VS Code, you can debug easily by setting breakpoints in the code and then running via the Debug menu in the side bar. The Launch Configuration DEBUG should work just fine. You may need to change to `DEBUG CONSOLE` if you want to see output when you are debugging in this way.