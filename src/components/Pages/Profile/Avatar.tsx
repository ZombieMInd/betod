import React, { FC, useState } from 'react'
import s from './Profile.module.scss'
import { useDispatch } from 'react-redux';
import CourseGrid from '../../Courses/Grid';
import { SwitcherProps } from '../../../types/types';
import Login from '../Login/Login';
import Course from '../../Courses/Course';
import ContentSwitcher from '../../Common/Helpers/ContentSwitcher';
import Search from '../../Search/Search';
import { Link } from 'react-router-dom';
import ava from '../../../assets/img/book.png';

const Avatar: FC = () => {
	
	return (
		<Link to="/profile" className={s.avatar}>
			<img src={ava}/>
		</Link>
	)
}

export default Avatar;
