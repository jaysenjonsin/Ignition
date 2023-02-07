//service file: used for making http request to backend, setting data in local storage
import axios from 'axios';

const API_URL = '/api/users/';

const authService = {
  //REGISTER USER
  register: async (user) => {
    const response = await axios.post(API_URL, user);

    //axios puts received data in an object on the response called data
    if (response.data) {
      //store in local storage --> remember to stringify
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  },

  login: async (userData) => {
    //login endpoint: /api/users/login
    const response = await axios.post(API_URL + 'login', userData);

    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
  },

  logout: async () => {
    localStorage.removeItem('user');
  },
};



export default authService;
