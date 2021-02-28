import React, { FC, useState, useEffect } from 'react'
import s from './Courses.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import CoursePreview from './Preview';
import { AppStateType, CourseData } from '../../types/types';

// moke 
const courseList = [
	{
		id : 11,
		courseName: "Сложная математика",
		description : "Решаем классные математические задачки, ничего тривиального",
		pic: "/public/static/book"
	},
	{
		id : 12,
		courseName: "Трогать жаб",
		description : "Решаем классные математические задачки, ничего тривиального",
		pic: "/static/book"
	}
];

const CourseList: FC = () => {
	const dispatch = useDispatch();
	const data = courseList;
	// const [data, setData] = useState<CourseData[]>();
	// const id = useSelector<AppStateType, number>(state => state.me.userInfo.id);
 
	// useEffect( () => {
	// 	async function asyncWrap() {
	// 		const result = await userAPI.getUserCourses(id);
	// 		setData(result?.data);
	// 	};
	// 	asyncWrap();
	// }, []);

	const gridItems = data?.map((course) => 
		<CoursePreview 
			id={course.id}
			pic={course.pic}
			name={course.courseName}
			description={course.description}
		/>
	)

	return (
		<div className={s.list}>
			{gridItems}
		</div>
	)
}

export default CourseList;
