import * as types from './types'
import { LoginMe, MeType } from '../../types/me'
import { userAPI } from '../../api/UserApi'
import { AxiosResponse } from 'axios'
import Cookies from 'js-cookie'
import { EmptyFuncType, AlertifyStatusEnum, AppStateType, UserProfile, UpdateProfile } from '../../types/types'
import { showAlert } from '../../utils/showAlert'
import { setTokenForAPI } from '../../api/api'
import { StaticPathResolver } from '../../utils/staticPathResolver'



export enum actionTypes {
	SET_LOGGED = 'me/SET_LOGGED',
	SET_TOKEN = 'me/SET_TOKEN',
	SET_USER_INFO = 'me/SET_USER_INFO',
	SET_USER_COURSES = 'me/SET_USER_COURSES',
}



export const setLogged = (logged: boolean): types.SetLoggedType => {
	return {
		type: actionTypes.SET_LOGGED,
		logged
	}
}
export const setUserInfo = (userInfo: MeType): types.SetUserInfo => {
	return {
		type: actionTypes.SET_USER_INFO,
		userInfo
	}
}
export const setUserCourses = (userCourses: Array<number>): types.SetUserCourses => {
	return {
		type: actionTypes.SET_USER_COURSES,
		userCourses
	}
}
const setTokenSuccess = (token: string): types.SetTokenType => {
	return {
		type: actionTypes.SET_TOKEN,
		token
	}
}

// THUNKS


export const login = (login: string, password: string, errorFunc: (message: string) => void): types.ThunksType => async (dispatch, getState) => {
	let response = await userAPI.login(login, password) as AxiosResponse

	if (response) {
		if (response.status === 200) {
			Cookies.set('access-token', response.data.token, { expires: 14 });
			await dispatch(authUser());
		} else {
			errorFunc('Неверный логин или пароль');
		}
	}
}

export const authUser = (): types.ThunksType => async (dispatch) => {
	let token = Cookies.get('access-token');

	if (token) {
		dispatch(setAccessToken(token))
		dispatch(setLogged(true))
		dispatch(getUserInfo())
	}
}

export const getUserInfo = (): types.ThunksType => async (dispatch) => {
	let response = await userAPI.getUserInfo() as AxiosResponse

	if (response && response.status === 200) {
		let pic : string;
		if (response.data.user.userPicture){
			response.data.user.userPicture = StaticPathResolver(response.data.user.userPicture);
		}
		// response.data.user.username = response.data.user.username;
		
		const userCourses : Array<number> = [];
		for (const course of response.data.userCourses) {
			userCourses.push(course.id);
		}
		
		if (userCourses.length > 0) {
			// console.log("Courses ", userCourses);
			// dispatch(setUserCourses(userCourses));
		}
		dispatch(setUserInfo({...response.data.user, courses : userCourses}));
			
	} else {
		dispatch(logout())
	}
}


export const logout = (): types.ThunksType => async (dispatch) => {
	dispatch(setLogged(false))
	dispatch(setAccessToken(""))
	dispatch(setUserInfo({} as MeType))
	Cookies.remove('access-token')
}

export const editProfile = (profile: UpdateProfile, submitFunc: EmptyFuncType): types.ThunksType => async (dispatch) => {
	let response = await userAPI.editProfile(profile) as AxiosResponse

	if (response && response.status === 200) {

		dispatch(setUserInfo(response.data.user))
		submitFunc()
	}  else {
		showAlert(AlertifyStatusEnum.success, "Не удалось изменить профиль")
	}
}

export const setAccessToken = (token: string): types.ThunksType => async (dispatch) => {
	dispatch(setTokenSuccess(token))
	setTokenForAPI(token)
}

