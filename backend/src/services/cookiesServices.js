

class CookiesServices {
    async parseCookies(cookieHeader) {
        return cookieHeader.split(';').reduce(
            (cookies, cookie) => {
                const [name, ...rest] = cookie.trim().split('=');
                cookies[name] = decodeURIComponent(rest.join('='));
                return cookies;
            }, {});
    }

    setCookie(res, name, value, options) {
        let cookie = `${name}=${encodeURIComponent(value)}`;
        cookie += options.getOptions()
        return cookie;
    }

    createOptions() {
        return new CookiesOptions();
    }
}
class CookiesOptions {
    constructor() {
        this.MaxAge = null;
        this.Expires = null;
        this.Domain = null;
        this.Path = null;
        this.HttpOnly = null;
        this.Secure = null;
        this.SameSite = null;
    }

    getOptions() {
        let options = ""
        if (this.Path) options += `; Path=${this.Path}`;
        if (this.MaxAge) options += `; Max-Age=${this.MaxAge}`;
        if (this.Domain) options += `; Domain=${this.Domain}`;
        if (this.Expires) options += `; Expires=${this.Expires.toUTCString()}`;
        if (this.HttpOnly) options += '; HttpOnly';
        if (this.Secure) options += '; Secure';
        if (this.SameSite) options += `; SameSite=${this.SameSite}`;
        return options;
    }
};
module.exports = new CookiesServices();