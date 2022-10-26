import LinkHelper from "../link/LinkHelper";
import { repository } from "../memory/MemoryLinkRepositorySingleton";
import Link from "../link/Link";

export default class ShortLinker {
  public createShortLink(short: string, url: string, host: string): Link {
    let id;
    id = this.checkLink(short, id, url);
    const shortLink = LinkHelper.createShort(id);

    const link = new Link(id, url, shortLink, host);
    repository.insertLink(link);

    return link;
  }

  private checkLink(short: string, id: any, url: string) {
    if (short) {
      id = repository.queryLink(
        (x) => x && x.shortened === short && x.original !== url
      )
        ? repository.nextLinkNumber()
        : LinkHelper.getId(short);
    } else {
      let query = repository.queryLink((x) => x && x.original === url);
      id = query ? query.id : repository.nextLinkNumber();
    }
    return id;
  }

  public getShortLink(link: string): Link | undefined {
    return repository.getLink(LinkHelper.getId(link));
  }

  public redirectShortlink(linkReq: string): Link | undefined {
    const link = repository.getLink(LinkHelper.getId(linkReq));

    if (link) {
      repository.updateLink(link);
    }
    return link;
  }
}
