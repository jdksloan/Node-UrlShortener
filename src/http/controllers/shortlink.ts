import { Handler } from "express";
import Config from "../../Config";
import ShortLinker from "../../service/ShortLinker";
import linkDto from "../dtos/linkDto";
import HttpError from "../error/httpError";

const service = new ShortLinker();

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

  const link = service.createShortLink(req.body.short, url, host);

  res.status(200).json({
    status: "success",
    response: link.shortLink,
  });
};

export const getShortlinkStats: Handler = async (req, res) => {
  const link = service.getShortLink(req.params.link);
  if (!link) {
    throw new HttpError(400, "Invalid Link");
  }

  res.status(200).json({
    status: "success",
    response: new linkDto(link),
  });
};

export const redirectShortlink: Handler = async (req, res, next) => {
  const link = service.redirectShortlink(req.params.link);
  if (!link) {
    throw new HttpError(400, "Invalid Link");
  } else {
    res.redirect(link.original);
  }
};
