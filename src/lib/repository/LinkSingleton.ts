import LinkRepository from "./LinkRepository"

/**
 * Wouldn't be needed with hard storage
 */
class LinkSingleton {
  private static _linkRepository: LinkRepository

  static getInstance(): LinkRepository {
    return this._linkRepository ? this._linkRepository : new LinkRepository()
  }
}

export const repository = LinkSingleton.getInstance()
