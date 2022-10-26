import express from "express";

import Config from "../Config";
import routes from "./routes";
import { notFoundHandler } from "./middleware/notFound";
import { errorHandler } from "./middleware/error";

/**
 * A small wrapper around an express server.
 */
export default class Server {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    // set up routes
    this.app.use(routes);

    // set up error/404 handlers
    this.app.use(notFoundHandler);
    this.app.use(errorHandler);
  }

  public async start() {
    new Promise<void>((resolve) => {
      this.app.listen(Config.port, () => {
        console.log(`Server started listening on port ${Config.port}...`);
        resolve();
      });
    });
  }
}
