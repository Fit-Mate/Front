import axios from 'axios';


/**
 * Manage_Supplement API
 */
export const supplementCategoryAPI = axios.create({
	baseURL: '/admin/supplement',
	withCredentials: true
});


export const supplementAPI = axios.create({
	baseURL: '/admin/supplements',
	withCredentials: true
});

export const supplementPostAPI = axios.create({
	method: 'post',
	baseURL: '/admin/supplements',
	headers: {
		"Content-Type": "multipart/form-data",
	},
	withCredentials: true
});

export const supplementPutAPI = axios.create({
	method: 'put',
	baseURL: '/admin/supplements',
	withCredentials: true
});

/**
 * Manage_Workout API
 */

export const workoutAPI = axios.create({
	baseURL: '/admin/workouts',
	withCredentials: true
});

export const workoutPostAPI = axios.create({
	method: 'post',
	baseURL: '/admin/workouts',
	headers: {
		"Content-Type": "multipart/form-data",
	},
	withCredentials: true
});

export const workoutPutAPI = axios.create({
	method: 'put',
	baseURL: '/admin/workouts',
	withCredentials: true
});


/**
 * Manage_Machine API
 */
export const machineAPI = axios.create({
	baseURL: '/admin/machines',
	withCredentials: true
});

export const machinePostAPI = axios.create({
	method: 'post',
	baseURL: '/admin/machines',
	headers: {
	},
	withCredentials: true
});

export const machinePutAPI = axios.create({
	method: 'put',
	baseURL: '/admin/machines',
	withCredentials: true
});


/**
 * Manage_BodyPart API
 */
export const bodyPartAPI = axios.create({
	baseURL: '/admin/bodyParts',
	withCredentials: true
});

export const bodyPartPostAPI = axios.create({
	method: 'post',
	baseURL: '/admin/bodyParts',
	withCredentials: true
});

export const bodyPartPutAPI = axios.create({
	method: 'put',
	baseURL: '/admin/bodyParts',
	withCredentials: true
});


/**LoginInfo */
export const loginPostAPI = axios.create({
	method: 'post',
	baseURL: '/login',
	withCredentials: true
});

export const logoutPuuAPI= axios.create({
	method: 'put',
	baseURL: '/logout',
	withCredentials: true
});



/**
 * User API
 */
export const userAPI = axios.create({
	baseURL: '/user',
	withCredentials: true
});

export const userPostAPI = axios.create({
	method: 'post',
	baseURL: '/user',
	withCredentials: true
});

export const userPutAPI = axios.create({
	method: 'put',
	baseURL: '/user',
	withCredentials: true
});

export const userDeleteAPI = axios.create({
	method: 'post',
	baseURL: '/user/delete',
	withCredentials: true
});

export const userPasswordAPI = axios.create({
	method: 'post',
	baseURL: '/user/password',
	withCredentials: true
});

export const userIdVerifyAPI = axios.create({
	method: 'post',
	baseURL: '/user/verify/id',
	withCredentials: true
});


/**
 * User API
 */
export const bodyDataAPI = axios.create({
	baseURL: '/bodyData',
	withCredentials: true
});

export const bodyDataPostAPI= axios.create({
	method: 'post',
	baseURL: '/bodyData',
	withCredentials: true
});

export const bodyDataDeleteAPI = axios.create({
	method: 'post',
	baseURL: '/bodyData/delete',
	withCredentials: true
});


/**
 * Non-adminAPIs
 */
export const nonAdminBodyPartAPI = axios.create({
	method: 'get',
	baseURL: '/bodyParts',
	withCredentials: true
});

export const nonAdminMachineAPI = axios.create({
	method: 'post',
	baseURL: '/machines',
	withCredentials: true
});

/**
 * RecommendationAPIs
 */
export const recommendAPI= axios.create({
	baseURL: '/recommendation',
	withCredentials: true
});

export const recommendPostAPI = axios.create({
	method: 'post',
	baseURL: '/recommendation',
	withCredentials: true
});
