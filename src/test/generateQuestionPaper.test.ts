import generateQuestionPaper from "../main";
import { describe, it, expect } from "@jest/globals";

describe("generateQuestionPaper", () => {
  it("should throw error for invalid distribution", () => {
    expect(() =>
      generateQuestionPaper(100, { easy: 20, medium: 30, hard: 60 })
    ).toThrow();
  });
  it("should throw error for negative numbers", () => {
    expect(() =>
      generateQuestionPaper(100, { easy: -20, medium: 50, hard: 60 })
    ).toThrow();
  });
  it("should throw error for non integral number of questions", () => {
    expect(() =>
      generateQuestionPaper(100, { easy: 20, medium: 30, hard: 50 })
    ).toThrow();
  });
  it("should generate question paper successfully", () => {
    expect(generateQuestionPaper(100, { easy: 25, medium: 30, hard: 45 })).toBe(
      undefined
    );
  });
});
