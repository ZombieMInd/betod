import React, { FC, useState } from 'react'
import s from './Login.module.scss'
import { useDispatch } from 'react-redux';
import CourseGrid from '../../Courses/Grid';
import ContentSwitcher from '../../Common/Helpers/ContentSwitcher';
import { SwitcherProps } from '../../../types/types';
import Login from './Login';
import Course from '../../Courses/Course';
import Registration from './Registration';
import { login } from '../../../redux/me/actions';

const LoginPage: FC = () => {
	const content : SwitcherProps[] = [
		{
			name : "Вход",
			content: <Login/>
		},
		{
			name : "Регистрация",
			content: <Registration/>
		},
	];
	return (
		<div className={s.contentWrapper}>
			<ContentSwitcher contents={content}/>
		</div>
	)
}

export default LoginPage;
