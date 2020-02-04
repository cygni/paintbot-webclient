export function isDifferent<T>(obj1: T, obj2: T) {
  const newString = JSON.stringify(obj1);
  const oldString = JSON.stringify(obj2);
  return newString !== oldString;
}

export function isEqual<T>(obj1: T, obj2: T) {
  const newString = JSON.stringify(obj1);
  const oldString = JSON.stringify(obj2);
  return newString === oldString;
}

export const docCookies = {
  getItem(sKey: string) {
    if (!sKey) {
      return null;
    }
    return (
      decodeURIComponent(
        document.cookie.replace(
          new RegExp(
            `(?:(?:^|.*;)\\s*${encodeURIComponent(sKey).replace(/[-.+*]/g, '\\$&')}\\s*\\=\\s*([^;]*).*$)|^.*$`,
          ),
          '$1',
        ),
      ) || null
    );
  },
  setItem(sKey: string, sValue: string) {
    if (!sKey || /^(?:expires|max-age|path|domain|secure)$/i.test(sKey)) {
      return false;
    }
    const sExpires = `; expires=Tue, 19 Jan 2038 03:14:07 GMT`;
    const kv = `${encodeURIComponent(sKey)}=${encodeURIComponent(sValue)}`;
    document.cookie = `${kv}${sExpires}`;
    return true;
  },
  removeItem(sKey: string) {
    if (!this.hasItem(sKey)) {
      return false;
    }
    const ex = 'expires=Thu, 01 Jan 1970 00:00:00 GMT';
    document.cookie = `${encodeURIComponent(sKey)}=; ${ex}`;
    return true;
  },
  hasItem(sKey: string) {
    if (!sKey || /^(?:expires|max-age|path|domain|secure)$/i.test(sKey)) {
      return false;
    }
    return new RegExp(`(?:^|;\\s*)${encodeURIComponent(sKey).replace(/[-.+*]/g, '\\$&')}\\s*\\=`).test(document.cookie);
  },
};
