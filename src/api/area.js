import axios from 'axios'

export const addArea = (data) => axios.post('/area/add', data);

export const list = (data) => axios.get(`/area/list?pageSize=${data.pageSize}&current=${data.current}`);

export const lists = (data) => axios.get(`/area/lists?pageSize=${data.pageSize}&current=${data.current}&username=${data.username}`);

export const deleteArea = (data) => axios.post('/area/delete',data);

export const getOrderQuantity = (data) => axios.get(`/area/getOrderQuantity?school=${data.school}`);