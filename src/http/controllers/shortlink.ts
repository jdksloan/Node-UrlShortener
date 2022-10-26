import { Handler } from "express";
import Config from "../../Config";
import HttpError from "../error/HttpError";

import LinkHelper from "../../link/LinkHelper";
import { repository } from "../../memory/MemoryLinkRepositorySingleton";
import Link from "../../link/Link";

/**
 * Short link controllers
 */
export const createShortlink: Handler = async (req, res) => {
  const reg = Config.urlRegex;

  let url = req.body.url;
  if (!reg.test(url)) {
    throw new HttpError(400, `Invalid URL ${url}`);
  }

  if (!/^(f|ht)tps?:\/\//i.test(url)) {
    url = `http://${url}`;
  }

  const host = req.hostname + (Config.port ? ":" + Config.port : "");

  let id;
  if (req.body.short) {
    id = repository.queryLink(
      (x) => x && x.shortened === req.body.short && x.original !== url
    )
      ? repository.nextLinkNumber()
      : LinkHelper.getId(req.body.short);
  } else {
    let query = repository.queryLink((x) => x && x.original === url);
    id = query ? query.id : repository.nextLinkNumber();
  }
  const short = LinkHelper.createShort(id);

  const link = new Link(id, url, short, host);
  repository.insertLink(link);
  res.status(200).json({
    status: "success",
    response: link.shortLink,
  });
};

export const getShortlinkStats: Handler = async (req, res) => {
  const link = repository.getLink(LinkHelper.getId(req.params.link));
  if (!link) {
    throw new HttpError(400, "Invalid Link");
  }

  res.status(200).json({
    status: "success",
    response: link,
  });
};

export const redirectShortlink: Handler = async (req, res, next) => {
  const link = repository.getLink(LinkHelper.getId(req.params.link));

  if (!link) {
    throw new HttpError(400, "Invalid Link");
  } else {
    repository.updateLink(link);
    res.redirect(link.original);
  }
};
