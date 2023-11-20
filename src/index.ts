import generateQuestionPaper from "./main";

const MARKS_DISTRIBUTION = {
  easy: 5,
  medium: 10,
  hard: 15,
};

const OUT_PATH = "src/out";

try {
  // // Invalid distribution (20+30+60 != 100)
  // generateQuestionPaper(
  //   100,
  //   { easy: 20, medium: 30, hard: 60 },
  //   MARKS_DISTRIBUTION,
  //   OUT_PATH
  // );

  // // Not possible with current marks distribution
  // generateQuestionPaper(
  //   100,
  //   { easy: 20, medium: 30, hard: 50 },
  //   MARKS_DISTRIBUTION,
  //   OUT_PATH
  // );

  // // Insufficient questions
  // in main.ts ln 6
  // import QUESTIONS from "./constant/questions2.constant.json";

  // Success!
  generateQuestionPaper(
    100,
    { easy: 25, medium: 30, hard: 45 },
    MARKS_DISTRIBUTION,
    OUT_PATH
  );
} catch (err: any) {
  console.log(err.message);
}
