import axios from 'axios'

export const getUser = (data) => axios.post('/user/login', data);

export const list = (data) => axios.get(`/user/list?pageSize=${data.pageSize}&current=${data.current}`);

export const lists = (data) => axios.get(`/user/lists?pageSize=${data.pageSize}&current=${data.current}&username=${data.username}`);

export const deleteUser = (data) => axios.post('/user/delete',data);

export const add = (data) => axios.post('/user/add', data);

export const modifyState = (data) => axios.post('/user/modifyState', data);

export const modifyingInformation = (data) => axios.post('/user/modifyingInformation', data);