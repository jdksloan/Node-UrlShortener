import ILink from "./interfaces/ILink"

/**
 * Link Class
 */
export default class Link implements ILink {
  private _id: number
  private _original: string
  private _shortened: string
  private _visits: Map<string, number>
  private _base: string

  constructor(id: number, original: string, shortened: string, base: string, visits: Map<string, number> = new Map()) {
    this._id = id
    this._original = original
    this._shortened = shortened
    this._visits = visits
    this._base = base
  }

  public get id(): number {
    return this._id
  }

  public get original(): string {
    return this._original
  }

  public get shortened(): string {
    return this._shortened
  }

  public get visits(): Map<string, number> {
    return this._visits
  }

  public get base(): string {
    return this._base
  }
  public get shortLink(): string {
    return this._base + "/" + this._shortened
  }

  /**
   * If I had more time this would've been in it's own class
   */
  public addVist(date: Date) {
    const d = date.toISOString().split("T")[0]
    let v = this.visits.get(d)
    v ? this.visits.set(d, v + 1) : this.visits.set(d, 1)
  }

  /**
   * If I had more time this would've been in it's own class
   */
  public getVist(date: Date): number {
    const d = date.toISOString().split("T")[0]
    return this.visits.get(d) || 0
  }

  public toJSON(): {} {
    const today = new Date()
    const yesterday = new Date()
    yesterday.setDate(today.getDate() - 1)
    const dayBefore = new Date()
    dayBefore.setDate(today.getDate() - 2)
    const visits: { [key: string]: number } = {}
    visits[today.toISOString().split("T")[0]] = this.getVist(today)
    visits[yesterday.toISOString().split("T")[0]] = this.getVist(yesterday)
    visits[dayBefore.toISOString().split("T")[0]] = this.getVist(dayBefore)

    return {
      original: this._original,
      shortened: this._base + "/" + this._shortened,
      visits,
    }
  }
}
