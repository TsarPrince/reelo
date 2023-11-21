# reelo

## Setup:

Node version: 20.9.0<br/>
npm version: 10.1.0

```
git clone https://github.com/TsarPrince/reelo.git
cd reelo
yarn
yarn dev
```

(Optional)<br>
Do `yarn test` to run test files.

<br><hr><br>

## Following edge cases have been taken care of (tested with jest):

1. Invalid distribution (20+30+60 != 100)

`generateQuestionPaper(100, { easy: 20, medium: 30, hard: 60 })`

```
Invalid difficulty distribution.
```

2. Not possible with current marks distribution (fractional question numbers).

`generateQuestionPaper(100, { easy: 20, medium: 30, hard: 50 });`

```
[
  { easy: 25, medium: 30, hard: 45, deviation: 4.08248290463863 },
  { easy: 15, medium: 40, hard: 45, deviation: 7.0710678118654755 },
  { easy: 10, medium: 30, hard: 60, deviation: 8.16496580927726 },
  { easy: 20, medium: 20, hard: 60, deviation: 8.16496580927726 },
  { easy: 35, medium: 20, hard: 45, deviation: 10.801234497346433 }
]
Given difficulty distribution is not possible in accordance with current marks distribution. Try chosing from any of the above closest values. (Set verbose to true to see all distributions)
```

3. Insufficient questions

at line 6, src/main.ts

`import QUESTIONS from "./constant/questions2.constant.json";`

```
{
  required: { easy: 6, medium: 3, hard: 3 },
  available: { easy: 4, medium: 11, hard: 7 }
}
Insufficient questions in the question bank. Try increasing the number of questions or chose a different distribution.
```

4. Success!

`generateQuestionPaper(100, { easy: 25, medium: 30, hard: 45 });`

```
🎊 Question paper generated at src\out\question-paper-1700517059743.json
```

<hr>

## Extras

- `verbose` can be changed to true for additional informations in `src/index.ts`
- In case 4 above, the chosen difficulty distribution `(25, 30, 45)` is the one recommended by the generator in case 2 with the least **Standard Deviation**. This can be proved to be the best possible distribution matching the original requirement of `(20, 30, 50)` in case 2.
- Question paper genereated each time is random and fulfils the required distribution.
- Basic unit testing is done with `jest` for above mentioned test cases.
