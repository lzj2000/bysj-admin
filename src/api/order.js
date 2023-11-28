import axios from 'axios'

export const getDelivery = (data) => axios.post('/order/delivery',data);
export const getErrand = (data) => axios.post('/order/errand',data);
export const getRepair = (data) => axios.post('/order/repair',data);
export const getOther = (data) => axios.post('/order/other',data);