import api from './axios';

export const lessonsAPI = {
  getLesson: async (id) => {
    const response = await api.get(`/lessons/${id}`);
    return response.data;
  },

  createLesson: async (moduleId, lessonData) => {
    const response = await api.post(`/modules/${moduleId}/lessons`, lessonData);
    return response.data;
  }
};
