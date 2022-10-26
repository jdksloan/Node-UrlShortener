/**
 * Extend the error class add error status codes
 */

export default class HttpError extends Error {
  public status: number
  constructor(status: number, message?: string) {
    super(message)
    this.status = status
  }
}
