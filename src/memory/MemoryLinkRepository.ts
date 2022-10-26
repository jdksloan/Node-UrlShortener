import IRepository from "../link/IRepository";
import Link from "../link/Link";

/**
 * If I had more time this would've been done in MongoDB
 */
export default class MemoryLinkRepository implements IRepository<Link> {
  private readonly _linkRepo: Link[] = [];

  public get(id: number): Link | undefined {
    return this._linkRepo[id];
  }

  public query(func: (val: Link, index: number) => boolean): Link | undefined {
    return this._linkRepo.find(func);
  }

  public insert(link: Link): void {
    this._linkRepo[link.id] = link;
  }

  public update(Link: Link) {
    Link.addVisit(new Date());
  }

  public next(): number {
    return this._linkRepo.length;
  }
}
