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
    //rememeber, login url is api/users/login. make sure to hit currect endpoint
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

//was initially creating each function and then putting them in authService object like this: const authService = { register }; --> instead just putting all functions as methods on the object

export default authService;
