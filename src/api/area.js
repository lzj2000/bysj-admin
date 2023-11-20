import axios from 'axios'

export const addArea = (data) => axios.post('/area/add', data);