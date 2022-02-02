import ILink from "../link/interfaces/ILink"
import IRepository from "./interfaces/IRepository"

/**
 * If I had more time this would've been done in MongoDB
 */
export default class LinkRepository implements IRepository<ILink> {
  private readonly _linkRepo: ILink[] = []

  public get(id: number): ILink | undefined {
    return this._linkRepo[id]
  }

  public query(func: (val: ILink, index: number) => boolean): ILink | undefined {
    return this._linkRepo.find(func)
  }

  public insert(link: ILink): void {
    this._linkRepo[link.id] = link
  }

  public update(Link: ILink) {
    Link.addVist(new Date())
  }

  public next(): number {
    return this._linkRepo.length
  }
}
