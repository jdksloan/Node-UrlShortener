/**
 * Repository interface
 */
export default interface IRepository<T> {
  get(id: number): T | undefined
  query(func: (val: T, index: number) => boolean): T | undefined
  insert(data: T): void
  update(data: T): void
  next(): number
}
