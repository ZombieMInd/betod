import Axios, { CancelToken, AxiosError } from 'axios';
import { converToFormData } from '../utils/apiFunctions';
import { showAlert } from '../utils/showAlert';
import { addCourse, RegisterValuesType, UpdateCourse, UpdateProfile, UpdateProblem, addProblem, Solution } from '../types/types';
import { MeType } from '../types/me';
import { axiosInstance, handleErr } from './api';
import { number } from 'yup';


export const userAPI = {
	// USER...
	async login(login: string, password: string) {
		try {
			const response = await axiosInstance.post(`login`, { 'recordBookNumber': login, 'password': password });
			return response;
		} catch (err) {
			return await handleErr(err);
		}
	},
	async getAllUsers() {
		try {
			const response = await axiosInstance.get(`users/`);
			return response;
		} catch (err) {
			return await handleErr(err);
		}
	},
	async getUserCourses(id : number) {
		try {
			const response = await axiosInstance.get(`users/${id}/courses/`);
			return response;
		} catch (err) {
			// console.log(err);
			return await handleErr(err);
		}
	},
	async getUserByID(id : number) {
		try {
			const response = await axiosInstance.get(`users/` + id);
			return response;
		} catch (err) {
			return await handleErr(err);
		}
	},
	async getUserInfo() {
		try {
			const response = await axiosInstance.get(`/users/token`);
			return response;
		} catch (err) {
			return await handleErr(err);
		}
	},
	async editProfile(profile: UpdateProfile) {
		try {
			const response = await axiosInstance.put(`/users/`, profile);
			return response;
		} catch (err) {
			return await handleErr(err);
		}
	},
	async deleteUser(id : number) {
		try {
			const response = await axiosInstance.delete(`/users/${id}`);
			return response;
		} catch (err) {
			return await handleErr(err);
		}
	},
	async regUser(profile: RegisterValuesType) {
		try {
			const response = await axiosInstance.post(`registration`, profile);
			return response;
		} catch (err) {
			return await handleErr(err);
		}
	},
	async postProfilePic(avatar: FormData) {
		try {
			const response = await axiosInstance.post(`/users/user-avatar/`, avatar);
			return response;
		} catch (err) {
			return await handleErr(err);
		}
	},

	// COURSE...
	async getCourseDataById(id : number) {
		try {
			const response = await axiosInstance.get(`courses/` + id);
			return response;
		} catch (err) {
			return await handleErr(err);
		}
	},
	async getCourseData() {
		try {
			const response = await axiosInstance.get(`courses/`);
			return response;
		} catch (err) {
			return await handleErr(err);
		}
	},
	async addCourse(course: addCourse) {
		try {
			const response = await axiosInstance.post(`/courses/`, course);
			return response;
		} catch (err) {
			return await handleErr(err);
		}
	},
	async editCourse(course: UpdateCourse) {
		try {
			const response = await axiosInstance.put(`/courses/`, course);
			return response;
		} catch (err) {
			return await handleErr(err);
		}
	},
	async deleteCourse(id : number) {
		try {
			const response = await axiosInstance.delete(`/courses/${id}`);
			return response;
		} catch (err) {
			return await handleErr(err);
		}
	},
	async getAllUsersFromCourse(courseID : number) {
		try {
			const response = await axiosInstance.get(`/courses/${courseID}/users`);
			return response;
		} catch (err) {
			return await handleErr(err);
		}
	},
	async addUserToCourse(courseID : number, userID : number) {
		try {
			const response = await axiosInstance.post(`/courses/${courseID}/`, null, {params: {userId : userID}});
			return response;
		} catch (err) {
			return await handleErr(err);
		}
	},
	async delUserFromCourse(courseID : number, userID : number) {
		try {
			const response = await axiosInstance.delete(`/courses/${courseID}/`, {params: {userId : userID}});
			return response;
		} catch (err) {
			return await handleErr(err);
		}
	},
	async getAllProblemsFromCourse(id : number) {
		try {
			const response = await axiosInstance.get(`/courses/${id}/problems/`);
			return response;
		} catch (err) {
			return await handleErr(err);
		}
	},
	async addProblemToCourse(courseID : number, problemID : number) {
		try {
			const response = await axiosInstance.post(`/courses/${courseID}/problems/`, null, {params: {problemId : problemID}});
			return response;
		} catch (err) {
			return await handleErr(err);
		}
	},
	async delProblemFromCourse(courseID : number, problemID : number) {
		try {
			const response = await axiosInstance.delete(`/courses/${courseID}/problems/`, {params: {problemId : problemID}});
			return response;
		} catch (err) {
			return await handleErr(err);
		}
	},
	async postCoursePic(id : number, pic: FormData) {
		try {
			const response = await axiosInstance.post(`/courses/${id}/course-avatar/`, pic);
			return response;
		} catch (err) {
			return await handleErr(err);
		}
	},
	
	// PROBLEM...
	async getProblemByID(id : number) {
		try {
			const response = await axiosInstance.get(`problems/` + id);
			return response;
		} catch (err) {
			return await handleErr(err);
		}
	},
	async addProblem(problem: addProblem) {
		try {
			const response = await axiosInstance.post(`/courses/`, problem);
			return response;
		} catch (err) {
			return await handleErr(err);
		}
	},
	async editProblem(problem: UpdateProblem) {
		try {
			const response = await axiosInstance.put(`/courses/`, problem);
			return response;
		} catch (err) {
			return await handleErr(err);
		}
	},
	async getProblemStatus(id : number) {
		try {
			const response = await axiosInstance.get(`/solution/solution-description/${id}`);
			return response;
		} catch (err) {
			return await handleErr(err);
		}
	},

	// SOLUTIONS... 
	async submitSolutionText(coursesId: number, problemId: number, solutionText: string, programmingLanguage: number) {
		try {
			const response = await axiosInstance.post(
				`/courses/${coursesId}/problems/${problemId}/solution-text/`, 
				{solutionText: solutionText}, 
				{params: {programmingLanguage}}
			);
			return response;
		} catch (err) {
			return await handleErr(err);
		}
	},
	async submitSolutionFile(coursesId: number, problemId: number, solutionFile: File, programmingLanguage: number) {
		try {
			const response = await axiosInstance.post(
				`/courses/${coursesId}/problems/${problemId}/solution-text/`, 
				solutionFile, 
				{params: {programmingLanguage}}
			);
			return response;
		} catch (err) {
			return await handleErr(err);
		}
	},

	// CHAT...
	async getMessageHistory(chatID : string, limit? : number, offset? : number) {
		try {
			const response = await Axios.get(`http://localhost:8080/history/${chatID}`, {params: {limit, offset}});
			return response;
		} catch (err) {
			return await handleErr(err);
		}
	},
	async getDialogs(userID : string) {
		try {
			const response = await Axios.get(`http://localhost:8080/dialogs/${userID}`);
			return response;
		} catch (err) {
			return await handleErr(err);
		}
	},
}

