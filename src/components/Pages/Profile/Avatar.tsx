import React, { FC, useState } from 'react'
import s from './Profile.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import CourseGrid from '../../Courses/Grid';
import { AppStateType, SwitcherProps } from '../../../types/types';
import Login from '../Login/Login';
import Course from '../../Courses/Course';
import ContentSwitcher from '../../Common/Helpers/ContentSwitcher';
import Search from '../../Search/Search';
import { Link } from 'react-router-dom';
import ava from '../../../assets/img/book.png';
import { MeType } from '../../../types/me';

const Avatar: FC = () => {
	const userInfo = useSelector<AppStateType, MeType>(state => state.me.userInfo);
	
	return (
		<Link to="/profile" className={s.avatar}>
			<img src={userInfo.userPicture ? userInfo.userPicture : ava}/>
		</Link>
	)
}

export default Avatar;
