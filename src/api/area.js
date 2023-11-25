import axios from 'axios'

export const addArea = (data) => axios.post('/area/add', data);

export const list = (data) => axios.get(`/area/list?pageSize=${data.pageSize}&current=${data.current}`);