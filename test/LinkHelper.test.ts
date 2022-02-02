import LinkHelper from "../src/lib/link/LinkHelper"
describe("LinkHelper tests", () => {
  test("createShort with 0", () => {
    const short = LinkHelper.createShort(0, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789")
    expect(short).toEqual("a")
  })

  test("createShort with 1", () => {
    const short = LinkHelper.createShort(1, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789")
    expect(short).toEqual("b")
  })

  test("createShort with 12345", () => {
    const short = LinkHelper.createShort(12345, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789")
    expect(short).toEqual("dnh")
  })

  test("createShort with 10000000", () => {
    const short = LinkHelper.createShort(10000000, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789")
    expect(short).toEqual("P7Cu")
  })

  test("createShort with 10000001", () => {
    const short = LinkHelper.createShort(10000001, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789")
    expect(short).toEqual("P7Cv")
  })

  test("createShort with 100000000000", () => {
    const short = LinkHelper.createShort(100000000000, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789")
    expect(short).toEqual("bVjJYjY")
  })

  test("createShort with 100000000001", () => {
    const short = LinkHelper.createShort(100000000001, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789")
    expect(short).toEqual("bVjJYjZ")
  })

  test("getId with a", () => {
    const id = LinkHelper.getId("a", "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789")
    expect(id).toEqual(0)
  })

  test("getId with b", () => {
    const id = LinkHelper.getId("b", "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789")
    expect(id).toEqual(1)
  })

  test("getId with dnh", () => {
    const id = LinkHelper.getId("dnh", "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789")
    expect(id).toEqual(12345)
  })

  test("getId with P7Cu", () => {
    const id = LinkHelper.getId("P7Cu", "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789")
    expect(id).toEqual(10000000)
  })

  test("getId with P7Cv", () => {
    const id = LinkHelper.getId("P7Cv", "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789")
    expect(id).toEqual(10000001)
  })

  test("getId with bVjJYjY ", () => {
    const id = LinkHelper.getId("bVjJYjY", "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789")
    expect(id).toEqual(100000000000)
  })

  test("getId with bVjJYjZ", () => {
    const id = LinkHelper.getId("bVjJYjZ", "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789")
    expect(id).toEqual(100000000001)
  })
})
