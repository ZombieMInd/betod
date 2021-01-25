import React, { FC, useState } from 'react'
import s from './Courses.module.scss'
import { useDispatch } from 'react-redux';
import CoursePreview from './Preview';

// mock 
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

const CourseGrid: FC = () => {
	const dispatch = useDispatch();
	const gridItems = courseList.map((course) => 
		<CoursePreview 
			id={course.id}
			pic={course.picSrc}
			name={course.name}
			description={course.description}
		/>
	)

	return (
		<div className={s.CoursePreview}>
			{gridItems}
		</div>
	)
}

export default CourseGrid;
