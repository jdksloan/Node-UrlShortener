/**
 * Link Class
 */
export default class Link {
  private _id: number;
  private _original: string;
  private _shortened: string;
  private _visits: Map<string, number>;
  private _base: string;

  constructor(
    id: number,
    original: string,
    shortened: string,
    base: string,
    visits: Map<string, number> = new Map()
  ) {
    this._id = id;
    this._original = original;
    this._shortened = shortened;
    this._visits = visits;
    this._base = base;
  }

  public get id(): number {
    return this._id;
  }

  public get original(): string {
    return this._original;
  }

  public get shortened(): string {
    return this._shortened;
  }

  public get visits(): Map<string, number> {
    return this._visits;
  }

  public get base(): string {
    return this._base;
  }
  public get shortLink(): string {
    return this._base + "/" + this._shortened;
  }

  /**
   * If I had more time this would've been in it's own class
   */
  public addVisit(date: Date) {
    const d = date.toISOString().split("T")[0];
    let v = this.visits.get(d);
    v ? this.visits.set(d, v + 1) : this.visits.set(d, 1);
  }

  /**
   * If I had more time this would've been in it's own class
   */
  public getVisit(date: Date): number {
    const d = date.toISOString().split("T")[0];
    return this.visits.get(d) || 0;
  }
}
