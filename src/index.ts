import generateQuestionPaper from "./main";

const MARKS_DISTRIBUTION = {
  easy: 5,
  medium: 10,
  hard: 15,
};

const OUT_PATH = "src/out";

try {
  // // Invalid distribution (20+30+60 != 100)
  // generateQuestionPaper(100, { easy: 20, medium: 30, hard: 60 });

  // // Not possible with current marks distribution
  // generateQuestionPaper(100, { easy: 20, medium: 30, hard: 50 });

  // // Insufficient questions
  // at line 6, src/main.ts
  // import QUESTIONS from "./constant/questions2.constant.json";

  // Success!
  generateQuestionPaper(
    100,
    { easy: 25, medium: 30, hard: 45 },
    MARKS_DISTRIBUTION,
    OUT_PATH,
    true
  );
} catch (err: any) {
  console.log(err.message);
}
