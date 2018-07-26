/**
 * Generates links
 */
class LinksUtil {

    public static links(rssUrl: string, iTunesID: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const links: any = {
                breaker: 'https://www.breaker.audio/shows?feed_url=' + encodeURIComponent(rssUrl),
                castBox: `http://castbox.fm/vic/${iTunesID}`,
                castro: `https://castro.fm/itunes/${iTunesID}`,
                google: 'https://www.google.com/podcasts?feed=' + Buffer.from(rssUrl).toString('base64'),
                iTunes: `https://geo.itunes.apple.com/ca/podcast/feed/id${iTunesID}`,
                overcast: `https://overcast.fm/itunes${iTunesID}`,
                pocketCasts: `http://pca.st/itunes/${iTunesID}`,
                radioPublic: 'https://radiopublic.com/' + encodeURIComponent(rssUrl),
                rss: rssUrl,
            }
            resolve(links)
        })
    }
}

export { LinksUtil }
