import Link from "./Link";

/**
 * Repository interface
 */
export default interface ILinkRepository {
  getLink(id: number): Link | undefined;
  queryLink(func: (val: Link, index: number) => boolean): Link | undefined;
  insertLink(data: Link): void;
  updateLink(data: Link): void;
  nextLinkNumber(): number;
}
