import axios from 'axios';
const parsePodcast = require('node-podcast-parser');

/**
 * Wraps the podcast parsing node module
 */
class PodcastParser {

    /**
     * Retrieves the podcast from the given URL (should be the URL to the XML of the podcast)
     * @param url string
     */
    static retrievePodcastInfo(url: string): Promise<any> {
        return new Promise(function (resolve, reject) {
            axios({
                method: 'get',
                url: url,
                responseType: 'text'
            }).then((response) => {
                console.log('Parsing podcast info')
                const xml: string = response.data
                parsePodcast(xml, (err: any, data: any) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(data)
                    }
                });
            })
        })

    }
}

export { PodcastParser }