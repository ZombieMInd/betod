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
import Program from './Program';

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

	const testFunc = () => {
		console.log('test');
	}

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
		<div className={s.Course}>
			<div className={s.CourseHeader}>{data?.courseName}</div>
			<div className={s.CourseDesc}>Описание: {data?.courseName}</div>
			<button onClick={testFunc}>Поступить</button>
			<div className={s.CourseCommentBlock}>
				<Statistic/>
			</div>
			<Authors/>
			<ContentSwitcher contents={courseContents}/>

		</div>
	)
}

export default Course;
