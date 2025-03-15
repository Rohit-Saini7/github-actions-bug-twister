import * as core from '@actions/core';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { getPromptValues } from './prompt';
import { saveHintData } from './bugTwister.service';
import { closeDB } from './mongodb';

async function run() {
  try {
    const geminiApiKey = process.env.GEMINI_API_KEY || '';

    if (!geminiApiKey) {
      throw new Error('Missing required environment variables GEMINI_API_KEY.');
    }

    const genAI = new GoogleGenerativeAI(geminiApiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const updatedPrompt = getPromptValues();

    const promptResult = await model.generateContent(updatedPrompt);
    const result = promptResult.response.text();
    const newResult = result.replace('```json', '').replace('```', '');
    const parsedResult = JSON.parse(newResult);
    let res;
    try {
      res = await saveHintData(parsedResult);
    } catch (error) {
      throw error;
    }

    core.setOutput('result', { status: 'Success', queryResponse: res });
  } catch (error) {
    core.setFailed(`Action failed with error: ${(error as Error).message}`);
  }
  await closeDB();
}

run();
