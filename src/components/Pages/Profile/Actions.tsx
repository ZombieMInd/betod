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

	const items = data?.map((action) => {
		let elem : any;
		switch (action.type) {
			case UserActionTypes.UPDATE:
				elem = <ActionUpdate action={action}/>
				break; 
			case UserActionTypes.FRIEND_REQUEST:
				elem = <ActionRequest action={action}/>
				break;
			case UserActionTypes.TASK_CHECKED:
				elem = <ActionTask action={action}/>
				break;
		}
		return elem;
	})

	return (
		<div className={s.contentWrapper}>
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
			<Link to={"/user/" + action.initiator.id} >{action.initiator.name}</Link> отправил вам заявку в друзья
		</div>
	)
}

const ActionTask: FC<TaskActionProps> = ({action} : TaskActionProps) => {
	return (
		<div className={s.action + " " + s.task}>
			<Link to={"/user/" + action.initiator.id} className={s.initiator}>{action.initiator.name}</Link> проверил вашу 
			<Link to={"/course/" + action.course.id + "/task/" + action.target.id} className={s.target}> домашнюю работу </Link> 
			в курсе <Link to={"/course/" + action.course.id} className={s.course}>{ action.course.name }</Link>
		</div>
	)
}


const ActionUpdate: FC<TaskActionProps> = ({action}) => {
	return (
		<div className={s.action + " " + s.task}>
			<Link to={"/user/" + action.initiator.id} className={s.initiator}>{ action.initiator.name }</Link> 
			обновил курс 
			<Link to={"/course/" + action.course.id} className={s.course}> { action.course.name } </Link>
		</div>
	)
}