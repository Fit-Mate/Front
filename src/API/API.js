import axios from 'axios';

export const basicSupplementAPI = axios.create({
	baseURL: 'http://localhost:8080/admin/supplement'
});


export const supplementAPI = axios.create({
	baseURL: '/admin/supplements'
});
