import axios from 'axios';

const URL = "http://localhost:4000";

const AuthService = {
  login: (user) => {
    return axios.post(`${URL}/auth/login`, user);
  },

  register: (user) => {
    return axios.post(`${URL}/auth/register`, user);
  }
};

export default AuthService;