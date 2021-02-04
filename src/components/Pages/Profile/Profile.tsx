import React, { FC, useState } from 'react'
import s from './Profile.module.scss'
import { useDispatch } from 'react-redux';
import CourseGrid from '../../Courses/Grid';
import { SwitcherProps } from '../../../types/types';
import Login from '../Login/Login';
import Course from '../../Courses/Course';
import ContentSwitcher from '../../Common/Helpers/ContentSwitcher';
import Search from '../../Search/Search';
import Main from '../Main/Main';
import ProfileMain from './Main';
import CourseUser from '../../Courses/User';
import CourseList from '../../Courses/List';

const Profile: FC = () => {
	const dispatch = useDispatch()
	const content : SwitcherProps[] = [
		{
			name : "Сводка",
			content: <ProfileMain/>
		},
		{
			name : "Мои курсы",
			content: <CourseList/>
		},
	];
	return (
		<div className={s.contentWrapper}>
			<ContentSwitcher contents={content}/>
		</div>
	)
}

export default Profile;
