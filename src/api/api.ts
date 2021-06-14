import Axios, { CancelToken, AxiosError, AxiosInstance } from 'axios';
import { showAlert } from '../utils/showAlert';
import { AlertifyStatusEnum } from '../types/types';

export let apiURL = "https://betod.ru/"

export const axiosInstance = Axios.create({
	baseURL: `${apiURL}api/`,
	headers: {
		'Content-Type': 'application/json'
	}
});

export const setTokenForAPI = (token: string) => {
	axiosInstance.defaults.headers.Authorization = "Bearer " + token;
}

export const handleErr = async (err: AxiosError) => {
	if (err?.response?.status && err?.response?.status === 429) {
		showAlert(AlertifyStatusEnum.error, 'Очень много запросов на сервер. Пожалуйста, подождите')
	}

	return err?.response
}

export type APIListParamsType = {
	page: number,
	sort: string
	search?: string
}