

//  This function get an url like /asd/123/sdf/234 (etc)
//  and returns another url with one apth deeper ex:
//  /asd/123/sdf/234   ->   /123/sdf/234
async function diveIntoUrl(url) {



    const segments = url.split('/');
    segments.shift();// remove an empty string because it starts with /
    segments.shift();// remove the first segment after /

    const modifiedString = `/${segments.join('/')}`;
    return modifiedString;
}

module.exports = diveIntoUrl;