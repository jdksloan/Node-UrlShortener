import LinkHelper from "../src/link/LinkHelper";
describe("LinkHelper tests", () => {
  test("createShort with 0", () => {
    const short = LinkHelper.createShort(0);
    expect(short).toEqual("a");
  });

  test("createShort with 1", () => {
    const short = LinkHelper.createShort(1);
    expect(short).toEqual("b");
  });

  test("createShort with 12345", () => {
    const short = LinkHelper.createShort(12345);
    expect(short).toEqual("dnh");
  });

  test("createShort with 10000000", () => {
    const short = LinkHelper.createShort(10000000);
    expect(short).toEqual("P7Cu");
  });

  test("createShort with 10000001", () => {
    const short = LinkHelper.createShort(10000001);
    expect(short).toEqual("P7Cv");
  });

  test("createShort with 100000000000", () => {
    const short = LinkHelper.createShort(100000000000);
    expect(short).toEqual("bVjJYjY");
  });

  test("createShort with 100000000001", () => {
    const short = LinkHelper.createShort(100000000001);
    expect(short).toEqual("bVjJYjZ");
  });

  test("getId with a", () => {
    const id = LinkHelper.getId("a");
    expect(id).toEqual(0);
  });

  test("getId with b", () => {
    const id = LinkHelper.getId("b");
    expect(id).toEqual(1);
  });

  test("getId with dnh", () => {
    const id = LinkHelper.getId("dnh");
    expect(id).toEqual(12345);
  });

  test("getId with P7Cu", () => {
    const id = LinkHelper.getId("P7Cu");
    expect(id).toEqual(10000000);
  });

  test("getId with P7Cv", () => {
    const id = LinkHelper.getId("P7Cv");
    expect(id).toEqual(10000001);
  });

  test("getId with bVjJYjY ", () => {
    const id = LinkHelper.getId("bVjJYjY");
    expect(id).toEqual(100000000000);
  });

  test("getId with bVjJYjZ", () => {
    const id = LinkHelper.getId("bVjJYjZ");
    expect(id).toEqual(100000000001);
  });
});
