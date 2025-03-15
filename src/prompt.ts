const keys = {
  difficulty: '$DIFFICULTY$',
  loc: '$LOC$',
  noOfBugs: '$NO_OF_BUGS$',
};

const prompt = `
Write a buggy JavaScript code snippet based on the following criteria:
Difficulty: ${keys.difficulty}
LOC: ${keys.loc}
No of Bugs: ${keys.noOfBugs}
HINTS: ${keys.noOfBugs}
Include hints about the bugs and provide the corrected version of the code and a name for problem.

Response should be in JSON.stringify format. for example: 
{
  "name": "problem name",
  "hints": ["hint 1", "hint 2"],
  "buggyCode": "function test() {\n  console.log('test');\n}",
  "correctCode": "function test1() {\n   console.log('test');\n}",
}`;

export const getPromptValues = () => {
  const randomNumber = Math.floor(Math.random() * 4);

  const promptValues = {
    difficulty: '',
    loc: '',
    noOfBugs: '',
  };

  if (randomNumber === 0) {
    promptValues.difficulty = 'EASY';
    promptValues.loc = '10';
    promptValues.noOfBugs = '3';
  } else if (randomNumber === 1) {
    promptValues.difficulty = 'MEDIUM';
    promptValues.loc = '15';
    promptValues.noOfBugs = '5';
  } else if (randomNumber === 2) {
    promptValues.difficulty = 'HARD';
    promptValues.loc = '20';
    promptValues.noOfBugs = '7';
  } else if (randomNumber === 3) {
    promptValues.difficulty = 'NIGHTMARE';
    promptValues.loc = '25';
    promptValues.noOfBugs = '10';
  }

  const updatedPrompt = prompt
    .replace(keys.difficulty, promptValues.difficulty)
    .replace(keys.loc, promptValues.loc)
    .replaceAll(keys.noOfBugs, promptValues.noOfBugs);

  return updatedPrompt;
};
