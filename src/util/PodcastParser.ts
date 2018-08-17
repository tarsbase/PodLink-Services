import axios from 'axios'
import _ from 'lodash'
const parsePodcast = require('node-podcast-parser')
const parseString = require('xml2js').parseString
const cheerio = require('cheerio')

/**
 * Wraps the podcast parsing node module
 */
class PodcastParser {

    /**
     * Retrieves the podcast from the given URL (should be the URL to the XML of the podcast)
     * @param url string
     */
    public static retrievePodcastInfo(url: string): Promise<any> {
        return new Promise((resolve, reject) => {
            axios({
                method: 'get',
                responseType: 'text',
                url,
            }).then((response) => {
                console.log('Parsing podcast info')
                const xml: string = response.data
                parsePodcast(xml, (err: any, data: any) => {
                    if (err) {
                        reject(err)
                    } else {
                        parseString(xml, (error: any, result: any) => {
                            try {
                                let paymentLink: string = null
                                const descriptionHtml = result.rss.channel[0].item[0].description[0]
                                cheerio.load(descriptionHtml).root().find('a').each((index: any, element: any) => {
                                    console.log(element)
                                    if (!_.isNil(element.attribs.rel) && element.attribs.rel === "payment") {
                                        paymentLink = element.attribs.href
                                    }
                                })
                                data.paymentLink = paymentLink
                            } catch (exception) {
                                // we tried our best
                            }
                            resolve(data)
                        })
                    }
                })
            })
        })

    }
}

export { PodcastParser }
