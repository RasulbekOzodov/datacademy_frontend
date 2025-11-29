import api from './axios';

export const sandboxAPI = {
  createSession: async () => {
    const response = await api.post('/sandbox/create-session');
    return response.data;
  },

  runQuery: async (query, sessionId = null) => {
    const response = await api.post('/sandbox/run', { query, session_id: sessionId });
    return response.data;
  },

  endSession: async (sessionId) => {
    const response = await api.delete(`/sandbox/end-session/${sessionId}`);
    return response.data;
  }
};
