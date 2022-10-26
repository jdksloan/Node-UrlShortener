/**
 * Helper methods to run all encode and decode the links
 */
export default class LinkHelper {
  private static DEFAULT_MAP =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  public static createShort(i: number): string {
    if (i == 0) {
      return this.DEFAULT_MAP[0];
    }
    let short = "";
    const base = this.DEFAULT_MAP.length;
    while (i > 0) {
      const r = i % base;
      short += this.DEFAULT_MAP[r];
      i = Math.floor(i / base);
    }
    return [...short].reverse().join("");
  }

  public static getId(short: string): number {
    let id = 0;
    const base = this.DEFAULT_MAP.length;
    while (short) {
      const index = this.DEFAULT_MAP.indexOf(short[0]);
      const p = short.length - 1;
      id += index * Math.pow(base, p);
      short = short.substring(1);
    }
    return id;
  }
}
