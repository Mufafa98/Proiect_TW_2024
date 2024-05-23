/**
 * Function to get the root of an url
 * Example:
 * IN url: "/asd/123"
 * OUT url: "/asd"
 * @param {string} url Url to get root
 * @returns {string} Root of the url
 */
async function getRoot(url) {
    const segments = url.split('/');
    segments.shift();// remove an empty string because it starts with /

    const modifiedString = `/${segments[0]}`;
    return modifiedString;
}

module.exports = getRoot;