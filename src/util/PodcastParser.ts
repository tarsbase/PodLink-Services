import axios from 'axios'
import * as cheerio from 'cheerio'
import _ from 'lodash'
const parsePodcast = require('node-podcast-parser')

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
                const xml: string = response.data
                parsePodcast(xml, (err: any, data: any) => {
                    if (err) {
                        reject(err)
                    } else {
                        try {
                            let paymentLink: string = null
                            // might be able to improve this to check for the rel="payment" within the cheerio call
                            const elements = cheerio.load(xml).root().find('a')
                            elements.each((index: any, element: any) => {
                                if (!_.isNil(element.attribs.rel) && element.attribs.rel === "payment") {
                                    paymentLink = element.attribs.href
                                }
                            })
                            data.paymentLink = paymentLink
                        } catch (exception) {
                            // we tried our best
                        }
                        resolve(data)
                    }
                })
            })
        })

    }
}

export { PodcastParser }
