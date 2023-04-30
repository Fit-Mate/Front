import axios from 'axios';


/**
 * Manage_Supplement API
 */
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


/**
 * Manage_BodyPart API
 */
export const bodyPartAPI = axios.create({
	baseURL: '/admin/bodyParts',
});

export const bodyPartPostAPI = axios.create({
	method: 'post',
	baseURL: '/admin/bodyParts',
	headers: {
		"Content-Type": "multipart/form-data",
	},
});

export const bodyPartPutAPI = axios.create({
	method: 'put',
	baseURL: '/admin/bodyParts',
});
