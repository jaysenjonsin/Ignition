import axios from 'axios';
const API_URL = '/api/tasks/';

const taskService = {
  createTask: async (taskData, token) => {
    //we receive the token as just the token itself. we want to send in the format that it is in the header, so use template literal

    //if we do not send this config, we cannot access this route. remember, the createTask route first goes through protect route, which checks if user has token
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.post(API_URL, taskData, config);
    return response.data;
  },

  getTasks: async (token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(API_URL, config);
    return response.data;
  },

  updateTask: async (taskId, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.put(API_URL + taskId, config);
    return response.data;
  },

  deleteTask: async (taskId, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.delete(API_URL + taskId, config);
    return response.data;
  },
};

export default taskService;
