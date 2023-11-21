import utils from "../utils";
const { randomSample } = utils;
import { describe, it, expect } from "@jest/globals";

describe("randomSample", () => {
  it("should pick 3 random elements from an array", () => {
    const randomElements = randomSample([1, 2, 3, 4, 5], 3);
    expect(randomElements.length).toBe(3);
  });

  it("should not pick the same element twice", () => {
    const array = [1, 2, 3, 4, 5];
    const randomElements = randomSample(array, 5);
    expect(new Set(randomElements)).toEqual(new Set(array));
  });

  it("should handle empty arrays", () => {
    const randomElements = randomSample([], 0);
    expect(randomElements.length).toBe(0);
  });

  it("should throw error for sample length > array length", () => {
    expect(() => randomSample([1, 2], 3)).toThrow();
  });

  it("should handle arrays with non-numeric elements", () => {
    const randomElements = randomSample(["a", "b", "c"], 3);
    expect(randomElements.length).toBe(3);
  });
});
