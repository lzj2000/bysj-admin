import axios from 'axios'

export const getUser = (data) => axios.post('/user/login', data);

export const list = (data) => axios.get(`/user/list?pageSize=${data.pageSize}&current=${data.current}`);