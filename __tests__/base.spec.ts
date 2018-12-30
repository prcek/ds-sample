import { sampleFunction } from "../src";
describe("This is a simple test", () => {
  test("Check the sampleFunction function", async () => {
    const r = await sampleFunction(1);
    expect(r).toEqual(3);
  });
});
