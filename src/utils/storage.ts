interface IStorage {
  /**
   * The **`clear()`** method of the Storage interface clears all keys stored in a given `Storage` object.
   */
  clear(): void;

  /**
   * The **`getItem()`** method of the Storage interface, when passed a key name, will return that key's value, or `null` if the key does not exist, in the given `Storage` object.
   */
  getItem(key: string): string | null;

  /**
   * The **`removeItem()`** method of the Storage interface, when passed a key name, will remove that key from the given `Storage` object if it exists.
   */

  removeItem(key: string): void;
  /**
   * The **`setItem()`** method of the Storage interface, when passed a key name and value, will add that key to the given `Storage` object, or update that key's value if it already exists.
   */

  setItem(key: string, value: string): void;

  [name: string]: any;
}

class Storage {
  constructor(prefix: string = "") {
    this.prefix = prefix;
  }

  get(key: string): string | null {
    const item = this.storage.getItem(this.toCacheKey(key));
    if (!item) return "";
    try {
      const { val, expire } = JSON.parse(item);
      if (expire === null || expire >= Date.now()) {
        return val;
      }
      this.remove(key);
    } catch (e) {
      console.log(e);
    }
    return "";
  }

  set(key: string, val: any, expire: number = 60 * 60 * 24): void {
    this.storage.setItem(
      this.toCacheKey(key),
      JSON.stringify({
        val,
        expire: expire ? new Date().getTime() + expire * 1000 : null,
      })
    );
  }

  remove(key: string): void {
    this.storage.removeItem(this.toCacheKey(key));
  }

  clear(): void {
    this.storage.clear();
  }

  private prefix: string;
  private storage: IStorage = localStorage;
  private toCacheKey(key: string) {
    return (this.prefix + "_" + key).toUpperCase();
  }
}
const appName = import.meta.env.VITE_APP_NAME;
export default new Storage(appName);
