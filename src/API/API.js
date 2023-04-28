import axios from 'axios';

export const supplementCategoryAPI = axios.create({
	baseURL: '/admin/supplement'
});


export const supplementAPI = axios.create({
	baseURL: '/admin/supplements'
});
