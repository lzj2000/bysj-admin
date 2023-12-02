import axios from 'axios'

export const getOptions = (data) => axios.get("/home/options");

export const searchOptions = (data) => axios.get(`/home/search?school=${data.school}`);


export const getCards = (data) => axios.get("/home/cards");