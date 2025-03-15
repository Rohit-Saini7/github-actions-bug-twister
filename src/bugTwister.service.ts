import { connectDB } from './mongodb';
import { JavascriptQuestionsData } from './bugTwister.model';

export const saveHintData = async (data: JavascriptQuestionsData) => {
  const db = await connectDB();
  const collection = db.collection('javascript_questions');
  data.createdAt = new Date();
  return await collection.insertOne(data);
};
