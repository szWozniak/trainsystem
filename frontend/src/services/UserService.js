import axios from 'axios';

const URL = "http://localhost:4000";

const UserService = {
  getProfile: () => {
    return axios.get(
        `${URL}/user/profile`,
        { headers: { "authorization": localStorage.getItem("token") }} );
  }
};

export default UserService;