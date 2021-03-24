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
	courseMainPictureUrl : string,
	courseDuration : string,
}

export type ProblemData = {
	id : number,
	problemName : string,
	problemText : string,
	problemTime : number,
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
	firstName : string,
	lastName : string,
	userName : string,
}

export type RegisterValuesType = {
	firstName : string,
	lastName : string,
	userName : string,
	password : string,
	passwordConfirm : string,
	recordBookNumber : string,
}

export interface UpdateProfile {
	id : number,
	firstName? : string,
	lastName? : string,
	userName? : string,
	userDescription? : string,
}

export interface addCourse {
	courseName : string,
	courseDescription? : string,
	courseDuration? : string,
	problems? : Array<number>,
}

export interface UpdateCourse {
	id : number,
	courseName? : string,
	courseDescription? : string,
	courseDuration? : string,
	problems? : Array<number>,
	courseAuthorsId? : Array<number>,
}

export interface addProblem {
	problemName : string,
	problemText? : string,
	problemTime? : string,
}

export interface UpdateProblem {
	id : number,
	problemName? : string,
	problemText? : string,
	problemTime? : string,
}


export interface Solution {
	userId : number,
	problemId : string,
	solutionText : string,
}