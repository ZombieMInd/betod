import React, { FC, useState, useEffect, useLayoutEffect } from 'react'
import s from './List.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import CoursePreview from '../Preview';
import { AppStateType, CourseData } from '../../../types/types';
import CourseListPreview from './ListPreview';
import { userAPI } from '../../../api/UserApi';
import { authUser } from '../../../redux/me/actions';
import { MeType } from '../../../types/me';
import { StaticPathResolver } from '../../../utils/staticPathResolver';

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
		description : "Раздел информационной безопасности, характеризующий невозможность возникновения приемлемого ущерба для него...",
		pic: "/static/book"
	},
	{
		id : 13,
		courseName: "C++",
		description : "Компилируемый, статически типизированный язык программирования общего назначения. Компилируемый...",
		pic: "/static/book"
	}
];

const CourseList = ({limit} : {limit? : number}) => {
	const dispatch = useDispatch();
	// const data = courseList;
	const [data, setData] = useState<CourseData[]>();
	const userInfo = useSelector<AppStateType, MeType>(state => state.me.userInfo);
 
	useEffect( () => {
		async function asyncWrap() {
			if (userInfo.id) {
				const result = await userAPI.getUserCourses(userInfo.id);
				setData(result?.data.courses);
			}
		};
		asyncWrap();
	}, [userInfo]);

	const gridItems = data?.map((course, index) => {
		if (limit && index >= limit) {
			return;
		} else {
			return (
				<CourseListPreview 
					key={index}
					id={course.id}
					pic={course.courseMainPictureUrl ? StaticPathResolver(course.courseMainPictureUrl) : null}
					name={course.courseName}
					description={course.description}
				/>
			)
		}
	})

	return (
		<div className={s.list}>
			{gridItems}
		</div>
	)
}

export default CourseList;
