import Router from "express-promise-router";
import Config from "../../Config";
import {
  createShortlink,
  getShortlinkStats,
  redirectShortlink,
} from "../controllers/shortlink";

const routes = Router();

routes.post(`${Config.apiPrefix}/v1/shortlink/`, createShortlink);
routes.get(`${Config.apiPrefix}/v1/shortlink/:link/stats`, getShortlinkStats);

routes.get(`/:link`, redirectShortlink);

export default routes;
