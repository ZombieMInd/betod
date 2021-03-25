import * as types from './types'
import { actionTypes } from './actions'
import { MeType } from '../../types/me'

let initialState = {
	logged: false,
	token: "",
	userInfo: {} as MeType,
	userCourses : [] as Array<number>,
}


const meReducer = (state = initialState, action: types.ActionsTypes): typeof initialState => {
	switch (action.type) {
		case actionTypes.SET_LOGGED: {
			return {
				...state,
				logged: action.logged
			}
		}
		case actionTypes.SET_TOKEN: {
			return {
				...state,
				token: action.token
			}
		}
		case actionTypes.SET_USER_INFO: {
			return {
				...state,
				userInfo: {...action.userInfo}
			}
		}
		case actionTypes.SET_USER_COURSES: {
			return {
				...state,
				userCourses: {...action.userCourses}
			}
		}
		
		default:
			return state;
	}
}

export default meReducer;
