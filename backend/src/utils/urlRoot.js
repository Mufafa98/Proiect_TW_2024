

//  This function returns the root of an url
async function getRoot(url) {
    const segments = url.split('/');
    segments.shift();// remove an empty string because it starts with /

    const modifiedString = `/${segments[0]}`;
    return modifiedString;
}

module.exports = getRoot;