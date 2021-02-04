import React, { FC, useState } from 'react'
import s from './Profile.module.scss'
import { useDispatch } from 'react-redux';
import CourseGrid from '../../Courses/Grid';
import { SwitcherProps } from '../../../types/types';
import Login from '../Login/Login';
import Course from '../../Courses/Course';
import ContentSwitcher from '../../Common/Helpers/ContentSwitcher';
import Search from '../../Search/Search';
import Actions from './Actions';
import Info from './Info';
import CourseLast from '../../Courses/Last';
import { Dropdown } from '../../Common/FormComponents/Components/DropDown';
import CustomDropdown from '../../Common/Helpers/CustomDropdown';
import CourseList from '../../Courses/List';

const ProfileMain: FC = () => {
	
	return (
		<div className={s.contentWrapper}>
			<CustomDropdown header="Последние действия"><Actions/></CustomDropdown>
			<CustomDropdown header="Последние курсы"><CourseList/></CustomDropdown>
			<Info/>
		</div>
	)
}

export default ProfileMain;
