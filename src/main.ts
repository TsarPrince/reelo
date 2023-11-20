import fs from "fs";
import utils from "./utils";
const { randomSample } = utils;

import QUESTIONS from "./constant/questions.constant.json";
// import QUESTIONS from "./constant/questions2.constant.json";
import path from "path";

/**
 * Generates a question paper based on the given difficulty distribution
 * @param {Number} totalMarks - Total marks of the question paper
 * @param {Object} difficulty - Difficulty distribution of the question paper
 * @param {Boolean} verbose - If true, prints extra information
 * @param {Object} MARKS_DISTRIBUTION - Marks distribution of the question paper
 * @param {String} OUT_PATH - Path to the output file
 * @returns {Object[]} Returns an array of questions
 * @throws {Error} Throws an error if the difficulty distribution is invalid
 * @example <caption>Example usage of generateQuestionPaper.</caption>
 * // returns [{ question: 'What is the capital of India?', topic: 'Geography', difficulty: 'easy' }]
 * generateQuestionPaper(5, { easy: 100, medium: 0, hard: 0 });
 * @example <caption>Example usage of generateQuestionPaper.</caption>
 * // throws Error
 * generateQuestionPaper(5, { easy: 50, medium: 50, hard: 0 });
 */
const generateQuestionPaper = (
  totalMarks: number,
  difficulty: {
    easy: number;
    medium: number;
    hard: number;
  },
  MARKS_DISTRIBUTION: {
    easy: number;
    medium: number;
    hard: number;
  },
  OUT_PATH: string,
  verbose: boolean = false
) => {
  // if verbose is true, print general stats about the question bank
  if (verbose) {
    const length = QUESTIONS.length;
    // convert topics array to Set for unique results
    const topics = new Set(QUESTIONS.map((question) => question.topic));
    console.log("\n\nWelcome to Question Paper Generator!\n\n");
    console.log("Question bank has a total of", length, "questions.");
    console.log("Marks distribution is as follows:", MARKS_DISTRIBUTION);
    console.log("Available topics are: ", topics);
  }

  const { easy, medium, hard } = difficulty;
  // throw error, if difficulty distribution is invalid
  if (easy + medium + hard !== 100) {
    throw new Error("Invalid difficulty distribution.");
  }

  // calculate number of questions from given percentages
  const numOfEasyQuestions =
    (totalMarks * easy) / 100 / MARKS_DISTRIBUTION["easy"];
  const numOfMediumQuestions =
    (totalMarks * medium) / 100 / MARKS_DISTRIBUTION["medium"];
  const numOfHardQuestions =
    (totalMarks * hard) / 100 / MARKS_DISTRIBUTION["hard"];

  // throw error, if number of questions is not an integer
  if (
    Math.round(numOfEasyQuestions) != numOfEasyQuestions ||
    Math.round(numOfMediumQuestions) != numOfMediumQuestions ||
    Math.round(numOfHardQuestions) != numOfHardQuestions
  ) {
    // generate all possibilities from each category
    // and recommend best possible distributions along with Error
    const possibilities = new Set();
    for (let x = 0; x <= totalMarks / MARKS_DISTRIBUTION["easy"]; x++) {
      for (let y = 0; y <= totalMarks / MARKS_DISTRIBUTION["medium"]; y++) {
        for (let z = 0; z <= totalMarks / MARKS_DISTRIBUTION["hard"]; z++) {
          if (
            x * MARKS_DISTRIBUTION["easy"] +
              y * MARKS_DISTRIBUTION["medium"] +
              z * MARKS_DISTRIBUTION["hard"] ===
            totalMarks
          ) {
            const possibility = {
              easy: (x * MARKS_DISTRIBUTION["easy"] * 100) / totalMarks,
              medium: (y * MARKS_DISTRIBUTION["medium"] * 100) / totalMarks,
              hard: (z * MARKS_DISTRIBUTION["hard"] * 100) / totalMarks,
              deviation: 0,
            };
            // calculate standard deviation for recommending the least deviated possibilities
            possibility["deviation"] = Math.sqrt(
              (Math.pow(easy - possibility.easy, 2) +
                Math.pow(medium - possibility.medium, 2) +
                Math.pow(hard - possibility.hard, 2)) /
                3
            );
            possibilities.add(possibility);
          }
        }
      }
    }
    const possibilitiesArray = Array.from(possibilities)
      .sort((a: any, b: any) => a.deviation - b.deviation)
      .slice(0, verbose ? -1 : 5);
    console.log(possibilitiesArray);
    throw new Error(
      "Given difficulty distribution is not possible in accordance with current marks distribution. Try chosing from any of the above closest values. (Set verbose to true to see all distributions)"
    );
  }

  const easyQuestions = QUESTIONS.filter(
    (question) => question.difficulty === "Easy"
  );
  const mediumQuestions = QUESTIONS.filter(
    (question) => question.difficulty === "Medium"
  );
  const hardQuestions = QUESTIONS.filter(
    (question) => question.difficulty === "Hard"
  );

  // throw error, if there are not enough questions in the question bank
  const available = {
    easy: easyQuestions.length,
    medium: mediumQuestions.length,
    hard: hardQuestions.length,
  };
  const required = {
    easy: numOfEasyQuestions,
    medium: numOfMediumQuestions,
    hard: numOfHardQuestions,
  };
  if (
    required.easy > available.easy ||
    required.medium > available.medium ||
    required.hard > available.hard
  ) {
    console.log({ required, available });
    throw new Error(
      "Insufficient questions in the question bank. Try increasing the number of questions or chose a different distribution."
    );
  }
  const questionPaper = [];
  questionPaper.push(...randomSample(easyQuestions, numOfEasyQuestions));
  questionPaper.push(...randomSample(mediumQuestions, numOfMediumQuestions));
  questionPaper.push(...randomSample(hardQuestions, numOfHardQuestions));

  // write question paper to file
  const fileName = `question-paper-${Date.now()}.json`;
  const outPath = path.join(OUT_PATH, fileName);
  fs.writeFileSync(outPath, JSON.stringify(questionPaper, null, 2));

  // SUCCESS 🎉
  console.log("🎊 Question paper generated at", outPath);
};

export default generateQuestionPaper;
