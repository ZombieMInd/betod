import React, { FC, useState } from 'react'
import s from './Main.module.scss'
import { useDispatch } from 'react-redux';
import CourseGrid from '../../Courses/Grid';
import { SwitcherProps } from '../../../types/types';
import Login from '../Login/Login';
import Course from '../../Courses/Course';
import ContentSwitcher from '../../Common/Helpers/ContentSwitcher';
import Search from '../../Search/Search';

const Main: FC = () => {
	const dispatch = useDispatch()
	const content : SwitcherProps[] = [
		{
			name : "Основные",
			content: <CourseGrid/>
		},
		{
			name : "Пользовательские",
			content: <CourseGrid/>
		},
	];
	return (
		<div className={s.contentWrapper}>
			<Search/>
			<ContentSwitcher contents={content}/>
		</div>
	)
}

export default Main;
