import React, { FC, useState } from 'react'
import s from './Main.module.scss'
import { useDispatch } from 'react-redux';
import CourseGrid from '../../Courses/Grid';
import { SwitcherProps } from '../../../types/types';
import Login from '../Login/Login';
import Course from '../../Courses/Course';

const Main: FC = () => {
	const dispatch = useDispatch()
	const content : SwitcherProps[] = [
		{
			name : "Вход",
			content: <Login/>
		},
		{
			name : "Регистрация",
			content: <Course/>
		},
	];
	return (
		<div className={s.contentWrapper}>
			<CourseGrid/>
		</div>
	)
}

export default Main;
