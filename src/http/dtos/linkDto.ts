import Link from "../../link/Link";

export default class LinkDto {
  public original: string;
  public shortened: string;
  public visits: { [key: string]: number };

  constructor(link: Link) {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    const dayBefore = new Date();
    dayBefore.setDate(today.getDate() - 2);
    const visits: { [key: string]: number } = {};
    visits[today.toISOString().split("T")[0]] = link.getVisit(today);
    visits[yesterday.toISOString().split("T")[0]] = link.getVisit(yesterday);
    visits[dayBefore.toISOString().split("T")[0]] = link.getVisit(dayBefore);

    (this.original = link.original),
      (this.shortened = link.base + "/" + link.shortened);
    this.visits = visits;
  }
}
