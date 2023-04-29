import axios from 'axios';

export const supplementCategoryAPI = axios.create({
	baseURL: '/admin/supplement'
});


export const supplementAPI = axios.create({
	baseURL: '/admin/supplements'
});

export const supplementPostAPI = axios.create({
	method: 'post',
	baseURL: '/admin/supplements',
	headers: {
		"Content-Type": "multipart/form-data",
	},
});

export const supplementPutAPI = axios.create({
	method: 'put',
	baseURL: '/admin/supplements',
});
