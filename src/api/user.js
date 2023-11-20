import axios from 'axios'

export const getUser = (data) => axios.post('/user/login', data);
