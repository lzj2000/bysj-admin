import axios from 'axios'

export const getUser = (data) => axios.post('/user/login', data);

export const addCategoriesAsync = data => axios.post('/categroy/addCategroy', data);
