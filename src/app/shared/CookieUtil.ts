export default class CookieUtil {
    static remove(name: string) {
        document.cookie = name + "=; expires=Thu, 31 Aug 2020 00:00:00 UTC; path=/;";
    }

    static exists(name: string) {
        return this.get(name) != null;
    }

    static set(name: string, value: string) {
        document.cookie = name + '=' + value + '; path=/;domain=' + window.location.hostname;
    }

    static get(cname: string) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
            c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
            }
        }
        return null;
    }
}