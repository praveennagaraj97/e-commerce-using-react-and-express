export class useSessionStorage {
  static setAuthSession(name, value, expiresIn) {
    if (expiresIn === "24h") expiresIn = 86400;
    else if (expiresIn === "infinite") expiresIn = 84600 * 365 * 5;
    else expiresIn = 86400;
    sessionStorage.setItem(name, value);
  }

  static removeCookie(name) {
    document.cookie = `${name}=;max-age=0;Path=/`;
  }

  static getCookie(name) {
    const cookieList = document.cookie.split(";");
    for (let i = 0; i < cookieList.length; i++) {
      let cookiePair = cookieList[i].split("=");
      if (name === cookiePair[0].trim()) {
        return decodeURIComponent(cookiePair[1]);
      }
    }
    return null;
  }
}
