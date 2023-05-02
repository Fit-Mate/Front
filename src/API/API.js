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
 * Manage_Workout API
 */

export const workoutAPI = axios.create({
	baseURL: '/admin/workouts'
});

export const workoutPostAPI = axios.create({
	method: 'post',
	baseURL: '/admin/workouts',
	headers: {
		"Content-Type": "multipart/form-data",
	},
});

export const workoutPutAPI = axios.create({
	method: 'put',
	baseURL: '/admin/workouts',
});


/**
 * Manage_Machine API
 */
export const machineAPI = axios.create({
	baseURL: '/admin/machines'
});

export const machinePostAPI = axios.create({
	method: 'post',
	baseURL: '/admin/machines',
	headers: {
	},
});

export const machinePutAPI = axios.create({
	method: 'put',
	baseURL: '/admin/machines',
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
});

export const bodyPartPutAPI = axios.create({
	method: 'put',
	baseURL: '/admin/bodyParts',
});
