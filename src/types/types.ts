import { RootReducerType } from '../redux/redux-store'
export type AppStateType = ReturnType<RootReducerType>

export enum AlertifyStatusEnum {
	success = 'success',
	warn = 'warn',
	error = 'error'
}


export type EmptyFuncType = () => void


export enum FetchingNamesEnum {
	
}

export type CoursePreviewData = {
	id : number,
	name : string,
	description : string,
	pic : string,
}

export type CourseData = {
	courseName: string,
	description : string,
	problems : number[],
	users : number[],
}