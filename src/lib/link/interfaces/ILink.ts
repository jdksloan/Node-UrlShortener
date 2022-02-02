/**
 * ILink interface
 */
export default interface ILink {
  [key: string]: any
  id: number
  original: string
  shortened: string
  visits: Map<string, number>
  shortLink: string
  toJSON(): {}
  addVist(date: Date): void
  getVist(date: Date): number | undefined
}
