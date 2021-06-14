import Axios, { CancelToken, AxiosError } from 'axios';
import { converToFormData } from '../utils/apiFunctions';
import { showAlert } from '../utils/showAlert';
import { AlertifyStatusEnum } from '../types/types';
import { MeType } from '../types/me';
import { axiosInstance, handleErr } from './api';


export const adminAPI = {
	
	getUserByID(id : number) {
		return axiosInstance.get(`users/` + id)
			.then(response => response)
			.catch(err => handleErr(err));
	},
	
}

