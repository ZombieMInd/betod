import React, { FC, useState } from 'react'
import s from './Profile.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import CourseGrid from '../../Courses/Grid';
import { AppStateType, SwitcherProps } from '../../../types/types';
import Login from '../Login/Login';
import Course from '../../Courses/Course';
import ContentSwitcher from '../../Common/Helpers/ContentSwitcher';
import Search from '../../Search/Search';
import Main from '../Main/Main';
import ProfileMain from './Main';
import CourseUser from '../../Courses/User';
import CourseList from '../../Courses/List/List';
import { Chat } from '../../Chat/Chat';
import { useHistory } from 'react-router';

const Profile: FC = () => {
	const dispatch = useDispatch()
    const logged = useSelector<AppStateType, boolean>(state => state.me.logged);
	const history = useHistory();
	if (!logged) {
		history.push("/");
	}
	const content : SwitcherProps[] = [
		{
			name : "Сводка",
			content: <ProfileMain/>
		},
		{
			name : "Мои курсы",
			content: <CourseList/>
		},
		{
			name : "Чат",
			content: <Chat/>
		},
	];
	return (
		<div className={s.contentWrapper}>
			<ContentSwitcher contents={content}/>
		</div>
	)
}

export default Profile;
