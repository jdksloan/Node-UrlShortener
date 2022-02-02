import { Handler } from "express"
import Config from "../Config"
import HttpError from "../lib/error/HttpError"
import Link from "../lib/link/Link"
import LinkHelper from "../lib/link/LinkHelper"
import { repository } from "../lib/repository/LinkSingleton"

/**
 * Short link controllers
 */
export const createShortlink: Handler = async (req, res) => {
  const reg = Config.urlRegex

  let url = req.body.url
  if (!reg.test(url)) {
    throw new HttpError(400, `Invalid URL ${url}`)
  }

  if (!/^(f|ht)tps?:\/\//i.test(url)) {
    url = `http://${url}`
  }

  const host = req.hostname + (Config.port ? ":" + Config.port : "")
  const id = repository.query(x => x && x.shortened === req.body.short && x.original !== url)
    ? repository.next()
    : LinkHelper.getId(req.body.short)

  const short = LinkHelper.createShort(id)

  const link = new Link(id, url, short, host)
  repository.insert(link)
  res.status(200).json({
    status: "success",
    response: link.shortLink,
  })
}

export const getShortlinkStats: Handler = async (req, res) => {
  const link = repository.get(LinkHelper.getId(req.params.link))
  if (!link) {
    throw new HttpError(400, "Invalid Link")
  }

  res.status(200).json({
    status: "success",
    response: link,
  })
}

export const redirectShortlink: Handler = async (req, res, next) => {
  const link = repository.get(LinkHelper.getId(req.params.link))

  if (!link) {
    throw new HttpError(400, "Invalid Link")
  } else {
    repository.update(link)
    res.redirect(link.original)
  }
}
