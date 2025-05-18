import * as axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export interface ProgressData {
  answers: Record<number, number>;
  score: number;
  completed: boolean;
  last_updated: string;
}

export const progressService = {
  async saveProgress(userId: number, chapter: number, answers: Record<number, number>, score: number, completed: boolean) {
    const response = await axios.default.post(`${API_BASE_URL}/progress/${userId}/${chapter}`, {
      answers,
      score,
      completed
    });
    return response.data;
  },

  async getProgress(userId: number, chapter: number): Promise<ProgressData> {
    const response = await axios.default.get(`${API_BASE_URL}/progress/${userId}/${chapter}`);
    return response.data as ProgressData;
  },

  async getAllProgress(userId: number): Promise<Array<ProgressData & { chapter: number }>> {
    const response = await axios.default.get(`${API_BASE_URL}/progress/${userId}`);
    return response.data as Array<ProgressData & { chapter: number }>;
  }
}; 