import React, { FC, useState, useEffect } from 'react'
import s from './Courses.module.scss'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { CourseData, SwitcherProps } from '../../types/types';
import { userAPI } from '../../api/api';
import Comments from './Comments';
import Statistic from './Statistic';
import Authors from './Authors';
import ContentSwitcher from '../Common/Helpers/ContentSwitcher';
import Program from './Program/Program';

const Course: FC = (props: any) => {
	let { id } : any = useParams();
	const dispatch = useDispatch();
	// const data = getCourseData(id);

	const [data, setData] = useState<CourseData>();
 
	useEffect( () => {
		async function asyncWrap() {
			const result = await userAPI.getCourseDataById(id);
			setData(result?.data);
		};
		asyncWrap();
	}, []);

	const courseContents : SwitcherProps[] = [
		{
			name : "Программа курса",
			content: <Program/>
		},
		{
			name : "Отзывы",
			content: <Comments/>
		},
	];

	return (
		<div className={s.course}>
			<div className={s.body}>
				<div className={s.header}>{data?.courseName}</div>
				<div className={s.desc}><span className={s.bold}> Описание: </span>{data?.courseName}</div>
				<button className={s.enter}>Поступить</button>
				<ContentSwitcher contents={courseContents} style="space-between"/>
			</div>
			<div className={s.right}>
				<Statistic/>
				<Authors/>
			</div>
		</div>
	)
}

export default Course;
