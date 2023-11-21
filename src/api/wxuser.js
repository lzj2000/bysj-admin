import axios from 'axios'

export const examine = () => axios.get('/wxuser/examine');

export const getexamine = (user_id) => axios.get(`/wxuser/getexamine?user_id=${user_id}`);

export const byApplication = (data) => axios.post('/wxuser/byApplication',data);

export const notApproved = (data) => axios.post('/wxuser/notApproved',data);

export const getAllOrderReceiver = (data) => axios.get(`/wxuser/getAllOrderReceiver?pageSize=${data.pageSize}&current=${data.current}`);