import axios from 'axios'

export const getDelivery = (data) => axios.post('/order/delivery',data);
export const getErrand = (data) => axios.post('/order/errand',data);
export const getRepair = (data) => axios.post('/order/repair',data);
export const getOther = (data) => axios.post('/order/other',data);

export const deleteOther = (data) => axios.post('/order/deleteOther',data);
export const deleteDelivery = (data) => axios.post('/order/deleteDelivery',data);
export const deleteErrand = (data) => axios.post('/order/deleteErrand',data);
export const deleteRepair = (data) => axios.post('/order/deleteRepair',data);

export const cancelOther = (data) => axios.post('/order/cancelOther',data);
export const cancelDelivery = (data) => axios.post('/order/cancelDelivery',data);
export const cancelErrand = (data) => axios.post('/order/cancelErrand',data);
export const cancelRepair = (data) => axios.post('/order/cancelRepair',data);

export const getOthers = (data) => axios.get(`/order/getOther?id=${data.id}`);
export const getDeliverys = (data) => axios.get(`/order/getDelivery?id=${data.id}`);
export const getErrands = (data) => axios.get(`/order/getErrand?id=${data.id}`);
export const getRepairs = (data) => axios.get(`/order/getRepair?id=${data.id}`);