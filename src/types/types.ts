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
	id : number,
	courseName: string,
	description : string,
	problems : number[],
	users : number[],
	pic : string,
}

export type UserComment = {
	name : string,
	rating : number,
	message : string,
	date : string
}

export type CourseStatistic = {
	members : number,
	finished : number,
	started : number,
}

export type CourseAuthor = {
	name : string,
	nickname : string,
	pic : string,
}

export type SwitcherProps = {
	name : string,
	content : any,
}

export type CourseProgram = {
	chapters : {
		name : string,
		link : string,
		sections : {
			name : string,
			link : string,
		}[],
	}[],
}

export type ProfileMini = {
	name : string,
	tag : string,
	bio : string,
	statistic : ProfileStatistics,
}

export type ProfileStatistics = {
	current : number,
	finished : number,
	all : number,
}

export enum UserActionTypes {
	UPDATE = 'update',
	NEW_MESSAGE = 'new message',
	FRIEND_REQUEST = 'friend request',
	TASK_CHECKED = 'task checked',
}

export type UserType = {
	name : string,
	id : number,
}

export type UserProfile = {
	name : string
}