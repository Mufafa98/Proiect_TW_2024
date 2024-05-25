

/**
 * Dives into an url
 * Example:
 * IN url: "asd/123"
 * OUT url: "/123"
 * @param {string} url Url to dive into 
 * @returns {string} Result url
 */
async function diveIntoUrl(url) {



    const segments = url.split('/');
    segments.shift();// remove an empty string because it starts with /
    segments.shift();// remove the first segment after /

    const modifiedString = `/${segments.join('/')}`;
    return modifiedString;
}

module.exports = diveIntoUrl;