/**
 * A class that acts as a wrapper around global settings, configuration and constants.
 */
export default class Config {
  /**
   * The default port the server will listen on, if no other is configured.
   */
  public static DEFAULT_PORT = 8081;

  public static DEFAULT_HOST = "localhost";

  public static DEFUALT_MAP =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  private static _apiPrefix = "/api";

  private static _urlRegex = new RegExp(
    "^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$",
    "i"
  );
  /**
   * The port the web server should listen on.
   */
  static get port(): number {
    const port = process.env["PORT"];
    return port ? parseInt(port) : this.DEFAULT_PORT;
  }

  /**
   * The API prefix for all urls
   */
  static get apiPrefix(): string {
    const prefix = process.env["APIPREFIX"];
    return prefix ? prefix : this._apiPrefix;
  }

  /**
   * The url regex pattern
   */
  static get urlRegex(): RegExp {
    const urlRegex = process.env["URLREGEX"];
    return urlRegex ? new RegExp(urlRegex) : this._urlRegex;
  }

  /**
   * The url regex pattern
   */
  static get host(): string {
    const host = process.env["HOST"];
    return host ? host : `${this.DEFAULT_HOST}:${this.DEFAULT_PORT}`;
  }
}
