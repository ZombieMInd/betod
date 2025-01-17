import React, { FC, useState, useEffect } from 'react'
import s from './Courses.module.scss'
import { useDispatch } from 'react-redux';
import CoursePreview from './Preview';
import { CourseData } from '../../types/types';
import { userAPI } from '../../api/UserApi';

// moke 
const courseList = [
	{
		id : 11,
		name: "Сложная математика",
		description : "Решаем классные математические задачки, ничего тривиального",
		picSrc: "/public/static/book"
	},
	{
		id : 12,
		name: "Трогать жаб",
		description : "Решаем классные математические задачки, ничего тривиального",
		picSrc: "/static/book"
	}
];

const CourseLast: FC = () => {
	const dispatch = useDispatch();
	const [data, setData] = useState<CourseData[]>();
 
	useEffect( () => {
		async function asyncWrap() {
			const result = await userAPI.getCourseData();
			setData(result?.data);
		};
		asyncWrap();
	}, []);

	const gridItems = data?.map((course) => 
		<CoursePreview
			key={course.id} 
			id={course.id}
			pic={course.courseMainPictureUrl}
			name={course.courseName}
			description={course.description}
		/>
	)

	return (
		<div className={s.grid}>
			{gridItems}
		</div>
	)
}

export default CourseLast;
