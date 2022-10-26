import MemoryLinkRepository from "./MemoryLinkRepository";

/**
 * Wouldn't be needed with hard storage
 */
class LinkSingleton {
  private static _linkRepository: MemoryLinkRepository;

  static getInstance(): MemoryLinkRepository {
    return this._linkRepository
      ? this._linkRepository
      : new MemoryLinkRepository();
  }
}

export const repository = LinkSingleton.getInstance();
