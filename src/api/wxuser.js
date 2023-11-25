import axios from 'axios'

export const examine = () => axios.get('/wxuser/examine');

export const getexamine = (user_id) => axios.get(`/wxuser/getexamine?user_id=${user_id}`);

export const byApplication = (data) => axios.post('/wxuser/byApplication',data);

export const notApproved = (data) => axios.post('/wxuser/notApproved',data);

export const getAllOrderReceiver = (data) => axios.get(`/wxuser/getAllOrderReceiver`);

export const getOrderQuantity = (data) => axios.get(`/wxuser/getOrderQuantity?user_id=${data.user_id}`);

export const getSchoolOrderQuantity = (data) => axios.get(`/wxuser/getSchoolOrderQuantity?user_id=${data.user_id}&school=${data.school}`);

export const getWxuser = (data) => axios.get(`/wxuser/getWxuser?pageSize=${data.pageSize}&current=${data.current}`);