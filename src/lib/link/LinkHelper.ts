import Config from "../../Config"

/**
 * Helper methods to run all encode and decode the links
 */
export default class LinkHelper {
  public static createShort(i: number, map: string = Config.map): string {
    if (i == 0) {
      return map[0]
    }
    let short = ""
    const base = map.length
    while (i > 0) {
      const r = i % base
      short += map[r]
      i = Math.floor(i / base)
    }
    return [...short].reverse().join("")
  }

  public static getId(short: string, map: string = Config.map): number {
    let id = 0
    const base = map.length
    while (short) {
      const index = map.indexOf(short[0])
      const p = short.length - 1
      id += index * Math.pow(base, p)
      short = short.substring(1)
    }
    return id
  }
}
