import React, { FC, useState } from 'react'
import s from './Profile.module.scss'
import { useDispatch } from 'react-redux';
import CourseGrid from '../../Courses/Grid';
import { UserActionTypes } from '../../../types/types';
import Login from '../Login/Login';
import Course from '../../Courses/Course';
import ContentSwitcher from '../../Common/Helpers/ContentSwitcher';
import Search from '../../Search/Search';
import { Link } from 'react-router-dom';

const moke = [
	{
		type : UserActionTypes.UPDATE,
		initiator : {
			name : "Евгений Ким",
			id : 1,
		},
		target : {
			id : 2,
		},
		course : {
			name : "Космические войска Python script +++ и ещё несколько длинных слов",
			id : 2,
		}
	},
	{
		type : UserActionTypes.TASK_CHECKED,
		initiator : {
			name : "Евгений Ким",
			id : 1,
		},
		target : {
			id : 2,
		},
		course : {
			name : "Космические войска Python script +++ и ещё несколько длинных слов",
			id : 2,
		}
	},
	{
		type : UserActionTypes.FRIEND_REQUEST,
		initiator : {
			name : "Евгений Ким",
			id : 1,
		},
		target : {
			id : 2,
		},
		course : {
			name : "Космические войска Python script +++ и ещё несколько длинных слов",
			id : 2,
		}
	}
]

const Actions: FC = () => {
	
	const data = moke;
	// const [data, setData] = useState<CourseData[]>();
 
	// useEffect( () => {
	// 	async function asyncWrap() {
	// 		const result = await userAPI.getCourseData();
	// 		setData(result?.data);
	// 	};
	// 	asyncWrap();
	// }, []);

	const items = data?.map((action, index) => {
		let elem : any;
		switch (action.type) {
			case UserActionTypes.UPDATE:
				elem = <ActionUpdate key={index} action={action}/>
				break; 
			case UserActionTypes.FRIEND_REQUEST:
				elem = <ActionRequest key={index} action={action}/>
				break;
			case UserActionTypes.TASK_CHECKED:
				elem = <ActionTask key={index} action={action}/>
				break;
		}
		return elem;
	})

	return (
		<div className={s.actions}>
			{items}
		</div>
	)
}

export default Actions;

interface TaskActionProps {
	action : {
		initiator : {
			name : string,
			id : number,
		},
		target : {
			id : number,
		},
		course : {
			name : string,
			id : number,
		},
	}
}

const ActionRequest: FC<TaskActionProps> = ({action} : TaskActionProps) => {
	return (
		<div className={s.action + " " + s.request}>
			<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M8.53684 1.68286C4.6528 1.68286 1.50415 4.83151 1.50415 8.71555C1.50415 12.5996 4.6528 15.7482 8.53684 15.7482C12.4209 15.7482 15.5695 12.5996 15.5695 8.71555C15.5695 4.83151 12.4209 1.68286 8.53684 1.68286ZM2.45415 8.71555C2.45415 5.35618 5.17747 2.63286 8.53684 2.63286C11.8962 2.63286 14.6195 5.35618 14.6195 8.71555C14.6195 12.0749 11.8962 14.7982 8.53684 14.7982C5.17747 14.7982 2.45415 12.0749 2.45415 8.71555ZM5.8829 10.5631C5.72492 10.3366 5.41325 10.2811 5.18676 10.4391C4.96027 10.5971 4.90474 10.9087 5.06272 11.1352C5.82686 12.2307 7.09798 12.9492 8.53697 12.9492C9.97598 12.9492 11.2471 12.2307 12.0112 11.1352C12.1692 10.9087 12.1137 10.5971 11.8872 10.4391C11.6607 10.2811 11.349 10.3366 11.191 10.5631C10.6059 11.402 9.6353 11.9492 8.53697 11.9492C7.43865 11.9492 6.46804 11.402 5.8829 10.5631ZM6.2703 8.02248C6.78576 8.02248 7.20364 7.60454 7.20364 7.08915C7.20364 6.57376 6.78576 6.15582 6.2703 6.15582C5.75484 6.15582 5.33697 6.57376 5.33697 7.08915C5.33697 7.60454 5.75484 8.02248 6.2703 8.02248ZM11.737 7.08915C11.737 7.60454 11.3191 8.02248 10.8036 8.02248C10.2882 8.02248 9.8703 7.60454 9.8703 7.08915C9.8703 6.57376 10.2882 6.15582 10.8036 6.15582C11.3191 6.15582 11.737 6.57376 11.737 7.08915Z" fill="black"/>
			</svg>
			<Link to={"/user/" + action.initiator.id} className={s.initiator + " " + s.request}>{action.initiator.name}</Link> отправил вам заявку в друзья
		</div>
	)
}

const ActionTask: FC<TaskActionProps> = ({action} : TaskActionProps) => {
	return (
		<div className={s.action + " " + s.task}>
			<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M8.53698 12.1404C5.63981 12.1404 3.1997 10.6558 1.66609 8.37379C3.1997 6.0918 5.63981 4.60712 8.53698 4.60712C11.4342 4.60712 13.8743 6.0918 15.4079 8.37379C13.8743 10.6558 11.4342 12.1404 8.53698 12.1404ZM8.53698 3.60712C5.14484 3.60712 2.3267 5.42016 0.646313 8.1088C0.544979 8.27093 0.544979 8.47666 0.646314 8.6388C2.3267 11.3274 5.14484 13.1404 8.53698 13.1404C11.9291 13.1404 14.7473 11.3274 16.4276 8.6388C16.529 8.47666 16.529 8.27093 16.4276 8.1088C14.7473 5.42016 11.9291 3.60712 8.53698 3.60712ZM8.53698 10.5071C9.71519 10.5071 10.6703 9.55199 10.6703 8.37378C10.6703 7.19558 9.71519 6.24045 8.53698 6.24045C7.35877 6.24045 6.40365 7.19558 6.40365 8.37378C6.40365 9.55199 7.35877 10.5071 8.53698 10.5071Z" fill="black"/>
			</svg>
			<Link to={"/user/" + action.initiator.id} className={s.initiator + " " + s.task}>{action.initiator.name}</Link> проверил вашу 
			<Link to={"/course/" + action.course.id + "/task/" + action.target.id} className={s.target}> домашнюю работу </Link> 
			в курсе «<Link to={"/course/" + action.course.id} className={s.course}>{ action.course.name }</Link>»
		</div>
	)
}


const ActionUpdate: FC<TaskActionProps> = ({action}) => {
	return (
		<div className={s.action + " " + s.update}>
			<svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M9.80031 0.0736489C10.0122 0.164333 10.1347 0.388153 10.0968 0.615533L9.12718 6.43333H13.8703C14.0597 6.43333 14.2328 6.54033 14.3175 6.70973C14.4022 6.87912 14.3839 7.08182 14.2703 7.23333L7.87028 15.7667C7.73197 15.9511 7.48551 16.017 7.27358 15.9263C7.06165 15.8357 6.93919 15.6118 6.97709 15.3845L7.94672 9.56667H3.20362C3.01423 9.56667 2.8411 9.45966 2.7564 9.29027C2.67171 9.12088 2.68998 8.91817 2.80362 8.76667L9.20362 0.233333C9.34193 0.0489202 9.58839 -0.0170356 9.80031 0.0736489ZM4.20362 8.56667H8.53695C8.68393 8.56667 8.82346 8.63133 8.91846 8.74348C9.01346 8.85562 9.05431 9.00389 9.03015 9.14886L8.30058 13.5263L12.8703 7.43333H8.53695C8.38997 7.43333 8.25044 7.36867 8.15544 7.25652C8.06044 7.14437 8.01959 6.99611 8.04375 6.85113L8.77332 2.47373L4.20362 8.56667Z" fill="black"/>
			</svg>
			<Link to={"/user/" + action.initiator.id} className={s.initiator + " " + s.update}>{ action.initiator.name } </Link>  
			 обновил курс 
			«<Link to={"/course/" + action.course.id} className={s.course}> { action.course.name } </Link>»
		</div>
	)
}