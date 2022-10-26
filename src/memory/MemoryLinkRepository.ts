import ILinkRepository from "../link/ILinkRepository";
import Link from "../link/Link";

/**
 * If I had more time this would've been done in MongoDB
 */
export default class MemoryLinkRepository implements ILinkRepository {
  private readonly _linkRepo: Link[] = [];

  public getLink(id: number): Link | undefined {
    return this._linkRepo[id];
  }

  public queryLink(
    func: (val: Link, index: number) => boolean
  ): Link | undefined {
    return this._linkRepo.find(func);
  }

  public insertLink(link: Link): void {
    this._linkRepo[link.id] = link;
  }

  public updateLink(Link: Link) {
    Link.addVisit(new Date());
  }

  public nextLinkNumber(): number {
    return this._linkRepo.length;
  }
}
